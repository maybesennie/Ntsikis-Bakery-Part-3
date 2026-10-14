// Enquiry form: validation + instant cost/availability response
document.addEventListener('DOMContentLoaded', async () => {
  const products = await loadProducts();
  const sel = document.getElementById('product');
  products.forEach(p => { const o = document.createElement('option'); o.value = p.id; o.textContent = `${p.name} - R${p.price}`; sel.appendChild(o); });
  const dateEl = document.getElementById('date');
  const today = new Date(); today.setHours(0,0,0,0);
  dateEl.min = today.toISOString().split('T')[0];

  const form = document.getElementById('enquiry-form');
  const result = document.getElementById('enquiry-result');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = form.elements.name.value.trim(), email = form.elements.email.value.trim(), phone = form.elements.phone.value.trim();
    const qty = parseInt(form.elements.qty.value, 10), date = form.elements.date.value;
    let ok = true;
    ok = setError('name', name.length < 2 ? 'Please enter your full name (min 2 characters).' : '') && ok;
    ok = setError('email', !EMAIL_RE.test(email) ? 'Enter a valid email, e.g. name@example.com.' : '') && ok;
    ok = setError('phone', !PHONE_RE.test(phone) ? 'Enter a valid SA number, e.g. 082 123 4567.' : '') && ok;
    ok = setError('product', !sel.value ? 'Please choose a product.' : '') && ok;
    ok = setError('qty', !(qty >= 1 && qty <= 100) ? 'Quantity must be between 1 and 100.' : '') && ok;
    ok = setError('date', !date ? 'Please choose a date.' : '') && ok;
    ok = setError('notes', form.notes.value.length > 500 ? 'Maximum 500 characters.' : '') && ok;
    if (!ok) { result.hidden = true; return; }

    // AJAX submission (asynchronous, no page reload). Uses the form's action URL (a free test API).
    const payload = { name, email, phone, productId: sel.value, qty, date, notes: form.elements.notes.value };
    let sent = false;
    try {
      const res = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      sent = res.ok;
    } catch (err) { sent = false; }

    const p = products.find(x => x.id == sel.value);
    const needed = new Date(date + 'T00:00:00');
    const days = Math.ceil((needed - today) / 86400000);
    let total = p.price * qty;
    if (qty >= 10) total *= 0.9; // 10% bulk discount
    const available = days >= p.lead;
    result.hidden = false;
    result.innerHTML = '';
    const h = document.createElement('h2'); h.textContent = `Thank you, ${name}!`;
    const a = document.createElement('p'); a.textContent = `Estimated cost: R ${total.toFixed(2)} for ${qty} x ${p.name}` + (qty >= 10 ? ' (10% bulk discount applied).' : '.');
    const b = document.createElement('p');
    b.textContent = available ? `Good news - we can have this ready by ${date}.`
      : `Sorry, ${p.name} needs ${p.lead} day(s) notice. Please choose a date at least ${p.lead} day(s) from today.`;
    const c = document.createElement('p'); c.textContent = sent ? `Your enquiry was submitted. We'll confirm by email at ${email}.` : `We could not reach the server, but your estimate is shown above. Please try again or contact us directly.`;
    result.append(h, a, b, c);
    result.scrollIntoView({ behavior: 'smooth' });
    if (available) form.reset();
  });
});
