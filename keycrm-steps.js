/* keyCRM «Що ми робимо»: grid gallery. The tile you point at takes the stage:
   its row and column grow, the others give way, the description fades up.
   Hover, focus (Tab + arrows) and tap. Replaces the six narrow bars. */
!function(){
var BG=["radial-gradient(120% 90% at 20% 10%,#2431A4 0,transparent 60%),linear-gradient(160deg,#1a2170,#111144)",
"radial-gradient(120% 90% at 80% 15%,#F98513 0,transparent 55%),linear-gradient(160deg,#2431A4,#111144)",
"radial-gradient(110% 90% at 30% 90%,#C9D3FF 0,transparent 55%),linear-gradient(160deg,#2431A4,#111144)",
"radial-gradient(120% 90% at 70% 20%,#C9D3FF 0,transparent 55%),linear-gradient(160deg,#1a2170,#111144)",
"radial-gradient(120% 90% at 20% 80%,#F98513 0,transparent 55%),linear-gradient(160deg,#2431A4,#111144)",
"radial-gradient(120% 90% at 80% 80%,#C9D3FF 0,transparent 55%),linear-gradient(160deg,#1a2170,#111144)"];
var EXPAND=1.95,SHRINK=.9;
var CSS='.pbg{position:relative;width:100%;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none}'
+'.pbg-grid{display:grid;width:100%;gap:12px;transition:grid-template-columns .5s cubic-bezier(.25,1,.5,1),grid-template-rows .5s cubic-bezier(.25,1,.5,1)}'
+'.pbg-tile{position:relative;min-width:0;min-height:0;overflow:hidden;border-radius:20px;cursor:pointer;color:#fff;background:#111144;outline:none;contain:layout paint}'
+'.pbg-tile:focus-visible{box-shadow:inset 0 0 0 3px #F98513}'
+'.pbg-bg{position:absolute;inset:0;transition:transform .7s cubic-bezier(.25,1,.5,1)}'
+'.pbg-tile.on .pbg-bg{transform:scale(1.05)}'
+'.pbg-shade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(17,17,68,.35) 0,rgba(17,17,68,.12) 40%,rgba(17,17,68,.78) 100%);transition:opacity .4s}'
+'.pbg-shade.s2{background:linear-gradient(180deg,rgba(17,17,68,.3) 0,rgba(17,17,68,.35) 30%,rgba(17,17,68,.92) 100%);opacity:0}'
+'.pbg-tile.on .pbg-shade.s2{opacity:1}'
+'.pbg-num{position:absolute;left:20px;top:18px;font:800 28px/1 Manrope,"Inter Variable",system-ui,sans-serif;color:#F98513;letter-spacing:-.01em}'
+'.pbg-foot{position:absolute;left:20px;right:20px;bottom:20px}'
+'.pbg-cap{font:800 18px/1.25 Manrope,"Inter Variable",system-ui,sans-serif;color:#fff;margin:0;text-wrap:balance;transition:font-size .4s}'
+'.pbg-tile.on .pbg-cap{font-size:22px}'
+'.pbg-desc{font:500 15px/1.5 Manrope,"Inter Variable",system-ui,sans-serif;color:#E9ECF8;margin:0;max-height:0;opacity:0;overflow:hidden;transform:translateY(6px);transition:max-height .4s cubic-bezier(.25,1,.5,1),opacity .3s,transform .4s cubic-bezier(.25,1,.5,1),margin .4s}'
+'.pbg-tile.on .pbg-desc{max-height:240px;opacity:1;transform:none;margin-top:10px}'
+'.pbg.m1 .pbg-num{font-size:22px;left:16px;top:14px}.pbg.m1 .pbg-foot{left:16px;right:16px;bottom:14px}.pbg.m1 .pbg-cap{font-size:17px}.pbg.m1 .pbg-tile.on .pbg-cap{font-size:19px}'
+'@media (prefers-reduced-motion:reduce){.pbg-grid,.pbg-bg,.pbg-shade,.pbg-cap,.pbg-desc{transition:none}.pbg-tile.on .pbg-bg{transform:none}}'
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
    el.innerHTML='<div class="pbg-bg"></div><div class="pbg-shade"></div><div class="pbg-shade s2"></div><div class="pbg-num"></div><div class="pbg-foot"><p class="pbg-cap"></p><p class="pbg-desc"></p></div>';
    el.querySelector(".pbg-bg").style.background=BG[i%BG.length];
    el.querySelector(".pbg-num").textContent=it.n;
    el.querySelector(".pbg-cap").textContent=it.t;
    el.querySelector(".pbg-desc").textContent=it.d;
    grid.appendChild(el);return el});
  function tracks(count,act,size){var a=[];for(var i=0;i<count;i++)a.push(act===null?"1fr":i===act?EXPAND+"fr":SHRINK+"fr");return a.join(" ")}
  function layout(){
    var w=root.clientWidth||1000;
    mode=w>=900?3:w>=560?2:1;cols=mode===3?3:mode===2?2:1;rows=Math.ceil(items.length/cols);
    root.classList.toggle("m1",mode===1);
    var gap=mode===3?12:10;grid.style.gap=gap+"px";
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
