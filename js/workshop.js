const catLabels = {
  all: 'All Workshops',
  painting: 'Painting',
  pottery: 'Pottery',
  candle: 'Candle Making',
  crochet: 'Crochet'
};

function filterW(cat, btn) {

  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active');
  });

  btn.classList.add('active');

  const items = document.querySelectorAll('.ws-card');
  let count = 0;

  items.forEach((item, i) => {

    const show = cat === 'all' || item.dataset.category === cat;

    if (show) {
      item.style.display = '';
      item.style.opacity = '0';
      item.style.transform = 'translateY(16px)';
      setTimeout(() => {
        item.style.transition = 'opacity .35s ease, transform .35s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, i * 50);
      count++;
    } else {
      item.style.display = 'none';
    }
  });

  document.getElementById('catTitle').textContent = catLabels[cat];
  document.getElementById('catCount').textContent =
    `Showing ${count} workshop${count !== 1 ? 's' : ''}`;
  document.getElementById('noResults').style.display =
    count === 0 ? 'block' : 'none';
};
