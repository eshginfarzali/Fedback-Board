const menuToggle = document.getElementById('menu__toggle');
const body = document.body;
const roadmapBox = document.querySelector('.roadmap-box');
const allBox = document.querySelector('.all-box');

menuToggle.addEventListener('change', function() {
    if (this.checked) {
        body.style.overflow = 'hidden';
        if (window.matchMedia("(max-width: 768px)").matches) {
        roadmapBox.style.display = 'inline-block';
        allBox.style.display = 'inline-block';
        }
    } else {
        body.style.overflow = 'auto';
        if (window.matchMedia("(max-width: 768px)").matches) {
        roadmapBox.style.display = 'none';
        allBox.style.display = 'none';
        location.reload();
        }
    }
});