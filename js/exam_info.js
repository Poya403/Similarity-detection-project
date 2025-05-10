//اطلاعات مربوط به تعداد سوالات و مدت زمان آزمون
const exam_description = document.getElementById('exam_description');
const numberofquestions = document.getElementById('numberofquestions');
const exam_time = document.getElementById('exam_time');
const numberofpoints_questions = document.getElementById('numberofpoints_questions');

//تنظیم کردن اطلاعات توضیحات و تعداد سوالات و زمان امتحان و تعداد سوالات امتیازی
if(exam_description != null) exam_description.textContent = 'سلام دوستان با دقت و حوصله به سوالات لطفا پاسخ بدید';
numberofquestions.textContent = 5;
exam_time.textContent = 15;
numberofpoints_questions.textContent = 0;

if(numberofpoints_questions.textContent == 0) { numberofpoints_questions.textContent = 'ندارد'}

//اطلاعات مربوط به صورت سوال و پاسخ درست آنها
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

