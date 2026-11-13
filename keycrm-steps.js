/* keyCRM «Що ми робимо»: grid gallery. The tile you point at takes the stage:
   its row and column grow, the others give way, the description fades up.
   Hover, focus (Tab + arrows) and tap. Replaces the six narrow bars. */
!function(){
var EXPAND=1.95,SHRINK=.9;
var CSS='.pbg{position:relative;width:100%;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none}'
+'.pbg-grid{display:grid;width:100%;gap:16px;transition:grid-template-columns .5s cubic-bezier(.25,1,.5,1),grid-template-rows .5s cubic-bezier(.25,1,.5,1)}'
+'.pbg-tile{position:relative;min-width:0;min-height:0;overflow:hidden;border-radius:24px;cursor:pointer;color:#111144;background:#fff;border:1px solid rgba(17,17,68,.1);box-shadow:0 22px 44px -28px rgba(5,9,40,.6);outline:none;contain:layout paint}'
+'.pbg-tile:focus-visible{box-shadow:0 0 0 3px #2431A4}'
+'.pbg-num{position:absolute;left:24px;top:24px;display:inline-block;font:700 14px/1 Manrope,"Inter Variable",system-ui,sans-serif;color:#1B2E8C;background:#EEF2FF;border:1px solid #DCE3F8;border-radius:6px;padding:6px 10px}'
+'.pbg-foot{position:absolute;left:24px;right:24px;bottom:24px}'
+'.pbg-cap{font:600 22px/1.25 Manrope,"Inter Variable",system-ui,sans-serif;color:#111144;margin:0;text-wrap:balance;transition:font-size .4s}'
+'.pbg-tile.on .pbg-cap{font-size:26px}'
+'.pbg-desc{font:400 16px/1.55 Manrope,"Inter Variable",system-ui,sans-serif;color:#1B2E8C;margin:0;max-height:0;opacity:0;overflow:hidden;transform:translateY(6px);transition:max-height .4s cubic-bezier(.25,1,.5,1),opacity .3s,transform .4s cubic-bezier(.25,1,.5,1),margin .4s}'
+'.pbg-tile.on .pbg-desc{max-height:260px;opacity:1;transform:none;margin-top:12px}'
+'.pbg.m1 .pbg-num{left:18px;top:16px;font-size:13px;padding:5px 9px}.pbg.m1 .pbg-foot{left:18px;right:18px;bottom:16px}.pbg.m1 .pbg-cap{font-size:18px}.pbg.m1 .pbg-tile.on .pbg-cap{font-size:20px}'
+'@media (prefers-reduced-motion:reduce){.pbg-grid,.pbg-cap,.pbg-desc{transition:none}}'
+'[data-pb-steps]{display:none !important}';
function build(src){
  var items=Array.prototype.slice.call(src.children).map(function(e,t){
    var n=e.querySelector("span"),h=e.querySelector("h3"),p=e.querySelector("p"),m=n&&n.textContent.match(/\d+/);
    return{n:m?m[0]:"0"+(t+1),t:h?h.textContent:"",d:p?p.textContent:""}});
  var root=document.createElement("div");root.className="pbg";
  var grid=document.createElement("div");grid.className="pbg-grid";grid.setAttribute("role","list");root.appendChild(grid);
  var touch=0,active=null,cols=3,rows=2,mode=3,tiles=items.map(function(it,i){
    var el=document.createElement("div");
    el.className="pbg-tile";el.tabIndex=0;el.setAttribute("role","listitem");
    el.setAttribute("aria-label","Крок "+it.n+": "+it.t);
    el.innerHTML='<div class="pbg-num"></div><div class="pbg-foot"><div class="pbg-cap"></div><p class="pbg-desc"></p></div>';
    el.querySelector(".pbg-num").textContent="Крок "+it.n;
    el.querySelector(".pbg-cap").textContent=it.t;
    el.querySelector(".pbg-desc").textContent=it.d;
    grid.appendChild(el);return el});
  function tracks(count,act,size){var a=[];for(var i=0;i<count;i++)a.push(act===null?"1fr":i===act?EXPAND+"fr":SHRINK+"fr");return a.join(" ")}
  function layout(){
    var w=root.clientWidth||1000;
    mode=w>=900?3:w>=560?2:1;cols=mode===3?3:mode===2?2:1;rows=Math.ceil(items.length/cols);
    root.classList.toggle("m1",mode===1);
    var gap=mode===3?16:12;grid.style.gap=gap+"px";
    if(mode===1){
      var ch=92,oh=Math.min(340,Math.round(w*.95)),ar=active;
      var r=[];for(var i=0;i<items.length;i++)r.push((ar===i?oh:ch)+"px");
      grid.style.height="auto";grid.style.gridTemplateColumns="1fr";grid.style.gridTemplateRows=r.join(" ");
    }else{
      var h=mode===3?Math.max(500,Math.min(620,Math.round(w*.46))):Math.round(rows*Math.max(190,w*.32));
      grid.style.height=h+"px";
      var ac=active===null?null:active%cols,ar2=active===null?null:Math.floor(active/cols);
      grid.style.gridTemplateColumns=tracks(cols,ac);grid.style.gridTemplateRows=tracks(rows,ar2);
    }
    tiles.forEach(function(el,i){el.classList.toggle("on",active===i)});
  }
  function set(i){if(active===i)return;active=i;layout()}
  tiles.forEach(function(el,i){
    el.addEventListener("mouseenter",function(){if(!touch)set(i)});
    el.addEventListener("focus",function(){set(i)});
    el.addEventListener("pointerdown",function(e){if(e.pointerType!=="mouse"){touch=1;set(active===i?null:i)}else touch=0});
    el.addEventListener("keydown",function(e){
      var step={ArrowRight:1,ArrowLeft:-1,ArrowDown:cols,ArrowUp:-cols}[e.key];
      if(e.key==="Escape"){set(null);return}if(e.key==="Enter"||e.key===" "){e.preventDefault();set(active===i?null:i);return}
      if(step===undefined)return;var nx=i+step;if(nx<0||nx>=tiles.length)return;e.preventDefault();tiles[nx].focus()});
  });
  grid.addEventListener("mouseleave",function(){if(!touch)set(null)});
  root.addEventListener("focusout",function(e){if(!touch&&!root.contains(e.relatedTarget))set(null)});
  if(window.ResizeObserver)new ResizeObserver(layout).observe(root);else window.addEventListener("resize",layout);
  src.setAttribute("data-pb-steps","1");src.parentNode.insertBefore(root,src.nextSibling);layout();
}
function cleanup(){
  Array.prototype.slice.call(document.querySelectorAll(".pbg,.pbm")).forEach(function(e){e.parentNode&&e.parentNode.removeChild(e)});
  Array.prototype.slice.call(document.querySelectorAll("[data-pb-steps]")).forEach(function(e){e.removeAttribute("data-pb-steps")});
}
var raf=0;
function check(){
  if(raf)return;
  if(!(location.hash.indexOf("#/keycrm")===0||document.querySelector(".pbg,[data-pb-steps]")))return;
  raf=requestAnimationFrame(function(){
    raf=0;
    if(location.hash.indexOf("#/keycrm")!==0){if(document.querySelector(".pbg,[data-pb-steps]"))cleanup();return}
    var ex=document.querySelector(".pbg");
    if(ex){var sh=ex.closest("section")&&ex.closest("section").querySelector("h2");if(!(sh&&/Що ми робимо/.test(sh.textContent)))cleanup()}
    var h2=Array.prototype.slice.call(document.querySelectorAll("h2")).filter(function(e){return/Що ми робимо/.test(e.textContent)})[0];
    if(!h2)return;
    var sec=h2.closest("section");if(!sec||sec.querySelector(".pbg"))return;
    var g=Array.prototype.slice.call(sec.querySelectorAll("div.grid")).filter(function(e){return e.children.length===6})[0];
    if(!g)return;
    if(!document.getElementById("pbg-css")){var st=document.createElement("style");st.id="pbg-css";st.textContent=CSS;document.head.appendChild(st)}
    build(g);
  });
}
new MutationObserver(check).observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener("hashchange",check);check();
}();
