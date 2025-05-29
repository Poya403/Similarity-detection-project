let curr = 0;
const qn = document.getElementById('qnumber'); //شماره سوال
const title = document.getElementById('title'); //عنوان سوال
const next_btn = document.getElementById('next_btn');//المان دکمه بعدی
const answerbox = document.getElementById('abox');//متن پاسخ ما
const pagination = document.getElementById("pagination");//المان نمایش پیشرفت جواب دادن سوالات
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
        if(curr === questions.length - 1) next_btn.textContent = "ثبت پاسخ";
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
    } else {
        curr=0;
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
      btn.classList.toggle("active", i-1 == curr);
      btn.classList.toggle("navigated", i-1 <= curr);
      signFlag[curr] ? sign_btn.textContent = "برداشتن علامت" : sign_btn.textContent = "علامت زدن";

      if(signFlag[i-1]) btn.classList.toggle("highlight", signFlag[i-1]);//اگه پرچم بالا بود سوال را علامت بزن
      else btn.classList.remove("highlight", i-1);

      btn.addEventListener("click", () => {
        save_time_taken();
        curr = i-1;
        if(curr === questions.length - 1) next_btn.textContent = "ثبت پاسخ"; else next_btn.textContent = "بعدی";
        qw();
        renderPagination();
      });

      pagination.appendChild(btn);
    }
  }
  renderPagination();

sign_btn.addEventListener('click',() => {
    if(!signFlag[curr] || answers[curr]){
        signFlag[curr] = true;
        sign_btn.textContent = "برداشتن علامت";
    }else{
        signFlag[curr] = false;
        sign_btn.textContent = "علامت زدن";
    }
    renderPagination();
})
//ارسال پاسخ های کاربر به همراه اطلاعاتش
const users = {};
const submit = async() => {
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

