const menuToggle = document.getElementById('menu__toggle');
const body = document.body;
const roadmapBox = document.querySelector('.roadmap-box');
const allBox = document.querySelector('.all-box');

function updateLayout() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    if (menuToggle.checked) {
      body.style.overflow = 'hidden';
      roadmapBox.style.display = 'inline-block';
      allBox.style.display = 'inline-block';
    } else {
      body.style.overflow = 'auto';
      roadmapBox.style.display = 'none';
      allBox.style.display = 'none';
    }
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    body.style.overflow = 'auto';
    roadmapBox.style.display = 'flex';
    allBox.style.display = 'flex';
  }
}

menuToggle.addEventListener('change', updateLayout);
window.addEventListener('resize', updateLayout);

// Initial layout update
updateLayout();
