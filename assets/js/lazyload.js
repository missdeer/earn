/*! lazyload - v2.1.1 - 2018-04-01
* https://github.com/13twelve/lazyload
* Copyright (c) 2018
* License: MIT
* Author: Mike Byrne @13twelve https://github.com/13twelve
*/(function(root,factory){if(typeof define==='function'&&define.amd){define([],factory);}else if(typeof exports==='object'){module.exports=factory();}else{root.lazyLoad=factory();}}(this,function(){var options={pageUpdatedEventName:'page:updated',elements:'img[data-src], img[data-srcset], source[data-srcset], iframe[data-src], video[data-src], [data-lazyload]',rootMargin:'0px',threshold:0,maxFrameCount:10,};var frameLoop;var frameCount;var els=[];var elsLength;var observer;var checkType;function _htmlCollectionToArray(collection){var a=[];var i=0;for(a=[],i=collection.length;i;){a[--i]=collection[i];}
return a;}
function _elInViewport(el){el=(el.tagName==='SOURCE')?el.parentNode:el;var rect=el.getBoundingClientRect();return rect.bottom>0&&rect.right>0&&rect.left<(window.innerWidth||document.documentElement.clientWidth)&&rect.top<(window.innerHeight||document.documentElement.clientHeight);}
function _removeDataAttrs(el){el.removeAttribute('data-src');el.removeAttribute('data-srcset');el.removeAttribute('data-lazyload');}
function _loaded(){this.removeEventListener('load',_loaded);_removeDataAttrs(this);}
function _updateEl(el){var srcset=el.getAttribute('data-srcset');var src=el.getAttribute('data-src');var dlazyload=el.getAttribute('data-lazyload')!==null;if(srcset){el.setAttribute('srcset',srcset);if(window.picturefill){window.picturefill({elements:[el]});}}
if(src){el.src=src;}
if(dlazyload){el.setAttribute('data-lazyloaded','');el.removeEventListener('load',_loaded);_removeDataAttrs(el);}}
function _intersection(entries){if(elsLength===0){observer.disconnect();}
for(var i=0;i<entries.length;i++){var entry=entries[i];if(entry.intersectionRatio>0){elsLength--;observer.unobserve(entry.target);entry.target.addEventListener('load',_loaded,false);_updateEl(entry.target);}}}
function _setSrcs(){var i;if(checkType==='really-old'){elsLength=els.length;for(i=0;i<elsLength;i++){if(els[i]){_updateEl(els[i]);_removeDataAttrs(els[i]);}}
els=[];}else if(checkType==='old'){if(frameCount===options.maxFrameCount){elsLength=els.length;for(i=0;i<elsLength;i++){if(els[i]&&els[i].lazyloaded===undefined&&_elInViewport(els[i])){var thisEl=els[i];els[i]=undefined;thisEl.lazyloaded=true;thisEl.addEventListener('load',_loaded,false);_updateEl(thisEl);}}
for(i=0;i<elsLength;i++){if(els[i]===undefined){els.splice(i,1);}}
elsLength=els.length;frameCount=-1;}
if(elsLength>0){frameCount++;frameLoop=window.requestAnimationFrame(_setSrcs);}}else if(checkType==='new'){observer=new IntersectionObserver(_intersection,{rootMargin:options.rootMargin,threshold:options.threshold,});elsLength=els.length;for(i=0;i<elsLength;i++){if(els[i]&&els[i].lazyloaded===undefined){observer.observe(els[i]);}}}}
function _init(){if(checkType==='old'){try{cancelAnimationFrame(frameLoop);}catch(err){}}else if(checkType==='new'){try{observer.disconnect();}catch(err){}}
els=_htmlCollectionToArray(document.querySelectorAll(options.elements));elsLength=els.length;frameCount=options.maxFrameCount;_setSrcs();}
var lazyLoad=function(opts){for(var item in opts){if(opts.hasOwnProperty(item)){options[item]=opts[item];}}
if(!('addEventListener'in window)||!window.requestAnimationFrame||typeof document.body.getBoundingClientRect===undefined){checkType='really-old';}else if('IntersectionObserver'in window){checkType='new';}else{checkType='old';}
_init();if(options.pageUpdatedEventName){document.addEventListener(options.pageUpdatedEventName,_init,true);}};return lazyLoad;}));lazyLoad();