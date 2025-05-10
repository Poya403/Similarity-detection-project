let curr = 0;
const qn = document.getElementById('qnumber'); //شماره سوال
const title = document.getElementById('title'); //عنوان سوال
const next_btn = document.getElementById('next_btn');
const answerbox = document.getElementById('abox');//متن پاسخ ما

//متغیرهای زمانی 
let start_time = 0, end_time = 0;

//ذخیره زمان صرف شده
window.addEventListener('load', () => {
    start_time = new Date();
})

window.addEventListener('beforeunload', () => {
    end_time = new Date();
    const total_time = (end_time - start_time) / 1000
    localStorage.setItem('timetaken', total_time);
});
//-----

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
    if (curr < questions.length - 1) {
        curr++;
        next_btn.textContent = "بعدی";
    } else {
        next_btn.textContent = "ثبت پاسخ";
        submit();
        window.location.href = "Thanks_page.html";
    }
    qw();
});

//رفتن به سوال قبلی
prev_btn.addEventListener('click', () => {
    answers[curr] = answerbox.value;
    if (curr > 0) {
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
            time_taken: 30,
        }
        users[UserInfo.name].push(answer);
    }
    console.log(users[UserInfo.name]);
    localStorage.setItem('users', JSON.stringify(users));
}