// نمایش اطلاعات در خصوص شباهت متن ها در قالب جدول
fetch("http://127.0.0.1:5000/results.html")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("resultsTable");
    table.innerHTML = `
      <thead>
        <tr>
          <th>نام کاربر 1</th>
          <th>نام کاربر 2</th>
          <th>شماره سوال</th>
          <th>جواب کاربر اول</th>
          <th>جواب کاربر دوم</th>
          <th>زمان صرف شده کاربر اول</th>
          <th>زمان صرف شده کاربر دوم</th>
          <th>تفاوت زمانی</th>
          <th>درصد شباهت</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    data.forEach(r => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${r.user1_name}</td>
        <td>${r.user2_name}</td>
        <td>${r.question_number}</td>
        <td>${r.answer1}</td>
        <td>${r.answer2}</td>
        <td>${r.time1}</td>
        <td>${r.time2}</td>
        <td>${r.time_diff}</td>
        <td>${r.similarity_percentage.toFixed(2)}%</td>`;
      table.appendChild(row);
    });
  });

//users نمایش اطلاعات
const users = JSON.parse(localStorage.getItem('users'));
if (users) {
  console.log(users); // یا اینجا DOM را بسازید
} else {
  console.log('هیچ کاربری در local storage وجود ندارد.');
}
//رفتن به صفحه قبلی
document.querySelector('.prev').addEventListener('click', function () {
  window.location.href = 'Thanks_page.html';
});