async function sendAllUserDataToFlask() {
    try {
        // مرحله 1: گرفتن داده‌های test.json (داده کاربران دیگر)
        const testDataResponse = await fetch('test.json');
        const testData = await testDataResponse.json();

        // مرحله 2: گرفتن داده کاربر فعلی از localStorage
        const localUserData = JSON.parse(localStorage.getItem('users')) || {};

        // مرحله 3: ترکیب دو مجموعه (کاربران سایت + فایل جیسون)
        const combined = {
            ...testData,
            ...localUserData
        };

        // مرحله 4: ارسال به Flask
        const response = await fetch('http://127.0.0.1:8000/qbox.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ users: combined })
        });

        const result = await response.json();
        console.log('پاسخ سرور:', result);
    } catch (err) {
        console.error('خطا در ارسال اطلاعات به Flask:', err);
    }
}

window.addEventListener('load', sendAllUserDataToFlask);