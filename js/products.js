// Dynamic product list with search, filter and sort
document.addEventListener('DOMContentLoaded', async () => {
  const products = await loadProducts();
  const list = document.getElementById('product-list');
  const q = document.getElementById('search'), cat = document.getElementById('category'), sort = document.getElementById('sort');
  function render() {
    const term = q.value.trim().toLowerCase();
    let out = products.filter(p => (cat.value === 'all' || p.category === cat.value) &&
      (p.name + ' ' + p.desc).toLowerCase().includes(term));
    if (sort.value === 'low') out.sort((a, b) => a.price - b.price);
    else if (sort.value === 'high') out.sort((a, b) => b.price - a.price);
    else out.sort((a, b) => a.name.localeCompare(b.name));
    list.innerHTML = '';
    out.forEach(p => {
      const card = document.createElement('article'); card.className = 'card';
      const img = document.createElement('img'); img.src = p.image; img.alt = p.alt; img.loading = 'lazy';
      const h = document.createElement('h3'); h.textContent = p.name;
      const d = document.createElement('p'); d.textContent = p.desc;
      const pr = document.createElement('p'); pr.className = 'price'; pr.textContent = 'R ' + p.price;
      card.append(img, h, d, pr); list.appendChild(card);
    });
    document.getElementById('count').textContent = out.length ? out.length + ' product(s) found' : 'No products match your search.';
  }
  [q, cat, sort].forEach(el => el.addEventListener('input', render));
  render();
});
