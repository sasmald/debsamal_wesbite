const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function element(dataset={}) {return {dataset, attrs:{}, handlers:{}, classes:new Set(),setAttribute(k,v){this.attrs[k]=v},getAttribute(k){return this.attrs[k]},addEventListener(k,v){this.handlers[k]=v},focus(){this.focused=true},classList:{toggle(){}}};}
const slot=element(), toggle=element(), menu=element();
toggle.attrs['aria-expanded']='false';
menu.classList.toggle=(name,on)=>on?menu.classes.add(name):menu.classes.delete(name);
const links=['index','work','ai','about','contact'].map(page=>element({page}));
const docHandlers={};let resize;
vm.runInNewContext(fs.readFileSync('ds_website/components/header.js','utf8'),{location:{pathname:'/ai.html'},document:{querySelector:s=>s.includes('data-include')?slot:s==='.nav-toggle'?toggle:menu,querySelectorAll:()=>links,addEventListener:(k,v)=>docHandlers[k]=v},matchMedia:()=>({addEventListener:(k,v)=>resize=v})});
assert.equal(links[2].attrs['aria-current'],'page');
toggle.handlers.click(); assert.equal(toggle.attrs['aria-expanded'],'true');assert(menu.classes.has('is-open'));
docHandlers.keydown({key:'Escape'});assert.equal(toggle.attrs['aria-expanded'],'false');assert(toggle.focused);
toggle.handlers.click();menu.handlers.click({target:{closest:()=>links[0]}});assert.equal(toggle.attrs['aria-expanded'],'false');
toggle.handlers.click();resize();assert.equal(toggle.attrs['aria-expanded'],'false');
assert(slot.outerHTML.includes('aria-controls="primary-nav"'));
console.log('PASS: active route, mobile open/close, Escape and focus return, link close, desktop resize reset. DOM simulation only; not browser verification.');
