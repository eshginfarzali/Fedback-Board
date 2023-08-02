const menuToggle = document.getElementById('menu__toggle');
const body = document.body;
const menu = document.querySelector(".menu")

menuToggle.addEventListener('change', function() {
    if (this.checked) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});
