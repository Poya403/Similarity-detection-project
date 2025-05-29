// نمایش اطلاعات در خصوص شباهت متن ها
const resultsdiv = document.getElementById("resultsdiv");
const percent = document.getElementById("percent_filter_el");
percent.value = "80";
let aid = 0;
const show_results = () => {
  resultsdiv.innerHTML = "";
  fetch("http://127.0.0.1:5000/results")
    .then(res => res.json())
    .then(data => {
      switch (aid) {
        case 1: data.sort((a, b) => a.user1_name.localeCompare(b.user1_name)); break;
        case 2: data.sort((a, b) => a.question_number - b.question_number); break;
        case 3: data.sort((a, b) => b.similarity_percentage - a.similarity_percentage); break;
        default: break;
      }

      filtered = data.filter(r =>
        r.answer1 && r.answer2 && r.similarity_percentage >= 0 && r.similarity_percentage <= 100 &&
        r.similarity_percentage >= parseFloat(percent.value)
      )

      filtered.forEach(r => {
        if (r.similarity_percentage >= 0) {
          resultsdiv.innerHTML += `
          <div class="container">
            <p><i class="material-icons">quiz</i> سوال ${r.question_number}</p>
            <p><i class="material-icons">percent</i>درصد شباهت: ${r.similarity_percentage.toFixed(2)}</p>
            <p><i class="material-icons">info</i>پاسخ ${r.user1_name} : </p><p>${r.answer1}</p>
            <p><i class="material-icons">info</i>پاسخ ${r.user2_name} : </p><p>${r.answer2}</p>
            <p><i class="material-icons">timer</i>بررسی زمانی :</p>
            <p>زمان صرف شده کاربر اول : ${r.time1.toFixed(0)}s</p>
            <p>زمان صرف شده کاربر دوم : ${r.time2.toFixed(0)}s</p>
            <p>اختلاف زمانی : ${r.time_diff.toFixed(0)}s</p>
          </div>`;
        }
      })
    });
}

function setActiveButton(className) {
  document.querySelectorAll(".sort-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  document.querySelector(`.sort-btn.${className}`)?.classList.add("active");
}

show_results();
document.querySelector('.name').addEventListener('click', () => {
   aid = 1; show_results(); setActiveButton("name");
});
document.querySelector('.qnumber').addEventListener('click', () => { 
  aid = 2; show_results(); setActiveButton("qnumber");
});
document.querySelector('.similarity').addEventListener('click', () => {
   aid = 3; show_results(); setActiveButton("similarity");
});
percent.addEventListener('change', show_results);
//رفتن به صفحه قبلی
document.querySelector('.prev').addEventListener('click', function () {
  window.location.href = 'Thanks_page.html';
});

document.getElementById("persent_filter_el")