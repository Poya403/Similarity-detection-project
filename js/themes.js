const body = document.querySelector('body');
const theme_btn = document.getElementById('theme_btn');
const currentBackgroundColor = window.getComputedStyle(body).backgroundColor;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    theme_btn.textContent = 'حالت روشن';
} else {
    theme_btn.textContent = 'حالت تاریک';
}

//تغییر حالت تصویر از سیاه به روشن و بلعکس
theme_btn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        theme_btn.textContent = 'حالت روشن';
        localStorage.setItem('theme','dark');
    } else {
        theme_btn.textContent = 'حالت تاریک';
        localStorage.setItem('theme','light');
    }
});
