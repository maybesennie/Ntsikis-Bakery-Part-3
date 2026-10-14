// Contact page: Leaflet map + validated form compiled into an email
const RECIPIENT = 'hello@ntsikisbakehouse.co.za';
document.addEventListener('DOMContentLoaded', () => {
  if (window.L) {
    const pos = [-26.2041, 28.0473];
    const map = L.map('map').setView(pos, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
    L.marker(pos).addTo(map).bindPopup("<b>Ntsiki's Artisan Bakehouse</b><br>123 Baker Street, Johannesburg").openPopup();
  } else {
    document.getElementById('map').textContent = 'Map could not be loaded.';
  }

  const form = document.getElementById('contact-form');
  const result = document.getElementById('contact-result');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.elements.name.value.trim(), email = form.elements.email.value.trim(), phone = form.elements.phone.value.trim();
    const type = form.elements.type.value, msg = form.elements.message.value.trim();
    let ok = true;
    ok = setError('name', name.length < 2 ? 'Please enter your full name.' : '') && ok;
    ok = setError('email', !EMAIL_RE.test(email) ? 'Enter a valid email address.' : '') && ok;
    ok = setError('phone', phone && !PHONE_RE.test(phone) ? 'Enter a valid SA number, e.g. 082 123 4567.' : '') && ok;
    ok = setError('type', !type ? 'Please select a message type.' : '') && ok;
    ok = setError('message', msg.length < 10 ? 'Message must be at least 10 characters.' : '') && ok;
    if (!ok) { result.hidden = true; return; }

    const subject = `[${type}] Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nType: ${type}\n\nMessage:\n${msg}`;
    const href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    result.hidden = false; result.innerHTML = '';
    const h = document.createElement('h2'); h.textContent = 'Your email is ready';
    const p = document.createElement('p'); p.textContent = `Review the details below, then click Send Email to send it to ${RECIPIENT}.`;
    const pre = document.createElement('pre'); pre.textContent = body; pre.style.whiteSpace = 'pre-wrap';
    const a = document.createElement('a'); a.className = 'btn'; a.href = href; a.textContent = 'Send Email';
    result.append(h, p, pre, a);
  });
});
