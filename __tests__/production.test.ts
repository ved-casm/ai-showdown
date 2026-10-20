import fs from 'fs';
import path from 'path';
const root=path.join(process.cwd(),'public','production');
const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
describe('production design system',()=>{
 test('all 10 pages use the shared stylesheet and navigation script',()=>{
  expect(pages).toHaveLength(10);
  pages.forEach(file=>{const html=fs.readFileSync(path.join(root,file),'utf8');expect(html).toContain('href="style.css"');expect(html).toContain('src="site.js"');expect(html).toContain('class="site-nav"');expect(html).toContain('class="burger"');expect(html).toMatch(/concept|spec work/i);expect(html).not.toContain('—');});
 });
 test('all referenced local image sources and responsive variants exist',()=>{
  pages.forEach(file=>{const html=fs.readFileSync(path.join(root,file),'utf8');const doc=new DOMParser().parseFromString(html,'text/html');doc.querySelectorAll('img').forEach(img=>{expect(fs.existsSync(path.join(root,img.getAttribute('src')!))).toBe(true);expect(img.getAttribute('alt')).toBeTruthy();expect(Number(img.getAttribute('width'))).toBeGreaterThan(0);expect(Number(img.getAttribute('height'))).toBeGreaterThan(0);img.getAttribute('srcset')?.split(',').forEach(src=>expect(fs.existsSync(path.join(root,src.trim().split(' ')[0]))).toBe(true));});});
 });
 test('local page links and section targets resolve',()=>{
 pages.forEach(file=>{const doc=new DOMParser().parseFromString(fs.readFileSync(path.join(root,file),'utf8'),'text/html');doc.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href')!;if(href.startsWith('/')||/^https?:/.test(href))return;const [target,hash]=href.split('#');const filename=target||file;expect(fs.existsSync(path.join(root,filename))).toBe(true);if(hash){const targetDoc=new DOMParser().parseFromString(fs.readFileSync(path.join(root,filename),'utf8'),'text/html');expect(targetDoc.getElementById(hash)).not.toBeNull();}});});
 });
 test('PDP checkout is explicitly a non-payment demo',()=>{pages.filter(f=>f.endsWith('-pdp.html')).forEach(file=>{const html=fs.readFileSync(path.join(root,file),'utf8');expect(html).toContain('demo-cart');expect(html).toContain('No orders or payments.');});});
});

describe('tool examples',()=>{
 test('all six submitted tool frames are linked without claiming measured benchmarks',()=>{
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const doc=new DOMParser().parseFromString(html,'text/html');
  const section=doc.querySelector('#tools')!;
  expect(section.querySelectorAll('img')).toHaveLength(6);
  ['chatgpt','gemini','midjourney','flux','firefly','personal-agent'].forEach(tool=>{
   expect(section.querySelector(`a[href="img/tool-${tool}.jpg"] img`)).not.toBeNull();
  });
  expect(section.textContent).not.toContain('pending');
  expect(section.textContent).toContain('not benchmark results');
 });
});

describe('image lightbox',()=>{
 test('image links open in the in-page lightbox, never a new tab',()=>{
  pages.forEach(file=>{
   const doc=new DOMParser().parseFromString(fs.readFileSync(path.join(root,file),'utf8'),'text/html');
   doc.querySelectorAll('a[target="_blank"]').forEach(a=>{
    expect(a.getAttribute('href')).not.toMatch(/\.(jpe?g|png|webp|avif)$/i);
   });
  });
  const js=fs.readFileSync(path.join(root,'site.js'),'utf8');
  expect(js).toContain('lb-close');
  expect(js).toContain("Escape");
  expect(js).toContain('lb-open');
  const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
  expect(css).toContain('.lb{');
 });
});
