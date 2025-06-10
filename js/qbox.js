let curr = 0;
const qn = document.getElementById('qnumber'); //شماره سوال
const title = document.getElementById('title'); //عنوان سوال
const next_btn = document.getElementById('next_btn');//المان دکمه بعدی
const answerbox = document.getElementById('abox');//متن پاسخ ما
const pagination = document.getElementById("pagination");//المان نمایش پیشرفت جواب دادن سوالات
const timerEl = document.getElementById("timerEl");//المان نمایش تایمر
//متغیرهای زمانی 
let start_time = 0, end_time = 0, exam_start = 0;
const total_times = new Array(questions.length).fill(0);
let timer;
//شروع ثبت زمان موقعی که صفحه لود شد
window.addEventListener('load', () => {
    start_time = new Date();// تعریف متغیر زمانی برای ثبت زمان صرف شده برای هر سوال

    //تعریف متغیر زمانی برای بسته خودکار صفحه سوال در صورت اتمام زمان امتحان
    if (!localStorage.getItem("examStart")) {
        localStorage.setItem("examStart", Date.now());
    }
    // بازیابی زمان شروع از localStorage
    exam_start = new Date(parseInt(localStorage.getItem("examStart")));
    timer = setInterval(isTimeUp, 1000);
})

//بسته شدن و ذخیره شدن پاسخ سوالات به صورت خودکار بعد از اتمام زمان امتحان
const isTimeUp = () => {
    const now = new Date();
    const examTimeMSec = parseFloat(exam_time.textContent) * 60000;
    const remaining = (examTimeMSec - (now - exam_start)).toFixed(0);
    timerDisplay(remaining);
    if (remaining <= 0) {
        submit();
        localStorage.removeItem("examStart");
        clearInterval(timer);
        window.location.href = "Thanks_page.html";
    }
}

const timerDisplay = (remaining) => {
    const min = Math.floor(remaining / 60000).toString().padStart(2, "0");;
    const sec = Math.floor((remaining % 60000) / 1000).toString().padStart(2, "0");;

    timerEl.textContent = `${min ?? "00"} : ${sec ?? "00"}`;
}
//تابع تنظیم گر نمایشگر پیشرفت آزمون
const updateProgressBar = () => {
  const percent = Math.round((curr + 1) / questions.length * 100);
  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressPercent").textContent = percent + "%";
}

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
    title.textContent = questions[curr].title;
    answerbox.value = answers[curr] || '';
};
qw();

// رفتن به سوال بعدی
next_btn.addEventListener('click', () => {
    answers[curr] = answerbox.value;
    save_time_taken();
    if (curr < questions.length - 1) {
        curr++;
        updateProgressBar();
        next_btn.textContent = "بعدی";
        if (curr === questions.length - 1) next_btn.textContent = "ثبت پاسخ";
    } else {
        submit();
        window.location.href = "Thanks_page.html";
    }
    qw();
    renderPagination();
});

//رفتن به سوال قبلی
prev_btn.addEventListener('click', () => {
    answers[curr] = answerbox.value;
    save_time_taken();
    if (curr > 0) {
        next_btn.textContent = "بعدی";
        curr--;
        updateProgressBar();
    } else {
        curr = 0;
    }
    qw();
    renderPagination();
});

let signFlag = new Array(questions.length).fill(false);
const sign_btn = document.getElementById("sign_btn");

const renderPagination = () => {
    pagination.innerHTML = "";

    for (let i = 1; i <= questions.length; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.toggle("active", i - 1 == curr);
        btn.classList.toggle("navigated", i - 1 <= curr);
        signFlag[curr] ? sign_btn.textContent = "برداشتن علامت" : sign_btn.textContent = "علامت زدن";

        if (signFlag[i - 1]) btn.classList.toggle("highlight", signFlag[i - 1]);//اگه پرچم بالا بود سوال را علامت بزن
        else btn.classList.remove("highlight", i - 1);

        btn.addEventListener("click", () => {
            answers[curr] = answerbox.value;
            save_time_taken();
            curr = i - 1;
            updateProgressBar();
            if (curr === questions.length - 1) next_btn.textContent = "ثبت پاسخ"; else next_btn.textContent = "بعدی";
            qw();
            renderPagination();
        });

        pagination.appendChild(btn);
    }
}
renderPagination();

sign_btn.addEventListener('click', () => {
    if (!signFlag[curr] || answers[curr]) {
        signFlag[curr] = true;
        sign_btn.textContent = "برداشتن علامت";
    } else {
        signFlag[curr] = false;
        sign_btn.textContent = "علامت زدن";
    }
    renderPagination();
})
//ارسال پاسخ های کاربر به همراه اطلاعاتش
const users = {};
const submit = async () => {
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
    localStorage.setItem('users', JSON.stringify(users));

    // ارسال به سرور Flask
    const response = await fetch("http://127.0.0.1:5000/save_user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(users)
    });

    const result = await response.json();
    console.log("✅ وضعیت ذخیره:", result.message);
}

