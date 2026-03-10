const events = {
    '2026-03-05': [{ name: 'Watercolor Florals', time: '10:00 AM', seats: 14, cat: 'Painting', color: '#c8a96e' }],
    '2026-03-07': [{ name: 'Crochet Granny Squares', time: '2:00 PM', seats: 4, cat: 'Crochet', color: '#8aab96' }],
    '2026-03-10': [{ name: 'Hand-Built Ceramics', time: '11:00 AM', seats: 12, cat: 'Pottery', color: '#a8dadc' }, { name: 'Botanical Soy Candles', time: '3:00 PM', seats: 10, cat: 'Candle', color: '#e9c46a' }],
    '2026-03-12': [{ name: 'Macramé Wall Hanging', time: '3:00 PM', seats: 0, cat: 'Crochet', color: '#888' }],
    '2026-03-14': [{ name: 'Abstract Acrylic Pour', time: '10:00 AM', seats: 8, cat: 'Painting', color: '#c8a96e' }],
    '2026-03-17': [{ name: 'Wheel Throwing', time: '11:00 AM', seats: 3, cat: 'Pottery', color: '#a8dadc' }, { name: 'Pillar Candle Sculpting', time: '4:00 PM', seats: 7, cat: 'Candle', color: '#e9c46a' }],
    '2026-03-19': [{ name: 'Galaxy Resin Art', time: '2:00 PM', seats: 6, cat: 'Painting', color: '#c8a96e' }],
    '2026-03-21': [{ name: 'Amigurumi Toy Making', time: '10:00 AM', seats: 11, cat: 'Crochet', color: '#8aab96' }],
    '2026-03-24': [{ name: 'Glaze & Fire', time: '11:00 AM', seats: 9, cat: 'Pottery', color: '#a8dadc' }, { name: 'Watercolor Florals', time: '3:00 PM', seats: 12, cat: 'Painting', color: '#c8a96e' }],
    '2026-03-28': [{ name: 'Abstract Acrylic Pour', time: '10:00 AM', seats: 5, cat: 'Painting', color: '#c8a96e' }, { name: 'Botanical Soy Candles', time: '2:00 PM', seats: 2, cat: 'Candle', color: '#e9c46a' }],
};
let yr = 2026, mo = 2;
let selectedDate = null;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function renderCal() {
    document.getElementById('calMonthLabel').textContent = months[mo] + ' ' + yr;
    const grid = document.getElementById('calGrid'); grid.innerHTML = '';
    const first = new Date(yr, mo, 1).getDay(), days = new Date(yr, mo + 1, 0).getDate();
    const today = new Date();
    for (let i = 0; i < first; i++) { const c = document.createElement('div'); c.className = 'cal-cell empty'; grid.appendChild(c) }
    for (let d = 1; d <= days; d++) {
        const ds = `${yr}-${String(mo + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const c = document.createElement('div'); c.className = 'cal-cell'; c.textContent = d;
        c.style.opacity = '0'; c.style.transform = 'scale(.85)';
        setTimeout(() => { c.style.transition = 'opacity .25s, transform .25s'; c.style.opacity = '1'; c.style.transform = 'scale(1)' }, (d + first) * 15);
        if (today.getFullYear() === yr && today.getMonth() === mo && today.getDate() === d) c.classList.add('today');
        if (events[ds]) { c.classList.add('has-event'); c.onclick = () => showEvents(ds, c) }
        grid.appendChild(c);
    }
}

function showEvents(ds, cell) {
    selectedDate = ds;
    document.querySelectorAll('.cal-cell.selected').forEach(c => c.classList.remove('selected'));
    cell.classList.add('selected');
    const evs = events[ds]; const d = new Date(ds + 'T12:00:00');
    document.getElementById('epTitle').textContent = d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('epSubtitle').textContent = evs.length + ' session' + (evs.length > 1 ? 's' : '') + ' available';
    document.getElementById('epEmpty').style.display = 'none';
    const el = document.getElementById('epEvents'); el.style.display = 'block'; el.style.opacity = '0'; el.style.transform = 'translateY(8px)';
    setTimeout(() => { el.style.transition = 'opacity .3s, transform .3s'; el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, 30);
    const list = document.getElementById('epEventList'); list.innerHTML = '';
    evs.forEach(ev => {
        const sc = ev.seats === 0 ? 'seats-full' : ev.seats <= 5 ? 'seats-low' : 'seats-ok';
        const st = ev.seats === 0 ? 'Full' : ev.seats + ' seats';
        const row = document.createElement('div'); row.className = 'ep-event';
        row.innerHTML = `
        <div class="ep-bar" style="background:${ev.color}"></div>

        <div>
          <h4>${ev.name}</h4>
          <p>${ev.time} · ${ev.cat}</p> 
        </div>

        <span class="ep-seats ${sc}">${st}</span>

        <a class="ep-book"
        href="booking.html?workshop=${encodeURIComponent(ev.name)}&date=${ds}&time=${encodeURIComponent(ev.time)}">
        Book
        </a>
      `;

        list.appendChild(row);
    });

    const bookBtn = document.querySelector('.btn-book-full');
    bookBtn.href = `booking.html?date=${ds}`;
}
function changeMonth(d) { mo += d; if (mo < 0) { mo = 11; yr-- } if (mo > 11) { mo = 0; yr++ } renderCal(); document.getElementById('epEmpty').style.display = 'block'; document.getElementById('epEvents').style.display = 'none'; document.getElementById('epTitle').textContent = 'Select a Date'; document.getElementById('epSubtitle').textContent = 'Click a highlighted day' }
renderCal();