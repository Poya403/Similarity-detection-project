let curr = 0;
const qn = document.getElementById('qnumber'); //شماره سوال
const title = document.getElementById('title'); //عنوان سوال
const next_btn = document.getElementById('next_btn');//المان دکمه بعدی
const answerbox = document.getElementById('abox');//متن پاسخ ما

//متغیرهای زمانی 
let start_time = 0, end_time = 0;
const total_times = new Array(questions.length).fill(0);

//شروع ثبت زمان موقعی که صفحه لود شد
window.addEventListener('load', () => {
    start_time = new Date();
})

//ذخیره زمان صرف شده برای سوالی که جواب دادیم و میخواهیم برویم سوال بعدی
const save_time_taken = () => {
    end_time = new Date();
    total_times[curr] = ((end_time - start_time) / 1000) + total_times[curr];
    start_time = new Date();
}

//آرایه ای برای ذخیره پاسخ ها
const answers = new Array(questions.length).fill('');
// تابع نوشتن سوال
const qw = () => {
    qn.textContent = "سوال : " + (curr + 1).toString() + " از " + questions.length;
    title.textContent = "سوال : " + questions[curr].title;
    answerbox.value = answers[curr] || '';
};
qw();

// رفتن به سوال بعدی
next_btn.addEventListener('click', () => {
    answers[curr] = answerbox.value;
    save_time_taken();
    if (curr < questions.length - 1) {
        curr++;
        next_btn.textContent = "بعدی";
    } else {
        next_btn.textContent = "ثبت پاسخ";
        submit();
        sendAllUserDataToFlask();
        window.location.href = "Thanks_page.html";
    }
    qw();
});

//رفتن به سوال قبلی
prev_btn.addEventListener('click', () => {
    answers[curr] = answerbox.value;
    save_time_taken();
    if (curr > 0) {
        end_time = new Date();
        total_times[curr] = ((end_time - start_time) / 1000) + total_times[curr];
        start_time = new Date();
        curr--;
    } else {
        window.location.href = "login.html";
    }
    qw();
});

//ارسال پاسخ های کاربر به همراه اطلاعاتش
const users = {};
const submit = () => {
    const UserInfo = JSON.parse(localStorage.getItem('userInfo'));
    //اگر کاربر وجود ندارد یک آرایه برای او ایجاد میکنیم
    if (!users[UserInfo.name]) {
        users[UserInfo.name] = [];
    }
    for (let i = 0; i < questions.length; i++) {
        const answer = {
            qnumber: i + 1,
            description: answers[i],
            time_taken: total_times[i],
        }
        users[UserInfo.name].push(answer);
    }
    console.log(users[UserInfo.name]);
    localStorage.setItem('users', JSON.stringify(users));
}