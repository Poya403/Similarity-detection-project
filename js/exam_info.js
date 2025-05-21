//اطلاعات مربوط به تعداد سوالات و مدت زمان آزمون
const exam_description = document.getElementById('exam_description');
const numberofquestions = document.getElementById('numberofquestions');
const exam_time = document.getElementById('exam_time');
const numberofpoints_questions = document.getElementById('numberofpoints_questions');

//بخش صورت سوال
//اطلاعات مربوط به صورت سوال و پاسخ درست آنها
const questions = [
    {
        qnumber: 1,
        title: "پدیده فوتوسنتز را با ذکر مثال توضیح دهید. این پدیده چه تاثیری بر زندگی موجودات زنده دارد؟",
        correct_answer: null,
    },
    {
        qnumber: 2,
        title: "استفاده کردن از منابع انرژی تجدید پذیر چه مزایا و معایبی دارد؟",
        correct_answer: null,
    },
    {
        qnumber: 3,
        title: "از نظر شما برای طراحی یک وبسایت خوب چه زبانها و فریم ورک هایی برای برنامه نویسی ضروری است؟ ",
        correct_answer: null,
    },
];

//تنظیم کردن اطلاعات توضیحات و تعداد سوالات و زمان امتحان و تعداد سوالات امتیازی بر اساس بخش صورت سوالات
if(exam_description != null) exam_description.textContent = 'سلام خدمت کابران عزیز، لطفا با دقت و حوصله به سوالات تشریحی پاسخ دهید. شما میتوانید به هر زبانی (فارسی و انگلیسی) به سوالات پاسخ بدید.';
numberofquestions.textContent = questions.length;
exam_time.textContent = questions.length * 5;
numberofpoints_questions.textContent = 0;
if(numberofpoints_questions.textContent == 0) { numberofpoints_questions.textContent = 'ندارد'}