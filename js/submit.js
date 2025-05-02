const reset_btn = document.getElementById('reset_btn');
const res_btn = document.getElementById('result_btn');

reset_btn.addEventListener('click', function () {
    sessionStorage.setItem('isTakingExam', 'false');
    sessionStorage.removeItem('userInfo');
    window.location.href = 'login.html';
});

res_btn.addEventListener('click', function () {
    window.location.href = 'results.html';
});