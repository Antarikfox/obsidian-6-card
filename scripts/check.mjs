import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

const read = path => readFileSync(new URL('../'+path,import.meta.url),'utf8');
const card = read('dist/obsidian-6-card.js');
const html = read('standalone/OBSIDIAN-6.html');
const registry = new Map();
const context = {
 HTMLElement:class {}, Path2D:class {}, window:{},
 customElements:{get:name=>registry.get(name), define:(name,to)=>registry.set(name,to)},
 navigator:{languages:['es-ES','fr-CA'],language:'es-ES'},
 performance:{now:()=>500},document:{documentElement:{}}
};
vm.createContext(context);
vm.runInContext(card+'\nthis.api={obs6Locale,obs6Settings,obs6Translator,obs6Zones,Obsidian6Engine,OBS6_MESSAGES};',context);
const {obs6Locale,obs6Settings,obs6Translator,obs6Zones,Obsidian6Engine,OBS6_MESSAGES} = context.api;

test('both builds share a dependency-free core with static artwork', ()=>{
 const inline = html.split('<script>\n')[1].split('const obs6Style=')[0];
 assert.ok(card.startsWith(inline));
 assert.ok(!/<script[^>]+src=|<link[^>]+href=/.test(html));
 assert.doesNotMatch(card, /pokeAlien|obs6-creature|@keyframes/);
 const manifest = JSON.parse(read('hacs.json'));
 assert.equal(manifest.filename,'obsidian-6-card.js');
 assert.ok(registry.has(manifest.filename.slice(0,-3)));
 assert.ok(registry.has('obsidian-6-card-editor'));
});
test('all seven languages have complete labels and status translations', ()=>{
 const keys = [...card.matchAll(/data-i18n(?:-aria|-title|-alt)?="([A-Za-z0-9]+)"/g)].map(match=>match[1]);
 keys.push(...Array.from(card.matchAll(/(?:\.t|this\.feedback)\('([A-Za-z0-9]+)'/g), match=>match[1]));
 const menuTitles = {
  en:'Language',ru:'Язык',de:'Sprache',it:'Lingua',fr:'Langue',zh:'语言',ja:'言語'
 };
 for (const [locale,title] of Object.entries(menuTitles)) {
  assert.equal(obs6Translator(locale)('language'),title);
  for (const key of keys) assert.ok(OBS6_MESSAGES[locale][key],locale+' '+key);
  assert.match(obs6Translator(locale)('sweeping',{digits:'000000'}),/000000/);
  assert.match(obs6Translator(locale)('nextSweep',{minutes:15}),/15/);
 }
 assert.equal(new Set(Object.keys(OBS6_MESSAGES)).size,7);
});
test('language selection prefers manual settings, then HA, then the browser', ()=>{
 assert.equal(obs6Locale(),'fr');
 assert.equal(obs6Locale('auto','de-DE'),'de');
 assert.equal(obs6Locale('ja','de-DE'),'ja');
 assert.equal(obs6Locale('auto','zh-Hans'),'zh');
 assert.equal(obs6Locale('auto','xx-XY'),'fr');
 assert.equal(obs6Locale('xx'),'en');
 assert.equal(obs6Settings({language:'toString'}).language,'auto');
 assert.equal(obs6Zones(obs6Translator('ja'))[0].label,'システムのローカル時刻');
});
test('changing language updates labels and keeps clock and protection state', ()=>{
 const selectors = new Map();
 const node = query=>{
  if (!selectors.has(query)) selectors.set(query,{textContent:'',innerHTML:'',value:'',setAttribute(name,val){this[name]=val}});
  return selectors.get(query);
 };
 const powerLabel = {dataset:{i18n:'power'},textContent:''};
 const engine = Object.assign(Object.create(Obsidian6Engine.prototype),{
  opts:{mode:'clock',time_format:'24',time_zone:'UTC',language:'auto',anti_poison:true},
  mount:{querySelector:node,querySelectorAll:query=>query==='[data-i18n]'?[powerLabel]:[]},
  modal:{open:true},hass:{language:'it-IT'},isHA:true,feedbackKey:'reopen',
  timerLeft:62000,queueDraw(){},combos:{},controls:{},
  effectiveOn:()=>true,effectiveBrightness:()=>82
 });
 engine.applyLanguage();
 assert.equal(node('.obs6-root').lang,'it');
 assert.equal(powerLabel.textContent,'Alimentazione');
 assert.match(node('[data-language]').innerHTML,/Automatico/);
 assert.equal(engine.digits(Date.UTC(2026,0,1,9,23,45)),'092345');
 engine.startSweep();
 for (let index=0;index<10;index++) assert.equal(engine.updateProtection(500+index*155),String(index).repeat(6));
 assert.equal(engine.updateProtection(2050),null);
 engine.opts.language='zh';
 engine.applyLanguage();
 assert.equal(powerLabel.textContent,'电源');
 assert.equal(node('[data-language]').value,'zh');
 assert.equal(engine.timerLeft,62000);
});
