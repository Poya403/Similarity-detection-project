const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

//ذخیره اطلاعات کاربر
document.getElementById('submit_btn').addEventListener('click', function (event) {
    event.preventDefault(); // جلوگیری از ارسال فرم
    // ساختن یک شیء JSON
    const userInfo = {
        name: nameInput.value,
        email: emailInput.value
    };
    
    if(userInfo.name && userInfo.email){
        // ذخیره‌سازی در local storage
       localStorage.setItem('userInfo', JSON.stringify(userInfo));
        //تنظیم حالت پرچم به درحال امتحان دادن
        sessionStorage.setItem('isTakingExam', 'true');
        //رفتن به صفحه سوالات
        window.location.href = 'qbox.html';
    }else{
        alert("لطفا اطلاعات خود را به صورت کامل وارد کنید*");
    }
});

//لود کردن اطلاعات کاربر در حین امتحان گرفتن
window.onload = function () {
    const loadUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (loadUserInfo && sessionStorage.getItem('isTakingExam') === 'true') {
        nameInput.value = loadUserInfo.name || ''; // نمایش نام کاربر
        emailInput.value = loadUserInfo.email || ''; // نمایش ایمیل کاربر
    } else {
        nameInput.value = '';
        emailInput.value = '';
    }
}