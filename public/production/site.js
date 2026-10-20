const menuButton=document.querySelector('.burger');
const menu=document.querySelector('.mobile-menu');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');menu.hidden=!open;});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');}));
window.addEventListener('scroll',()=>document.querySelector('.site-nav')?.classList.toggle('scrolled',window.scrollY>8),{passive:true});
document.querySelectorAll('.demo-cart').forEach(button=>button.addEventListener('click',()=>{document.querySelector('.cart-status').textContent='This is a layout concept. No order has been placed.';}));

/* hero dot field (ported from the old showdown hero): dots morph into AI monograms near the cursor */
(()=>{
const canvas=document.querySelector('canvas.dotfield');
if(!canvas)return;
const section=canvas.closest('section');
const ctx=canvas.getContext('2d');
function star4(c,s){c.beginPath();c.moveTo(0,-s);c.quadraticCurveTo(.09*s,-.09*s,s,0);c.quadraticCurveTo(.09*s,.09*s,0,s);c.quadraticCurveTo(-.09*s,.09*s,-s,0);c.quadraticCurveTo(-.09*s,-.09*s,0,-s);c.fill();}
function knot(c,s){c.lineWidth=s*.22;c.lineCap='round';for(let k=0;k<6;k++){const a=k*Math.PI/3;const cx=Math.cos(a)*s*.42,cy=Math.sin(a)*s*.42;c.beginPath();c.arc(cx,cy,s*.5,a+Math.PI*.72,a+Math.PI*1.62);c.stroke();}}
function spark(c,s){c.lineWidth=s*.16;c.lineCap='round';for(let k=0;k<12;k++){const a=k*Math.PI/6;const r1=s*.22,r2=s*(k%2?.95:.72);c.beginPath();c.moveTo(Math.cos(a)*r1,Math.sin(a)*r1);c.lineTo(Math.cos(a)*r2,Math.sin(a)*r2);c.stroke();}}
function loop(c,s){c.lineWidth=s*.3;c.lineCap='round';c.beginPath();c.ellipse(-s*.42,0,s*.42,s*.3,0,0,Math.PI*2);c.stroke();c.beginPath();c.ellipse(s*.42,0,s*.42,s*.3,0,0,Math.PI*2);c.stroke();}
function gx(c,s){c.lineWidth=s*.3;c.lineCap='round';c.beginPath();c.moveTo(-s*.7,-s*.8);c.lineTo(s*.7,s*.8);c.stroke();c.beginPath();c.moveTo(s*.7,-s*.8);c.lineTo(-s*.15,s*.1);c.stroke();c.beginPath();c.moveTo(-s*.7,s*.35);c.lineTo(-s*.35,s*.8);c.stroke();}
function boat(c,s){c.beginPath();c.moveTo(-s*.1,-s*.95);c.lineTo(-s*.1,s*.1);c.lineTo(-s*.75,s*.1);c.closePath();c.fill();c.beginPath();c.moveTo(s*.05,-s*.55);c.lineTo(s*.05,s*.1);c.lineTo(s*.6,s*.1);c.closePath();c.fill();c.beginPath();c.moveTo(-s*.9,s*.3);c.lineTo(s*.9,s*.3);c.lineTo(s*.55,s*.75);c.lineTo(-s*.55,s*.75);c.closePath();c.fill();}
function bars(c,s){[0.55,0.8,1,0.8,0.55].forEach((h,i)=>{const w=s*.26;c.fillRect((i-2)*(w+s*.12)-w/2,-s*h*.5,w,s*h);});}
function whale(c,s){c.beginPath();c.ellipse(0,s*.12,s*.78,s*.5,-.12,0,Math.PI*2);c.fill();c.beginPath();c.moveTo(s*.62,-s*.12);c.quadraticCurveTo(s*1.05,-s*.7,s*.9,-s*.78);c.quadraticCurveTo(s*.72,-s*.5,s*.5,-s*.32);c.closePath();c.fill();c.beginPath();c.arc(-s*.35,-s*.62,s*.07,0,Math.PI*2);c.arc(-s*.15,-s*.78,s*.06,0,Math.PI*2);c.fill();}
function pointer(c,s){c.lineWidth=s*.22;c.lineJoin='round';c.beginPath();c.moveTo(0,-s*.9);c.lineTo(s*.7,0);c.lineTo(0,s*.9);c.lineTo(-s*.7,0);c.closePath();c.stroke();c.beginPath();c.moveTo(0,-s*.9);c.lineTo(0,s*.9);c.stroke();}
function papill(c,s){c.beginPath();c.roundRect(-s*1.05,-s*.62,s*2.1,s*1.24,s*.62);c.fill();c.save();c.fillStyle='#F4F4F2';c.font=`700 ${s*.78}px ui-monospace, monospace`;c.textAlign='center';c.textBaseline='middle';c.fillText('PA',0,s*.04);c.restore();}
const GLYPHS=[{color:'#4795EB',draw:star4},{color:'#161616',draw:knot},{color:'#D97757',draw:spark},{color:'#0082FB',draw:loop},{color:'#161616',draw:gx},{color:'#161616',draw:boat},{color:'#FF7000',draw:bars},{color:'#4D6BFE',draw:whale},{color:'#20B8CD',draw:pointer},{color:'#161616',draw:papill}];
const SPACING=24,RADIUS=190,DOT_R=1.3;
let W=0,H=0,dpr=1,radius=RADIUS,cells=[],excl=[];
const rebuild=()=>{
 const r=section.getBoundingClientRect();
 dpr=Math.min(window.devicePixelRatio||1,2);
 W=Math.ceil(r.width);H=Math.ceil(r.height);
 radius=Math.min(RADIUS,Math.max(100,W*.32));
 canvas.width=W*dpr;canvas.height=H*dpr;
 canvas.style.width=W+'px';canvas.style.height=H+'px';
 cells=[];
 const ox=(W%SPACING)/2,oy=(H%SPACING)/2;
 for(let y=oy;y<H;y+=SPACING)for(let x=ox;x<W;x+=SPACING){
  const h=Math.abs(Math.sin(x*12.9898+y*78.233)*43758.5453)%1;
  cells.push({x,y,g:Math.floor(h*GLYPHS.length),vis:0});
 }
 const m=Math.max(28,Math.min(56,W*.045));
 excl=[];
 for(const b of section.querySelectorAll('.wrap.hero > div, .wrap.hero figure')){
  const q=b.getBoundingClientRect();
  excl.push({x0:q.left-r.left-m,y0:q.top-r.top-m,x1:q.right-r.left+m,y1:q.bottom-r.top+m});
 }
};
rebuild();
new ResizeObserver(rebuild).observe(section);
let target=null,raf=0,running=false;
const paint=()=>{
 raf=0;
 ctx.setTransform(dpr,0,0,dpr,0,0);
 ctx.clearRect(0,0,W,H);
 let anyActive=false;
 for(const c of cells){
  let goal=0;
  if(target){const d=Math.hypot(c.x-target.x,c.y-target.y);goal=Math.max(0,1-d/radius);}
  for(const z of excl){if(c.x>=z.x0&&c.x<=z.x1&&c.y>=z.y0&&c.y<=z.y1){goal=0;break;}}
  c.vis+=(goal-c.vis)*.22;
  if(c.vis<.004)c.vis=0;
  if(c.vis>0)anyActive=true;
  const da=.3*(1-c.vis);
  if(da>.01){ctx.fillStyle=`rgba(22,22,22,${da})`;ctx.beginPath();ctx.arc(c.x,c.y,DOT_R,0,Math.PI*2);ctx.fill();}
  if(c.vis>.01){const g=GLYPHS[c.g];ctx.save();ctx.translate(c.x,c.y);const s=9.5*(.35+.65*c.vis);ctx.globalAlpha=Math.min(1,c.vis*1.15);ctx.fillStyle=g.color;ctx.strokeStyle=g.color;g.draw(ctx,s);ctx.restore();}
 }
 if(anyActive||target)schedule();else running=false;
};
const schedule=()=>{if(!raf)raf=requestAnimationFrame(paint);};
const kick=()=>{if(!running){running=true;schedule();}else schedule();};
section.addEventListener('pointermove',e=>{const r=section.getBoundingClientRect();target={x:e.clientX-r.left,y:e.clientY-r.top};kick();});
section.addEventListener('pointerleave',()=>{target=null;kick();});
if(window.matchMedia('(hover: none)').matches){
 let t=0;
 setInterval(()=>{t+=.016;target={x:W*(.5+.44*Math.sin(t*.7)),y:H*(.5+.4*Math.sin(t*1.1+1.3))};kick();},33);
}
paint();
})();

/* contact form (ported from the old version): posts to the same contact-relay endpoint */
document.querySelectorAll('.cf-form').forEach(form=>{
const paper=form.closest('.cf-paper');
const done=paper.querySelector('.cf-done');
const err=form.querySelector('.cf-error');
const submit=form.querySelector('.cf-submit');
form.addEventListener('submit',async e=>{
 e.preventDefault();
 if(submit.disabled)return;
 submit.disabled=true;submit.textContent='sending...';err.hidden=true;
 try{
  const data=new FormData(form);
  const res=await fetch('https://ved-portfolio-nine.vercel.app/api/contact-relay',{
   method:'POST',headers:{'Content-Type':'application/json'},
   body:JSON.stringify({site:'showdown',name:data.get('name'),email:data.get('email'),message:data.get('message'),company:data.get('company')})
  });
  const out=await res.json().catch(()=>({}));
  if(!res.ok||!out.ok)throw new Error(out.error||"Couldn't send right now.");
  form.reset();form.hidden=true;done.hidden=false;
 }catch(ex){
  err.textContent=ex instanceof Error?ex.message:"Couldn't send right now.";err.hidden=false;
 }finally{
  submit.disabled=false;submit.textContent='send message ↗';
 }
});
done.querySelector('[data-cf-again]').addEventListener('click',()=>{done.hidden=true;form.hidden=false;});
});
