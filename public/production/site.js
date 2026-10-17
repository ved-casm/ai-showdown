const menuButton=document.querySelector('.burger');
const menu=document.querySelector('.mobile-menu');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');menu.hidden=!open;});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');}));
window.addEventListener('scroll',()=>document.querySelector('.site-nav')?.classList.toggle('scrolled',window.scrollY>8),{passive:true});
document.querySelectorAll('.demo-cart').forEach(button=>button.addEventListener('click',()=>{document.querySelector('.cart-status').textContent='This is a layout concept. No order has been placed.';}));
