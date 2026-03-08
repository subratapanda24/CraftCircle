
function showCraft(id, btn) {
  document.querySelectorAll('.mat-tab').forEach(tab => {
    tab.classList.remove('active');
  });

  btn.classList.add('active');


  document.querySelectorAll('.craft-panel').forEach(panel => {
    panel.classList.remove('active');
    panel.style.opacity = '0';
  });

  const panel = document.getElementById('panel-' + id);

  panel.classList.add('active');
  panel.style.opacity = '0';
  panel.style.transform = 'translateY(12px)';

  setTimeout(() => {
    panel.style.transition = 'opacity .35s, transform .35s';
    panel.style.opacity = '1';
    panel.style.transform = 'translateY(0)';
  }, 30);

}


function loadCraftFromURL() {

  const params = new URLSearchParams(window.location.search);
  const craft = params.get('craft');

  if (craft && ['painting', 'pottery', 'candle', 'crochet'].includes(craft)) {
    const button = document.querySelector(
      `button[onclick="showCraft('${craft}',this)"]`
    );

    if (button) {
      button.click();
      setTimeout(() => {
        document
          .getElementById('panel-' + craft)
          .scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
      }, 100);
    }
  }
}
loadCraftFromURL();
