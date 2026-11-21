import { mkdir, readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path, encoding = 'utf8') => readFile(new URL(path,root),encoding);
const languages = ['en','ru','de','it','fr','zh','ja'];
const messages = Object.fromEntries(languages.map(lang=>[lang,{}]));
const [header,...rows] = (await read('src/translations.tsv')).trimEnd().split(/\r?\n/);
if (header !== ['key',...languages].join('\t')) throw new Error('Invalid translation header');
for (const row of rows) {
 const [key,...values] = row.split('\t');
 if (!key || Object.hasOwn(messages.en,key) || values.length !== languages.length || values.some(value=>!value.trim())) {
  throw new Error('Invalid translation row: '+key);
 }
 const placeholders = value => [...value.matchAll(/\{(\w+)\}/g)].map(match=>match[1]).sort().join();
 for (const [index,lang] of languages.entries()) {
  if (placeholders(values[index]) !== placeholders(values[0])) throw new Error('Invalid placeholders in '+lang+'/'+key);
  messages[lang][key] = values[index];
 }
}
const assets = {};
for (const state of ['on','off']) {
 const data = await read('assets/clock-'+state+'.webp',null);
 assets[state] = 'data:image/webp;base64,'+data.toString('base64');
}
const inject = (template,token,content) => {
 if (template.split(token).length !== 2) throw new Error('Invalid template token: '+token);
 return template.replace(token,()=>content);
};
const inlineJson = value => JSON.stringify(value).replaceAll('<','\\u003c');
let core = await read('src/clock.js');
core = inject(core,'/* @assets */ null',inlineJson(assets));
core = inject(core,'/* @translations */ null',inlineJson(messages));
const outputs = {
 'dist/obsidian-6-card.js':core+await read('src/home-assistant.js'),
 'standalone/OBSIDIAN-6.html':inject(await read('src/standalone.html'),'<!-- @clock -->\n',core)
};
for (const [path,content] of Object.entries(outputs)) {
 const dest = new URL(path,root);
 if (process.argv.includes('--check')) {
  if (await read(path) !== content) throw new Error('Outdated build: '+path);
 } else {
  await mkdir(new URL('./',dest),{recursive:true});
  await writeFile(dest,content);
 }
}
