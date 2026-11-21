// OBSIDIAN-6 v7.6 · by Antarikfox
'use strict';
const OBS6_ASSETS = /* @assets */ null;
const OBS6_W=2172, OBS6_H=724;
const OBS6_SWEEP_STEP=155;
const OBS6_SWEEP_INTERVAL=15*60*1000;
const OBS6_CENTERS=[[570,448],[801,448],[1110,448],[1332,451],[1648,450],[1878,451]];
const OBS6_CSS = `
:host{display:block;background:transparent!important;overflow:visible!important}
*,*:before,*:after{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
button,input,select{font-family:inherit}button{cursor:pointer;appearance:none;-webkit-appearance:none;border:0;outline:0;user-select:none}
button:focus-visible,input:focus-visible{outline:2px solid #e99d4a;outline-offset:3px}
ha-card{border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
.obs6-root{position:relative;width:100%;min-width:0;max-width:100%;height:auto;margin:auto;--obs6-accent:#fb8d33;color:#c9d0d6;font-family:Inter,'Segoe UI',Arial,sans-serif;isolation:isolate}
.obs6-stage{position:relative;width:100%;min-width:0;max-width:100%;aspect-ratio:2172/724;min-height:0;line-height:0;overflow:visible;}
.obs6-stage img,.obs6-stage canvas{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;pointer-events:none}
.obs6-stage img{transition:opacity .55s ease}
.obs6-stage .obs6-on{opacity:1}.obs6-stage .obs6-off{opacity:0}.obs6-stage.off .obs6-on{opacity:0}.obs6-stage.off .obs6-off{opacity:1}
.obs6-stage canvas{transition:opacity .22s ease}.obs6-stage.off canvas{opacity:0}
.obs6-hit{position:absolute;z-index:4;border-radius:20%;background:transparent!important;color:transparent!important;border:0!important;box-shadow:none!important;touch-action:manipulation}
.obs6-hit.fox{left:9.8%;top:45%;width:9.5%;height:36%}
.obs6-hit.title{left:18.6%;top:31%;width:13.7%;height:12%}
.obs6-hit:focus-visible{outline:2px dashed #ff8c39;outline-offset:0}
[hidden]{display:none!important}
.obs6-dialog{position:relative;width:min(94vw,690px);border:1px solid #4c4843;border-radius:17px;background:radial-gradient(ellipse 80% 40% at 50% 0%,#50301955,transparent),linear-gradient(140deg,#22272b,#101518 80%);padding:clamp(16px,3.5vw,30px);color:#cbd0d4;font-size:13px;-webkit-overflow-scrolling:touch}
.obs6-dialog-head{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-bottom:20px;border-bottom:1px solid #ffffff17;padding-bottom:15px}
.obs6-dialog-head strong{font-weight:850;letter-spacing:.13em;color:#f1dec7;font-size:17px}
.obs6-dialog-head small{display:block;color:#cb824d;margin-top:6px;letter-spacing:.14em;font-size:9px}
.obs6-x{display:grid;place-items:center;border:1px solid #555d64;border-radius:50%;background:#24292d;color:#d9e1e7;font-size:24px;width:38px;height:38px;flex:none}
.obs6-section{text-transform:uppercase;font-size:10px;letter-spacing:.18em;color:#fba55e;font-weight:800;margin:22px 0 10px}
.obs6-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 16px}
.obs6-field{display:block;min-width:0}.obs6-label{display:block;font-size:11px;color:#9cabb7;margin-bottom:8px;line-height:1.35}
.obs6-field.wide{grid-column:1/-1}
.obs6-input,.obs6-combo-input{width:100%;min-width:0;min-height:42px;border:1px solid #50575e;border-radius:8px;background:linear-gradient(#262c31,#1c2227);color:#f0dbc7;padding:10px 14px;font-size:12px;outline:none}
.obs6-input option{background:#1c2227;color:#f0dbc7}
.obs6-combo{position:relative;width:100%}.obs6-combo-shell{position:relative}.obs6-combo-input{padding-right:36px}.obs6-combo-arrow{position:absolute;right:0;top:0;width:34px;height:100%;border-radius:0 8px 8px 0;background:none;color:#ff9b48;font-size:18px}
.obs6-combo-menu{position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:1001;max-height:228px;overflow:auto;background:#161b20;border:1px solid #85532f;border-radius:10px;box-shadow:0 18px 35px #000c;padding:5px}
.obs6-combo-menu[hidden]{display:none!important}
.obs6-option{display:flex;flex-direction:column;width:100%;text-align:left;gap:3px;min-height:38px;border:0;border-radius:6px;padding:8px 11px;color:#e4e0dc;background:transparent;font-size:12px}
.obs6-option small{color:#768996;font-size:10px;white-space:normal;overflow-wrap:anywhere}
.obs6-option:hover,.obs6-option[aria-selected=true],.obs6-option.active{background:#3c2b20;color:#ffb477}
.obs6-empty{padding:12px;color:#8997a2;font-size:12px;line-height:1.5}
.obs6-control{display:flex;align-items:center;justify-content:space-between;gap:14px;border:1px solid #ffffff0d;border-radius:9px;padding:9px 12px;min-height:52px}
.obs6-control span{color:#b9c4cc;font-size:12px}
.obs6-tgl{min-width:70px;padding-inline:8px;min-height:34px;color:#f8bb83;border-radius:18px;border:1px solid #ba7339;background:linear-gradient(#60402c,#34231b);box-shadow:inset 0 1px #e89b5840;font-size:11px;font-weight:800;letter-spacing:.08em}
.obs6-tgl.off{color:#96a0aa;border-color:#444c53;background:linear-gradient(#30363a,#171b1e)}
.obs6-range{width:100%;height:24px;accent-color:#ff8737;cursor:pointer;touch-action:auto;min-width:0;appearance:auto} .obs6-range::-webkit-slider-thumb{cursor:ew-resize} .obs6-range:focus-visible{outline:2px solid #ff8c34;outline-offset:5px}
.obs6-row{display:flex;align-items:center;gap:12px}
.obs6-row output{width:46px;text-align:right;color:#ffae60;font-size:12px;font-family:monospace;flex:none}
.obs6-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.obs6-act{min-height:38px;padding:8px 14px;border:1px solid #615242;border-radius:7px;background:linear-gradient(#353536,#1c2226);color:#ffd5ac;font-size:11px;font-weight:800;letter-spacing:.055em}
.obs6-act:hover{border-color:#c47f46}.obs6-act.primary{background:linear-gradient(#713f23,#402718);border-color:#c07c47}
.obs6-act.disabled{opacity:.4}
.obs6-chron{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:10px}
.obs6-chron input{width:88px}
.obs6-caption{color:#7b8a95;font-size:11px;line-height:1.55;margin:10px 0 0}
.obs6-feedback{color:#b58e70;min-height:18px;font-size:11px;line-height:1.5;margin-top:14px}
.obs6-editor{background:#171c20;border:1px solid #353f47;border-radius:12px;padding:17px;line-height:normal;color:#f3e5d4;font:13px Inter,'Segoe UI',sans-serif}
.obs6-editor h3{font-size:14px;letter-spacing:.13em;color:#f8a45f;margin:0 0 14px}
.obs6-editor .obs6-grid{gap:12px}.obs6-editor .obs6-caption{margin-bottom:12px}
@media(max-width:470px){.obs6-dialog{padding:14px;border-radius:12px}.obs6-grid{grid-template-columns:1fr}.obs6-field.wide{grid-column:1}.obs6-dialog-head strong{font-size:14px}}
@media(prefers-reduced-motion:reduce){.obs6-stage img,.obs6-stage canvas{transition:none!important}}

.obs6-modal{padding:0;border:0;border-radius:17px;max-width:calc(100vw - 16px);max-height:calc(100vh - 16px);max-height:min(92dvh,820px);overflow:auto;overscroll-behavior:contain;background:#171b20;color:#cbd0d4;font-family:Inter,'Segoe UI',Arial,sans-serif}
.obs6-modal::backdrop{background:#040608ab}
.obs6-modal .obs6-dialog{width:min(92vw,690px);border:0}
.obs6-combo-menu.above{top:auto;bottom:calc(100% + 4px)}
.obs6-option{cursor:pointer;touch-action:pan-y}
.obs6-sweep-tools{display:flex;align-items:center;flex-wrap:wrap;gap:10px}
.obs6-sweep-tools [disabled]{opacity:.42;cursor:default}
.obs6-sweep-status{color:#e2a873;font-family:monospace;line-height:1.4}
.obs6-sample{width:48px;height:48px;border:1px solid #a1683d66;border-radius:50%;background:radial-gradient(#4d2b12,#121010 78%);flex:none}
.obs6-stage .obs6-optics{opacity:var(--obs6-glass-opacity,.74);z-index:3;transition:opacity .14s ease-out}
.obs6-stage.off .obs6-optics{opacity:0}
@media(prefers-reduced-motion:reduce){.obs6-stage .obs6-optics{transition:none}}
`;
const OBS6_MESSAGES = /* @translations */ null;
const OBS6_LANGUAGES={en:'English',ru:'Русский',de:'Deutsch',it:'Italiano',fr:'Français',zh:'简体中文',ja:'日本語'};
function obs6Locale(preference='auto', haLanguage){
 const browser = typeof navigator === 'undefined' ? [] : [...(navigator.languages || []),navigator.language];
 for (const candidate of (preference === 'auto' ? [haLanguage,...browser,'en'] : [preference,'en'])) {
  const key = String(candidate || '').toLowerCase().split(/[-_]/)[0];
  if (Object.hasOwn(OBS6_LANGUAGES,key)) return key;
 }
 return 'en';
}
function obs6Translator(locale){
 const messages = OBS6_MESSAGES[locale] || OBS6_MESSAGES.en;
 return (key, data={}) => (messages[key] ?? OBS6_MESSAGES.en[key] ?? key).replace(/\{(\w+)\}/g,(match,name)=>data[name] ?? match);
}
function obs6LanguageOptions(t){
 return '<option value="auto">'+t('automatic')+'</option>'+Object.entries(OBS6_LANGUAGES).map(([key,label])=>'<option value="'+key+'">'+label+'</option>').join('');
}
function obs6Translate(root,t){
 for (const element of root.querySelectorAll('[data-i18n]')) element.textContent = t(element.dataset.i18n);
 for (const [key,attr] of [['aria','aria-label'],['title','title'],['alt','alt']]) {
  for (const element of root.querySelectorAll('[data-i18n-'+key+']')) element.setAttribute(attr,t(element.getAttribute('data-i18n-'+key)));
 }
}
const OBS6_DEFAULTS={language:'auto',on:true,mode:'clock',brightness:82,time_format:'24',time_zone:'local',anti_poison:true,sound:false,glass_strength:74,night_mode:false,transition_fx:true,power_entity:'',brightness_entity:'',ha_mode:false};
const OBS6_MODES=['clock','date','timer','stopwatch'];
const OBS6_TZ = new Map([['local','localTime'],['Europe/Moscow','moscow'],['Europe/Warsaw','warsaw'],['UTC','utc'],['Europe/London','london'],['America/New_York','newYork'],['Asia/Tokyo','tokyo']]);
try {
 for(const zone of Intl.supportedValuesOf?.('timeZone') || []) if(!OBS6_TZ.has(zone)) OBS6_TZ.set(zone,null);
} catch {}
function obs6Zones(t){
 return Array.from(OBS6_TZ,([value,key])=>({
  value,label:key ? t(key)+(value==='local' ? '' : ' · '+value) : value.replaceAll('_',' ')
 }));
}
const OBS6_CLAMP=(v,a,b)=>Math.max(a,Math.min(b,v));
function obs6EntityChoices(hass, kind, t, language){
 const states=hass?.states||{};
 const good=kind==='power'?['light','switch','input_boolean']:kind==='brightness'?['light','number','input_number']:['input_select','select'];
 const keys=Object.keys(states).filter(k=>good.includes(k.split('.')[0]));
 const scored=keys.map(id=>{
  const s=states[id], label=s?.attributes?.friendly_name||id;
  const txt=(id+' '+label).toLowerCase();
  const patterns=kind==='power'?['obsidian','clock','часы','power','питание','on','switch']:kind==='brightness'?['obsidian','clock','яркость','brightness','light','свет']:['obsidian','clock','mode','режим'];
  const score=patterns.reduce((a,p,idx)=>a+(txt.includes(p)?(patterns.length-idx)*10:0),0);
  return {value:id,label:String(label),detail:id,score};
 });
 scored.sort((a,b)=>b.score-a.score||a.label.localeCompare(b.label,language));
 return [{value:'',label:t('noEntity'),detail:t('localControl')},...scored];
}
function obs6Settings(values) {
 const options = {...OBS6_DEFAULTS,...values};
 for (const key of ['brightness','glass_strength']) {
  const value = Number(options[key]);
  options[key] = Number.isFinite(value) ? OBS6_CLAMP(value,0,100) : OBS6_DEFAULTS[key];
 }
 if (!OBS6_MODES.includes(options.mode)) options.mode = OBS6_DEFAULTS.mode;
 if (options.language !== 'auto' && !Object.hasOwn(OBS6_LANGUAGES,options.language)) options.language = 'auto';
 for (const key of ['power_entity','brightness_entity','time_zone']) {
  if (typeof options[key] !== 'string') options[key] = OBS6_DEFAULTS[key];
 }
 return options;
}
class Obsidian6Combo {
 constructor(host, provider, value, onChoose, lookup, t) {
  this.host = host;
  this.provider = provider;
  this.onChoose = onChoose;
  this.lookup = lookup;
  this.t = t;
  this.open = false;
  this.idx = -1;
  host.innerHTML = '<div class="obs6-combo-shell"><input class="obs6-combo-input" role="combobox" aria-autocomplete="list" aria-expanded="false" autocomplete="off" spellcheck="false"><button class="obs6-combo-arrow" type="button" tabindex="-1">⌄</button></div><div class="obs6-combo-menu" role="listbox" hidden></div>';
  this.input = host.querySelector('input');
  this.menu = host.querySelector('.obs6-combo-menu');
  this.menu.id = 'obs6-list-' + ++obs6ListId;
  this.input.setAttribute('aria-controls', this.menu.id);
  this.input.setAttribute('aria-label', host.parentElement.querySelector('.obs6-label').textContent);
  this.setValue(value);
  this.input.addEventListener('focus', () => this.show());
  this.input.addEventListener('blur', () => this.hide());
  this.input.addEventListener('input', () => {
   if (!this.open) this.show(this.input.value);
   else this.render(this.input.value);
  });
  this.input.addEventListener('keydown', e => {
   if (e.key === 'Escape' && this.open) {
    e.preventDefault();
    e.stopPropagation();
    this.hide();
   }
   if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (!this.open) this.show();
    const next = this.idx + (e.key === 'ArrowDown' ? 1 : -1);
    this.mark(OBS6_CLAMP(next, 0, this.filtered.length - 1));
   }
   if (e.key === 'Enter' && this.open) {
    e.preventDefault();
    this.select(this.filtered[Math.max(0, this.idx)]);
   }
  });
  const arrow = host.querySelector('button');
  arrow.setAttribute('aria-label',this.t('openList'));
  arrow.addEventListener('pointerdown', e => e.preventDefault());
  arrow.addEventListener('click', () => {
   if (this.open) this.hide();
   else {
    this.input.focus({preventScroll:true});
    if (!this.open) this.show();
   }
  });
  this.menu.addEventListener('mousedown', e => e.preventDefault());
  this.menu.addEventListener('click', e => {
   const row = e.target.closest('[data-obs6-i]');
   if (row) this.select(this.filtered[Number(row.dataset.obs6I)]);
  });
 }
 refreshLanguage(){
  this.hide();
  this.host.querySelector('button').setAttribute('aria-label',this.t('openList'));
  this.input.setAttribute('aria-label',this.host.parentElement.querySelector('.obs6-label').textContent);
  this.setValue(this.value);
 }
 setValue(value) {
  this.value = value || '';
  if (this.open) return;
  const label = this.lookup ? this.lookup(this.value) : this.provider().find(x => x.value === this.value)?.label;
  this.input.value = label || this.value || this.t('unselected');
 }
 show(search = '') {
  if (this.open) return;
  this.items = this.provider();
  this.open = true;
  this.input.setAttribute('aria-expanded', 'true');
  this.menu.hidden = false;
  if (!search) this.input.select();
  this.render(search);
  const anchor = this.host.getBoundingClientRect();
  const dialog = this.host.closest('dialog')?.getBoundingClientRect();
  const below = (dialog?.bottom || window.innerHeight) - anchor.bottom - 8;
  const above = anchor.top - (dialog?.top || 0) - 8;
  const flip = below < this.menu.offsetHeight && above > below;
  this.menu.classList.toggle('above', flip);
  this.menu.style.maxHeight = Math.max(70, Math.min(220, flip ? above : below)) + 'px';
 }
 hide() {
  if (!this.open) return;
  this.open = false;
  this.items = null;
  this.input.setAttribute('aria-expanded', 'false');
  this.input.removeAttribute('aria-activedescendant');
  this.menu.hidden = true;
  this.menu.style.maxHeight = '';
  this.setValue(this.value);
 }
 render(search) {
  const query = search.toLowerCase().trim();
  this.filtered = [];
  for (const item of this.items) {
   if (!query || (item.label + ' ' + item.value).toLowerCase().includes(query)) this.filtered.push(item);
   if (this.filtered.length === 60) break;
  }
  this.idx = -1;
  this.input.removeAttribute('aria-activedescendant');
  const rows = document.createDocumentFragment();
  for (const [index, entry] of this.filtered.entries()) {
   const row = document.createElement('div');
   row.className = 'obs6-option';
   row.dataset.obs6I = index;
   row.id = this.menu.id + '-' + index;
   row.setAttribute('role', 'option');
   row.setAttribute('aria-selected', String(entry.value === this.value));
   row.textContent = entry.label;
   if (entry.detail) {
    const detail = document.createElement('small');
    detail.textContent = entry.detail;
    row.append(detail);
   }
   rows.append(row);
  }
  if (!rows.childElementCount) {
   const empty = document.createElement('div');
   empty.className = 'obs6-empty';
   empty.textContent = this.t('noMatches');
   rows.append(empty);
  }
  this.menu.replaceChildren(rows);
  this.menu.scrollTop = 0;
 }
 mark(index) {
  if (!this.filtered.length) return;
  this.menu.children[this.idx]?.classList.remove('active');
  this.idx = index;
  const row = this.menu.children[index];
  row.classList.add('active');
  this.input.setAttribute('aria-activedescendant', row.id);
  if (row.offsetTop < this.menu.scrollTop) this.menu.scrollTop = row.offsetTop;
  const cutoff = row.offsetTop + row.offsetHeight - this.menu.clientHeight;
  if (cutoff > this.menu.scrollTop) this.menu.scrollTop = cutoff;
 }
 select(item) {
  if (!item) return;
  this.value = item.value;
  this.hide();
  this.onChoose(item.value);
 }
}
let obs6ListId = 0;
const obs6EntityLabel = (hass, id, t) => id ? hass?.states?.[id]?.attributes?.friendly_name || id : t('noEntity');
const OBS6_CATHODE_D = [
 'M50 9 C26 9 18 29 18 70 C18 112 27 132 51 132 C76 132 83 109 83 69 C83 29 76 9 50 9 Z',
 'M31 30 L60 10 L60 132',
 'M18 38 C18 20 32 9 52 9 C74 9 84 22 84 41 C84 62 65 79 49 96 L18 132 L85 132',
 'M22 24 C34 10 67 1 80 25 C92 45 78 67 55 68 C79 68 91 83 82 109 C73 138 34 141 19 121',
 'M73 132 L73 10 L15 93 L87 93',
 'M82 12 L25 12 L22 69 C37 59 62 56 76 71 C93 88 87 119 67 130 C47 140 26 131 16 117',
 'M70 10 L28 73 C17 88 14 112 30 125 C44 137 69 135 81 119 C94 100 87 76 69 70 C54 64 38 70 28 77',
 'M16 12 L86 12 L39 132',
 'M51 70 C32 70 22 57 22 40 C22 22 34 9 51 9 C69 9 81 22 80 41 C79 60 69 70 51 70 C29 70 18 83 19 103 C20 121 34 133 51 133 C71 133 83 118 83 101 C83 82 71 70 51 70',
 'M80 55 C77 73 60 79 42 73 C24 66 18 54 19 38 C21 20 34 9 51 9 C77 9 83 28 83 69 C83 107 68 131 38 133'
 ];
const OBS6_CATHODES = OBS6_CATHODE_D.map(d => new Path2D(d));
const OBS6_RADIUS = 88;
const OBS6_TILE = 2 * OBS6_RADIUS;
let obs6Materials;

function obs6Layer() {
 const canvas = document.createElement('canvas');
 canvas.width = canvas.height = OBS6_TILE;
 const ctx = canvas.getContext('2d');
 ctx.beginPath();
 ctx.arc(OBS6_RADIUS, OBS6_RADIUS, OBS6_RADIUS - 1, 0, 2 * Math.PI);
 ctx.clip();
 return ctx;
}

function obs6Trace(ctx, pattern, width, color, blur = 0, halo = 'transparent') {
 ctx.lineJoin = ctx.lineCap = 'round';
 ctx.lineWidth = width;
 ctx.strokeStyle = color;
 ctx.shadowColor = halo;
 ctx.shadowBlur = blur;
 ctx.stroke(pattern);
}

function obs6CreateMaterials() {
 // Rasterize once. During playback the canvas only copies small cached tiles.
 const gas = obs6Layer();
 const glow = gas.createRadialGradient(88, 101, 10, 88, 90, 87);
 glow.addColorStop(0, 'rgba(255,105,12,.35)');
 glow.addColorStop(.62, 'rgba(248,88,9,.24)');
 glow.addColorStop(1, 'rgba(255,86,5,0)');
 gas.fillStyle = glow;
 gas.fillRect(0, 0, OBS6_TILE, OBS6_TILE);
 const reflections = obs6Layer();
 const glass = reflections.createLinearGradient(16, 16, 145, 111);
 glass.addColorStop(0, 'rgba(244,249,255,.9)');
 glass.addColorStop(.6, 'rgba(228,234,240,.34)');
 glass.addColorStop(1, 'rgba(231,243,255,0)');
 for (const [start, end, thick] of [[3.76, 3.89, 6], [3.94, 4.14, 8], [4.18, 4.29, 5], [5.0, 5.23, 4]]) {
  reflections.beginPath();
  reflections.arc(88, 89, 72, start, end);
  reflections.lineWidth = thick;
  reflections.strokeStyle = glass;
  reflections.stroke();
 }
 reflections.beginPath();
 reflections.arc(88, 85, 77, .39, 2.82);
 reflections.strokeStyle = 'rgba(240,136,62,.28)';
 reflections.lineWidth = 2;
 reflections.stroke();

 const digits = OBS6_CATHODES.map(path => {
  const metal = obs6Layer();
  const halo = obs6Layer();
  const hot = obs6Layer();
  const solid = obs6Layer();
  const points = obs6Layer();
  for (const ctx of [metal,halo,hot,solid,points]) {
   ctx.translate(88,87);
   ctx.scale(1.12,1.02);
   ctx.translate(-50,-71);
  }
  obs6Trace(metal,path,5,'rgba(24,11,5,.68)');
  obs6Trace(metal,path,2,'rgba(165,97,51,.45)');
  obs6Trace(halo,path,7,'rgba(255,94,5,.46)',12,'#ff6708');
  obs6Trace(halo,path,3,'rgba(255,119,14,.55)',3,'#ff8405');
  obs6Trace(hot,path,10,'rgba(255,99,8,.23)',21,'#ff5600');
  obs6Trace(hot,path,4.4,'rgba(255,120,16,.48)',10,'#ff8208');
  obs6Trace(solid,path,4.5,'#ff9e28',5,'#ff860e');
  obs6Trace(solid,path,2.5,'#ffe4a0');
  points.setLineDash([1.2,5.7]);
  obs6Trace(points,path,5.1,'#ffb242',3.5,'#ff8d20');
  obs6Trace(points,path,3.0,'#fff2c1');
  return {metal:metal.canvas,halo:halo.canvas,hot:hot.canvas,solid:solid.canvas,points:points.canvas};
 });
 return { gas:gas.canvas, reflections:reflections.canvas, digits };
}
function obs6PaintDigit(ctx,char,x,y,brightness,textured){
 const layers = obs6Materials.digits[Number(char)];
 ctx.clearRect(x,y,OBS6_TILE,OBS6_TILE);
 ctx.globalAlpha = 1;
 ctx.drawImage(layers.metal,x,y);
 if (brightness === 0) return;
 const boost = OBS6_CLAMP((brightness-.60)/.40,0,1)**1.5;
 ctx.globalAlpha = brightness;
 ctx.drawImage(obs6Materials.gas,x,y);
 ctx.drawImage(layers.halo,x,y);
 if (boost > 0) {
  ctx.globalAlpha = boost;
  ctx.globalCompositeOperation = 'lighter';
  ctx.drawImage(layers.hot,x,y);
  ctx.globalCompositeOperation = 'source-over';
 }
 ctx.globalAlpha = brightness;
 ctx.drawImage(textured ? layers.points : layers.solid,x,y);
 ctx.globalAlpha = 1;
}
class Obsidian6Engine {
 constructor(mount, settings={}, isHA=false, changed={}){
  this.mount = mount;
  this.settings = settings;
  this.isHA = isHA;
  this.hass = null;
  const id = settings.id || settings.title || 'default';
  this.savedKey = 'obsidian6.v7.' + (isHA ? 'ha.' : 'html.') + id;
  let saved;
  try {
   saved = JSON.parse(localStorage.getItem(this.savedKey) || localStorage.getItem('obsidian6.v6.' + id) || '{}');
  } catch {}
  this.opts = obs6Settings({...settings,...saved,...changed,ha_mode:isHA});
  this.locale = obs6Locale(this.opts.language);
  this.t = obs6Translator(this.locale);
  this.feedbackKey = 'reopen';
  if (Object.keys(changed).length) this.save();
  this.previewBrightness = null;
  this.timerLeft = 300000;
  this.swAccum = this.swBegin = 0;
  this.sweepStarted = null;
  this.nextSweep = performance.now() + OBS6_SWEEP_INTERVAL;
  this.timerRun = this.swRun = false;
  this.lastChars = '';
  this.frame = 0;
  this.build();
  this.applyLanguage();
  this.listen();
  obs6Materials ||= obs6CreateMaterials();
  const optics = this.q('[data-optics]').getContext('2d');
  for (const [x,y] of OBS6_CENTERS) optics.drawImage(obs6Materials.reflections,x-OBS6_RADIUS,y-OBS6_RADIUS);
  this.syncControls();
  this.runClock();
 }
 build(){
  this.mount.innerHTML=`<div class="obs6-root"><div class="obs6-stage" data-stage>
  <img class="obs6-shell obs6-off" src="${OBS6_ASSETS.off}" alt="" aria-hidden="true"/>
  <img class="obs6-shell obs6-on" src="${OBS6_ASSETS.on}" data-i18n-alt="clockAlt"/>
  <canvas width="${OBS6_W}" height="${OBS6_H}" data-canvas aria-hidden="true"></canvas>
  <canvas class="obs6-optics" width="${OBS6_W}" height="${OBS6_H}" data-optics aria-hidden="true"></canvas>
  <button class="obs6-hit fox" data-open data-i18n-title="settings" data-i18n-aria="settingsFox"></button>
  <button class="obs6-hit title" data-open data-i18n-title="settings" data-i18n-aria="settingsTitle"></button></div>
  <dialog class="obs6-modal" data-mask data-i18n-aria="settings"><div class="obs6-dialog">
  <div class="obs6-dialog-head"><div><strong>OBSIDIAN-6</strong><small><span data-i18n="systemLabel"></span> · by Antarikfox</small></div><button class="obs6-x" data-close autofocus data-i18n-aria="close">×</button></div>
  <div class="obs6-section" data-i18n="powerGlow"></div>
  <div class="obs6-grid">
  <div class="obs6-control"><span data-i18n="power"></span><button class="obs6-tgl" data-power aria-pressed="true">ON</button></div>
  <div class="obs6-control"><span data-i18n="protection"></span><button class="obs6-tgl" data-poison aria-pressed="true">ON</button></div>
  <div class="obs6-field wide obs6-sweep-tools"><button class="obs6-act" data-poison-test data-i18n="runSweep"></button><output class="obs6-sweep-status" data-poison-status aria-live="polite"></output></div>
  <div class="obs6-field wide"><span class="obs6-label" data-i18n="brightness"></span><div class="obs6-row"><input class="obs6-range" type="range" min="0" max="100" step="1" data-bright data-i18n-aria="brightness"/><output data-bright-value>82%</output></div></div>
  </div>
  <div class="obs6-section" data-i18n="glassGlow"></div>
  <div class="obs6-grid">
  <div class="obs6-control"><span data-i18n="night"></span><button class="obs6-tgl" data-night aria-pressed="false">OFF</button></div>
  <div class="obs6-field wide"><span class="obs6-label" data-i18n="reflections"></span><div class="obs6-row"><input class="obs6-range" type="range" min="0" max="100" step="1" data-glass data-i18n-aria="reflections"/><output data-glass-value>74%</output></div></div>
  <div class="obs6-control"><span data-i18n="texture"></span><canvas class="obs6-sample" data-sample width="176" height="176" data-i18n-aria="preview"></canvas><button class="obs6-tgl" data-fade aria-pressed="true">ON</button></div>
  </div>
  <p class="obs6-caption" data-i18n="textureHelp"></p>
  <div class="obs6-section" data-i18n="timeModes"></div><div class="obs6-grid">
  <div class="obs6-field"><span class="obs6-label" data-i18n="displayMode"></span><div class="obs6-combo" data-mode-combo></div></div>
  <div class="obs6-field"><span class="obs6-label" data-i18n="timeFormat"></span><div class="obs6-combo" data-format-combo></div></div>
  <div class="obs6-field wide"><span class="obs6-label" data-i18n="timeZone"></span><div class="obs6-combo" data-tz-combo></div></div></div>
  <div class="obs6-chron" data-timer-ui hidden><label class="obs6-label"><span data-i18n="minutes"></span> <input class="obs6-input" data-minutes type="number" value="5" min="0" max="999"/></label><label class="obs6-label"><span data-i18n="seconds"></span> <input class="obs6-input" data-seconds type="number" value="0" min="0" max="59"/></label><button class="obs6-act primary" data-timer-go></button><button class="obs6-act" data-timer-reset data-i18n="reset"></button></div>
  <div class="obs6-chron" data-sw-ui hidden><button class="obs6-act primary" data-sw-go></button><button class="obs6-act" data-sw-reset data-i18n="reset"></button></div>
  ${this.isHA ? `<div class="obs6-section">HOME ASSISTANT</div><div class="obs6-grid"><div class="obs6-field wide"><span class="obs6-label" data-i18n="powerEntity"></span><div class="obs6-combo" data-power-entity></div></div><div class="obs6-field wide"><span class="obs6-label" data-i18n="brightnessEntity"></span><div class="obs6-combo" data-bright-entity></div></div></div>
  ` : ''}
  <div class="obs6-section" data-i18n="display"></div>
  <label class="obs6-field"><span class="obs6-label" data-i18n="language"></span><select class="obs6-input" data-language></select></label>
  <div class="obs6-actions"><button class="obs6-act" data-full data-i18n="fullScreen"></button><button class="obs6-act" data-reset data-i18n="defaults"></button></div>
  <div class="obs6-feedback" data-feedback></div>
  </div></dialog></div>`;
  obs6Translate(this.mount,this.t);
  this.stage = this.mount.querySelector('[data-stage]');
  this.sampleContext = this.mount.querySelector('[data-sample]').getContext('2d');
  this.modal = this.mount.querySelector('[data-mask]');
  this.ctx = this.mount.querySelector('[data-canvas]').getContext('2d');
  this.controls = {};
  for (const node of this.mount.querySelectorAll('button,input,select,output,[data-minutes],[data-seconds],[data-timer-ui],[data-sw-ui],[data-feedback],[data-optics]')) {
   for (const attr of node.attributes) if (attr.name.startsWith('data-')) this.controls['['+attr.name+']'] = node;
  }
  const combo = (selector, provider, key, lookup) => new Obsidian6Combo(this.q(selector), provider, this.opts[key], value => {
   this.opts[key] = value;
   if (key === 'brightness_entity') {
    clearTimeout(this.brightTimer);
    this.brightTimer = 0;
    clearTimeout(this.previewTimer);
    this.previewBrightness = null;
   }
   if (key === 'mode') this.sweepStarted = null;
   this.save();
   this.syncControls();
   this.queueDraw();
  }, lookup, key=>this.t(key));
  this.combos = {
   mode:combo('[data-mode-combo]',()=>OBS6_MODES.map(value=>({value,label:this.t(value)})),'mode'),
   time_format:combo('[data-format-combo]',()=>[{value:'24',label:this.t('hours24')},{value:'12',label:this.t('hours12')}],'time_format'),
   time_zone:combo('[data-tz-combo]',()=>obs6Zones(this.t),'time_zone')
  };
  if (this.isHA) {
   const label = id => obs6EntityLabel(this.hass,id,this.t);
   this.combos.power_entity = combo('[data-power-entity]',()=>obs6EntityChoices(this.hass,'power',this.t,this.locale),'power_entity',label);
   this.combos.brightness_entity = combo('[data-bright-entity]',()=>obs6EntityChoices(this.hass,'brightness',this.t,this.locale),'brightness_entity',label);
  }
 }
 applyLanguage(){
  this.locale = obs6Locale(this.opts.language,this.hass?.language || this.hass?.locale?.language);
  this.t = obs6Translator(this.locale);
  this.mount.querySelector('.obs6-root').lang = this.locale;
  if (!this.isHA) document.documentElement.lang = this.locale;
  obs6Translate(this.mount,this.t);
  const select = this.q('[data-language]');
  select.innerHTML = obs6LanguageOptions(this.t);
  select.value = this.opts.language;
  for (const combo of Object.values(this.combos)) combo.refreshLanguage();
  this.feedback(this.feedbackKey);
 }
 q(sel){return this.controls[sel] || this.mount.querySelector(sel)}
 setHass(hass) {
  const oldOn = this.effectiveOn(), oldBrightness = this.effectiveBrightness();
  this.hass = hass;
  const languageChanged = this.locale !== obs6Locale(this.opts.language,hass?.language || hass?.locale?.language);
  if (languageChanged) this.applyLanguage();
  if (this.previewBrightness !== null && !this.brightTimer &&
      Math.abs(this.effectiveBrightness() - this.previewBrightness) < 1) {
   this.previewBrightness = null;
   clearTimeout(this.previewTimer);
  }
  if (languageChanged || oldOn !== this.effectiveOn() || oldBrightness !== this.effectiveBrightness()) {
   this.syncControls();
   this.queueDraw();
  }
 }
 save(){
  try {
   const values = Object.fromEntries(Object.keys(OBS6_DEFAULTS).map(key => [key, this.opts[key]]));
   localStorage.setItem(this.savedKey, JSON.stringify(values));
  } catch {}
 }
 effectiveOn(){
  const id = this.opts.power_entity;
  const state = id && this.hass?.states?.[id]?.state;
  return ['on','off'].includes(state) ? state === 'on' : !!this.opts.on;
 }
 effectiveBrightness(){
  const id = this.opts.brightness_entity;
  const entity = id && this.hass?.states?.[id];
  if (entity && !['unavailable','unknown'].includes(entity.state)) {
   if (id.startsWith('light.')) {
    if (entity.state === 'off') return 0;
    const value = Number(entity.attributes?.brightness);
    if (Number.isFinite(value)) return OBS6_CLAMP(Math.round(value / 255 * 100), 0, 100);
   } else if (Number.isFinite(Number(entity.state))) {
    const { min = 0, max = 100 } = entity.attributes || {};
    if (max > min) return OBS6_CLAMP(Math.round((Number(entity.state) - min) / (max - min) * 100), 0, 100);
   }
  }
  return this.opts.brightness;
 }
 syncControls(){
  this.stage.classList.toggle('off', !this.effectiveOn());
  this.stage.classList.toggle('obs6-night', !!this.opts.night_mode);
  const reflection = this.opts.glass_strength / 100;
  this.stage.style.setProperty('--obs6-glass-opacity', String(reflection));
  if (!this.modal.open) return;
  for (const [sel, active] of [
   ['[data-power]',this.effectiveOn()], ['[data-poison]',this.opts.anti_poison],
   ['[data-night]',this.opts.night_mode], ['[data-fade]',this.opts.transition_fx]
  ]) {
   const button = this.q(sel);
   button.textContent = this.t(active ? 'on' : 'off');
   button.classList.toggle('off', !active);
   button.setAttribute('aria-pressed', String(active));
  }
  const bright = this.previewBrightness ?? this.effectiveBrightness();
  this.q('[data-bright]').value = bright;
  this.q('[data-bright-value]').textContent = bright + '%';
  this.q('[data-glass]').value = this.opts.glass_strength;
  this.q('[data-glass-value]').textContent = this.opts.glass_strength + '%';
  this.q('[data-timer-ui]').hidden = this.opts.mode !== 'timer';
  this.q('[data-sw-ui]').hidden = this.opts.mode !== 'stopwatch';
  this.q('[data-timer-go]').textContent = this.t(this.timerRun ? 'pause' : 'start');
  this.q('[data-sw-go]').textContent = this.t(this.swRun ? 'pause' : 'start');
 }
 feedback(key){this.feedbackKey = key;this.q('[data-feedback]').textContent = this.t(key)}
 listen(){
  this.mount.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => this.open()));
  this.q('[data-close]').addEventListener('click', () => this.close());
  this.q('[data-language]').addEventListener('change', e => {
   this.opts.language = e.target.value;
   this.save();
   this.applyLanguage();
   this.syncControls();
   this.queueDraw();
  });
  this.modal.addEventListener('click', event => {
   if (event.target === this.modal) this.close();
  });
  this.modal.addEventListener('close', () => {
   if (this.modal.open) return;
   for (const combo of Object.values(this.combos)) combo.hide();
  });
  this.q('[data-power]').addEventListener('click', () => this.togglePower());
  for (const [selector, key] of [['[data-poison]','anti_poison'], ['[data-night]','night_mode'], ['[data-fade]','transition_fx']]) {
   this.q(selector).addEventListener('click', () => {
    this.opts[key] = !this.opts[key];
    if (key === 'anti_poison') {
     this.sweepStarted = null;
     if (this.opts.anti_poison) {
      this.nextSweep = performance.now() + OBS6_SWEEP_INTERVAL;
      this.startSweep();
     }
    }
    this.save();
    this.syncControls();
    this.queueDraw();
    this.beep();
   });
  }
  this.q('[data-poison-test]').addEventListener('click', () => this.startSweep());
  this.q('[data-glass]').addEventListener('input', e => {
   this.opts.glass_strength = Number(e.target.value);
   this.q('[data-glass-value]').textContent = this.opts.glass_strength + '%';
   this.stage.style.setProperty('--obs6-glass-opacity', String(this.opts.glass_strength / 100));
   this.scheduleSave();
  });
  this.q('[data-bright]').addEventListener('input', e => this.setBrightness(Number(e.target.value)));
  this.q('[data-full]').addEventListener('click', () => this.fullscreen());
  this.q('[data-reset]').addEventListener('click', () => {
   clearTimeout(this.brightTimer);
   this.brightTimer = 0;
   clearTimeout(this.previewTimer);
   this.previewBrightness = null;
   this.opts = obs6Settings({...this.settings,ha_mode:this.isHA});
   this.applyLanguage();
   this.sweepStarted = null;
   this.nextSweep = performance.now() + OBS6_SWEEP_INTERVAL;
   this.save();
   for (const [key, combo] of Object.entries(this.combos)) combo.setValue(this.opts[key]);
   this.syncControls();
   this.queueDraw();
   this.feedback('defaultsRestored');
  });
  this.q('[data-timer-go]').addEventListener('click', () => {
   const now = Date.now();
   if (this.timerRun) this.timerLeft = Math.max(0, this.timerEnd - now);
   else if (!this.timerLeft) this.timerLeft = this.timerInputs();
   this.timerRun = !this.timerRun && this.timerLeft > 0;
   if (this.timerRun) this.timerEnd = now + this.timerLeft;
   this.q('[data-timer-go]').textContent = this.timerRun ? this.t('pause') : this.t('start');
   this.queueDraw();
   this.beep();
  });
  const resetTimer = () => {
   this.timerRun = false;
   this.timerLeft = this.timerInputs();
   this.q('[data-timer-go]').textContent = this.t('start');
   this.queueDraw();
  };
  this.q('[data-timer-reset]').addEventListener('click', () => {resetTimer();this.beep()});
  for (const sel of ['[data-minutes]', '[data-seconds]']) {
   this.q(sel).addEventListener('change', () => {
    if (!this.timerRun) resetTimer();
   });
  }
  this.q('[data-sw-go]').addEventListener('click', () => {
   const now = performance.now();
   if (this.swRun) this.swAccum += now - this.swBegin;
   else this.swBegin = now;
   this.swRun = !this.swRun;
   this.q('[data-sw-go]').textContent = this.swRun ? this.t('pause') : this.t('start');
   this.queueDraw();
   this.beep();
  });
  this.q('[data-sw-reset]').addEventListener('click', () => {
   this.swRun = false;
   this.swAccum = 0;
   this.q('[data-sw-go]').textContent = this.t('start');
   this.queueDraw();
   this.beep();
  });
  this.keyHandler = e => {
   if (e.key.toLowerCase() === 'f' && !this.modal.open && !['INPUT','TEXTAREA','BUTTON'].includes(document.activeElement?.tagName)) this.fullscreen();
  };
  if (!this.isHA) document.addEventListener('keydown', this.keyHandler);
 }
 timerInputs(){
  const minutes = Math.floor(OBS6_CLAMP(Number(this.q('[data-minutes]').value) || 0,0,999));
  const seconds = Math.floor(OBS6_CLAMP(Number(this.q('[data-seconds]').value) || 0,0,59));
  return (minutes * 60 + seconds) * 1000;
 }
 beep(){
  if (!this.opts.sound) return;
  try {
   const AC = window.AudioContext || window.webkitAudioContext;
   const audio = this.audio ||= new AC();
   const oscillator = audio.createOscillator(), gain = audio.createGain();
   gain.gain.value = .015;
   oscillator.connect(gain).connect(audio.destination);
   oscillator.start();
   oscillator.stop(audio.currentTime + .07);
  } catch {}
 }
 async togglePower(){
  const id = this.opts.power_entity;
  const on = this.effectiveOn();
  if (id && this.hass) {
   try {
    await this.hass.callService(id.split('.')[0], on ? 'turn_off' : 'turn_on', {entity_id:id});
    this.feedback('commandSent');
   } catch {
    this.feedback('commandFailed');
   }
  } else {
   this.opts.on = !on;
   this.save();
   this.syncControls();
   this.queueDraw();
  }
  this.beep();
 }
 scheduleSave(){
  clearTimeout(this.saveTimer);
  this.saveTimer = setTimeout(() => {this.saveTimer = 0;this.save()}, 220);
 }
 setBrightness(value){
  this.opts.brightness = value;
  const id = this.opts.brightness_entity;
  const connected = id && this.hass;
  this.previewBrightness = connected ? value : null;
  this.q('[data-bright-value]').textContent = value + '%';
  this.scheduleSave();
  this.queueDraw();
  clearTimeout(this.brightTimer);
  this.brightTimer = 0;
  clearTimeout(this.previewTimer);
  if (!connected) return;
  this.brightTimer = setTimeout(async () => {
   this.brightTimer = 0;
   try {
    const domain = id.split('.')[0];
    if (domain === 'light') {
     const data = value ? {entity_id:id,brightness_pct:value} : {entity_id:id};
     await this.hass.callService(domain, value ? 'turn_on' : 'turn_off', data);
    } else {
     const attrs = this.hass.states[id]?.attributes || {};
     const {min = 0, max = 100} = attrs;
     const requested = min + (max - min) * value / 100;
     const step = Number(attrs.step);
     const snapped = step > 0 ? min + Math.round((requested - min) / step) * step : requested;
     await this.hass.callService(domain, 'set_value', {entity_id:id,value:OBS6_CLAMP(Number(snapped.toFixed(8)),min,max)});
    }
   } catch {
    this.feedback('brightnessFailed');
   }
  }, 260);
  this.previewTimer = setTimeout(() => {this.previewBrightness = null;this.syncControls();this.queueDraw()}, 3000);
 }
 open(){
  if (this.modal.open) return;
  this.modal.showModal();
  this.sampleKey = null;
  this.syncControls();
  this.queueDraw();
  for (const [key, combo] of Object.entries(this.combos)) combo.setValue(this.opts[key]);
  this.q('[data-close]').focus({preventScroll:true});
 }
 close(){this.modal.close()}
 async fullscreen(){
  this.close();
  try {
   const element = this.isHA ? this.mount.getRootNode().host : document.documentElement;
   if (document.fullscreenElement) await document.exitFullscreen();
   else await element.requestFullscreen();
  } catch {
   this.open();
   this.feedback('fullscreenFailed');
  }
 }
 fmtTime(now){
  const date = new Date(now);
  const zone = this.opts.time_zone;
  if (this.formatterZone !== zone) {
   this.formatterZone = zone;
   this.formatter = null;
   if (zone !== 'local') {
    try {
     this.formatter = new Intl.DateTimeFormat('en-GB',{
      timeZone:zone,hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'
     });
    } catch {}
   }
  }
  if (!this.formatter) return [date.getHours(),date.getMinutes(),date.getSeconds(),date.getDate(),date.getMonth()+1,date.getFullYear()%100];
  const parts = {};
  for (const part of this.formatter.formatToParts(date)) if (part.type !== 'literal') parts[part.type] = Number(part.value);
  return [parts.hour,parts.minute,parts.second,parts.day,parts.month,parts.year%100];
 }
 updateTimer(now){
  if (!this.timerRun) return;
  this.timerLeft = Math.max(0,this.timerEnd-now);
  if (this.timerLeft > 0) return;
  this.timerRun = false;
  this.q('[data-timer-go]').textContent = this.t('start');
  this.beep();
 }
 digits(now){
  const two = value => String(Math.floor(value)).padStart(2,'0');
  if (this.opts.mode === 'timer') {
   const seconds = Math.ceil(this.timerLeft / 1000);
   return two(seconds / 3600) + two(seconds / 60 % 60) + two(seconds % 60);
  }
  if (this.opts.mode === 'stopwatch') {
   const cs = Math.floor((this.swAccum + (this.swRun ? performance.now() - this.swBegin : 0)) / 10);
   return two(cs / 6000 % 100) + two(cs / 100 % 60) + two(cs % 100);
  }
  const [hour,minute,second,day,month,year] = this.fmtTime(now);
  if (this.opts.mode === 'date') return two(day) + two(month) + two(year);
  return two(this.opts.time_format === '12' ? hour % 12 || 12 : hour) + two(minute) + two(second);
 }
 protectionReady(){
  return this.effectiveOn() && (this.previewBrightness ?? this.effectiveBrightness()) > 0 &&
   (this.opts.mode === 'clock' || this.opts.mode === 'date');
 }
 startSweep(){
  if (!this.opts.anti_poison || !this.protectionReady()) return;
  this.sweepStarted = performance.now();
  this.nextSweep = this.sweepStarted + OBS6_SWEEP_INTERVAL;
  this.queueDraw();
 }
 updateProtection(moment){
  if (!this.opts.anti_poison || !this.protectionReady()) {
   this.sweepStarted = null;
  } else if (moment >= this.nextSweep && this.sweepStarted === null) {
   this.sweepStarted = moment;
   this.nextSweep = moment + OBS6_SWEEP_INTERVAL;
  }
  const step = this.sweepStarted === null ? 10 : Math.floor((moment-this.sweepStarted)/OBS6_SWEEP_STEP);
  if (step >= 10) this.sweepStarted = null;
  if (this.modal.open) {
   const test = this.q('[data-poison-test]');
   test.disabled = !this.opts.anti_poison || !this.protectionReady() || step < 10;
   const status = this.q('[data-poison-status]');
   let message = this.t('disabled');
   if (this.opts.anti_poison) {
    if (!this.effectiveOn() || (this.previewBrightness ?? this.effectiveBrightness()) === 0) message = this.t('waitingPower');
    else if (!this.protectionReady()) message = this.t('protectionAvailable');
    else if (step < 10) message = this.t('sweeping',{digits:String(step).repeat(6)});
    else message = this.t('nextSweep',{minutes:Math.max(1,Math.ceil((this.nextSweep-moment)/60000))});
   }
   if (status.textContent !== message) status.textContent = message;
  }
  return step < 10 ? String(step).repeat(6) : null;
 }
 draw(){
  const now = Date.now();
  this.updateTimer(now);
  const sweep = this.updateProtection(performance.now());
  if (!this.effectiveOn()) {
   if (this.lastChars) this.ctx.clearRect(0,0,OBS6_W,OBS6_H);
   this.lastChars = '';
   if (this.modal.open && this.sampleKey !== 'off') {
    this.sampleKey = 'off';
    obs6PaintDigit(this.sampleContext,'8',0,0,0,false);
   }
   return;
  }
  const chars = sweep ?? this.digits(now);
  const dimmer = (this.previewBrightness ?? this.effectiveBrightness()) / 100;
  const brightness = (dimmer * (this.opts.night_mode ? .26 : 1)) ** .85;

   const texture = this.opts.transition_fx;
   const all = brightness !== this.lastBrightness || texture !== this.lastTexture;
   for (const [i, [cx,cy]] of OBS6_CENTERS.entries()) {
    if (all || chars[i] !== this.lastChars[i]) {
     obs6PaintDigit(this.ctx,chars[i],cx-OBS6_RADIUS,cy-OBS6_RADIUS,brightness,texture);
    }
   }
   this.lastChars = chars;
   this.lastBrightness = brightness;
   this.lastTexture = texture;
   if (this.modal.open && `${brightness}/${texture}` !== this.sampleKey) {
    this.sampleKey = `${brightness}/${texture}`;
    obs6PaintDigit(this.sampleContext,'8',0,0,this.effectiveOn() ? brightness : 0,texture);
   }
 }
 queueDraw(){
  if (this.frame) return;
  this.frame = requestAnimationFrame(() => {
   this.frame = 0;
   this.runClock();
  });
 }
 runClock(){
  clearTimeout(this.tick);
  this.draw();
  const now = Date.now();
  let delay = 1002 - now % 1000;
  if (this.effectiveOn() && this.opts.mode === 'stopwatch' && this.swRun) delay = 33;
  if (this.sweepStarted !== null) delay = Math.max(2,Math.min(delay,OBS6_SWEEP_STEP-(performance.now()-this.sweepStarted)%OBS6_SWEEP_STEP));
  if (this.timerRun) delay = Math.min(delay,(this.timerLeft % 1000 || 1000) + 2);
  this.tick = setTimeout(() => this.runClock(), delay);
 }
 destroy(){
  this.close();
  clearTimeout(this.tick);
  clearTimeout(this.brightTimer);
  clearTimeout(this.previewTimer);
  clearTimeout(this.saveTimer);
  if (this.saveTimer) this.save();
  cancelAnimationFrame(this.frame);
  this.audio?.close().catch(() => {});
  if (!this.isHA) document.removeEventListener('keydown',this.keyHandler);
 }
}
