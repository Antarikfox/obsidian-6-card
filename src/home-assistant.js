class Obsidian6Card extends HTMLElement {
 static getStubConfig(){return {type:'custom:obsidian-6-card'}}
 static getConfigElement(){return document.createElement('obsidian-6-card-editor')}
 getCardSize(){return 3}
 setConfig(config){
  const previous=this._config;
  this._config=config||{};
  const changed={};
  if(previous && (previous.id||previous.title)===(this._config.id||this._config.title)){
   for(const key of Object.keys(OBS6_DEFAULTS)) if(this._config[key]!==previous[key]) changed[key]=this._config[key]??OBS6_DEFAULTS[key];
  }
  if(!this.shadowRoot){this.attachShadow({mode:'open'});this.shadowRoot.innerHTML='<style>'+OBS6_CSS+'</style><ha-card><div id="obsidian"></div></ha-card>'}
  if(this.engine){this.engine.destroy();this.engine=null}
  this.engine=new Obsidian6Engine(this.shadowRoot.getElementById('obsidian'),this._config,true,changed);
  if(this._hass)this.engine.setHass(this._hass)
 }
 set hass(hass){this._hass=hass;if(this.engine)this.engine.setHass(hass)}
 get hass(){return this._hass}
 disconnectedCallback(){this.engine?.destroy();this.engine=null}
 connectedCallback(){if(this._config&&!this.engine)this.setConfig(this._config)}
}
class Obsidian6CardEditor extends HTMLElement {
 constructor(){super();this.attachShadow({mode:'open'})}
 setConfig(c){this._config={...c};this.render()}
 set hass(h){
  const old=this._hass;
  this._hass=h;
  const locale = obs6Locale(this._config?.language,h?.language || h?.locale?.language);
  if (this._config && locale !== this.locale) {this.applyLanguage();return}
  for(const combo of [this.ecPower,this.ecBright]){
   const id=combo?.value;
   if(id&&obs6EntityLabel(old,id,this.t)!==obs6EntityLabel(h,id,this.t)) combo.setValue(id);
  }
 }
 changed(key,val){this._config={...this._config,[key]:val};this.dispatchEvent(new CustomEvent('config-changed',{detail:{config:this._config},bubbles:true,composed:true}))}
 applyLanguage(){
  this.locale = obs6Locale(this._config.language,this._hass?.language || this._hass?.locale?.language);
  this.t = obs6Translator(this.locale);
  this.shadowRoot.querySelector('.obs6-editor').lang = this.locale;
  obs6Translate(this.shadowRoot,this.t);
  const language = this.shadowRoot.querySelector('[data-ed-language]');
  language.innerHTML = obs6LanguageOptions(this.t);
  language.value = this._config.language || 'auto';
  for (const combo of [this.ecPower,this.ecBright]) combo?.refreshLanguage();
 }
 render(){if(!this._config)return;this.shadowRoot.innerHTML='<style>'+OBS6_CSS+'</style><div class="obs6-editor"><h3>OBSIDIAN-6 · <span data-i18n="editor"></span></h3><p class="obs6-caption" data-i18n="editorHint"></p><div class="obs6-grid"><label class="obs6-field wide"><span class="obs6-label" data-i18n="language"></span><select class="obs6-input" data-ed-language></select></label><label class="obs6-field"><span class="obs6-label" data-i18n="identifier"></span><input class="obs6-input" data-ed-title placeholder="OBSIDIAN-6"/></label><label class="obs6-field"><span class="obs6-label" data-i18n="initialBrightness"></span><input class="obs6-input" data-ed-bright type="number" min="0" max="100"/></label><div class="obs6-field wide"><span class="obs6-label" data-i18n="powerEntity"></span><div class="obs6-combo" data-ed-power></div></div><div class="obs6-field wide"><span class="obs6-label" data-i18n="brightnessEntity"></span><div class="obs6-combo" data-ed-bentity></div></div></div></div>';
  this.ecPower = this.ecBright = null;
  this.applyLanguage();
  const q=s=>this.shadowRoot.querySelector(s);
  q('[data-ed-language]').addEventListener('change', e=>{
   this.changed('language',e.target.value);
   this.applyLanguage();
  });
  q('[data-ed-title]').value=this._config.title||'';q('[data-ed-title]').addEventListener('change',e=>this.changed('title',e.target.value));
  q('[data-ed-bright]').value=this._config.brightness??82;q('[data-ed-bright]').addEventListener('change',e=>this.changed('brightness',OBS6_CLAMP(Number(e.target.value),0,100)));
  this.ecPower=new Obsidian6Combo(q('[data-ed-power]'),()=>obs6EntityChoices(this._hass,'power',this.t,this.locale),this._config.power_entity||'',v=>this.changed('power_entity',v),id=>obs6EntityLabel(this._hass,id,this.t),key=>this.t(key));
  this.ecBright=new Obsidian6Combo(q('[data-ed-bentity]'),()=>obs6EntityChoices(this._hass,'brightness',this.t,this.locale),this._config.brightness_entity||'',v=>this.changed('brightness_entity',v),id=>obs6EntityLabel(this._hass,id,this.t),key=>this.t(key));
 }
}
if(!customElements.get('obsidian-6-card'))customElements.define('obsidian-6-card',Obsidian6Card);
if(!customElements.get('obsidian-6-card-editor'))customElements.define('obsidian-6-card-editor',Obsidian6CardEditor);
window.customCards=window.customCards||[];
if(!window.customCards.some(c=>c.type==='obsidian-6-card'))window.customCards.push({type:'obsidian-6-card',name:'OBSIDIAN-6 v7.6 · by Antarikfox',description:obs6Translator(obs6Locale())('description'),preview:true});

