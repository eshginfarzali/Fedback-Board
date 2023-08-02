const menuToggle = document.getElementById('menu__toggle');
const body = document.body;
const roadmapBox = document.querySelector('.roadmap-box');
const allBox = document.querySelector('.all-box');

menuToggle.addEventListener('change', function() {
    if (this.checked) {
        body.style.overflow = 'hidden';
        roadmapBox.style.display = 'inline-block';
        allBox.style.display = 'inline-block';
    } else {
        body.style.overflow = 'auto';
        roadmapBox.style.display = 'none';
        allBox.style.display = 'none';
    }
});