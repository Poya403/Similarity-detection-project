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
    const time = (end_time - start_time) / 1000
    localStorage.setItem('timetaken', time);
});
// ------------
const questions = [
    {
        qnumber: 1,
        title: "با توجه به اهمیت پدیده‌های نجومی در تمدن‌های باستانی، توضیح دهید که چرا خورشیدگرفتگی کامل (کسوف کامل) در گذشته به عنوان رویدادی ترسناک یا ماوراءالطبیعه تفسیر می‌شد و مکانیسم علمی این پدیده چگونه است؟",
        correct_answer: null,
    },
    {
        qnumber: 2,
        title: " با توجه به نقش انقلاب صنعتی در تحولات جهانی، تحلیل کنید که چرا اختراع ماشین بخار توسط جیمز وات در قرن هجدهم میلادی به عنوان نقطه عطفی در تاریخ بشر شناخته می‌شود و این اختراع چگونه ساختارهای اقتصادی و اجتماعی را دگرگون کرد؟",
        correct_answer: null,
    },
    {
        qnumber: 3,
        title: "با استناد به اصول ژنتیک مندلی، توضیح دهید که چرا در انسان‌ها نسبت جنسیت نوزادان در بدو تولد تقریباً برابر است (۵۰% پسر و ۵۰% دختر) و چه عوامل زیست‌شناسی یا محیطی ممکن است این نسبت را تحت تأثیر قرار دهند؟",
        correct_answer: null,
    },
    {
        qnumber: 4,
        title: "با توجه به پیچیدگی‌های سیستم ایمنی بدن، تشریح کنید که چرا واکسن‌ها می‌توانند ایمنی طولانی‌مدت در برابر بیماری‌ها ایجاد کنند و تفاوت پاسخ ایمنی اولیه و ثانویه در این فرآیند چیست؟",
        correct_answer: null,
    },
    {
        qnumber: 5,
        title: "با توجه به ساختار لایه های جو زمین و ویژگی های منحصر به فرد هر لایه، توضیح دهید که چرا لایه تروپوسفر به عنوان مهمترین لایه برای حیات موجودات زنده محسوب می شود و چگونه تغییرات در ترکیب گازی این لایه می تواند بر سیستم های اقلیمی کره زمین تأثیر بگذارد؟",
        correct_answer: null,
    },
];

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