// Shared behaviour: mobile menu, scroll fade-ins, accordion, lightbox
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const list = document.querySelector('.nav-list');
  toggle.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Fade-in on scroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  }), { threshold: .15 });
  document.querySelectorAll('.fade').forEach(el => io.observe(el));

  // Accordion
  document.querySelectorAll('.acc-btn').forEach(btn => btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    const open = panel.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  }));

  // Lightbox gallery
  const gallery = document.getElementById('gallery');
  if (gallery) {
    const imgs = [...gallery.querySelectorAll('img')];
    const box = document.getElementById('lightbox');
    const big = document.getElementById('lb-img');
    const cap = document.getElementById('lb-cap');
    let i = 0;
    const show = n => { i = (n + imgs.length) % imgs.length; big.src = imgs[i].src; big.alt = imgs[i].alt; cap.textContent = imgs[i].alt; box.hidden = false; };
    imgs.forEach((im, n) => im.addEventListener('click', () => show(n)));
    box.querySelector('.lb-close').onclick = () => box.hidden = true;
    box.querySelector('.lb-prev').onclick = () => show(i - 1);
    box.querySelector('.lb-next').onclick = () => show(i + 1);
    box.addEventListener('click', e => { if (e.target === box) box.hidden = true; });
    document.addEventListener('keydown', e => {
      if (box.hidden) return;
      if (e.key === 'Escape') box.hidden = true;
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });
  }
});

// Shared helpers (used by form scripts)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+27|0)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}$/; // South African numbers
function setError(id, msg) {
  const el = document.getElementById(id);
  document.getElementById(id + '-err').textContent = msg;
  el.closest('.field').classList.toggle('invalid', !!msg);
  return !msg;
}
// Product data is loaded via AJAX (fetch); fallback keeps the site working when opened as a local file
async function loadProducts() {
  try {
    const r = await fetch('data/products.json');
    if (!r.ok) throw new Error(r.status);
    return await r.json();
  } catch (e) {
    return [{id:1,name:"Classic Sourdough",category:"bread",price:55,image:"images/sourdough-loaf.jpg",alt:"Sourdough loaf",desc:"Slow-fermented white sourdough.",lead:0},
    {id:4,name:"Butter Croissant",category:"pastries",price:25,image:"images/butter-croissant.jpg",alt:"Croissant",desc:"Laminated by hand.",lead:0},
    {id:7,name:"Chocolate Celebration Cake",category:"cakes",price:350,image:"images/chocolate-celebration-cake.jpg",alt:"Chocolate cake",desc:"Serves 10-12.",lead:2}];
  }
}
