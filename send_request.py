import requests,json

# خواندن فایل JSON
with open('templates/test.json', 'r', encoding='utf-8') as f: data = json.load(f)

# ارسال به سرور Flask
response = requests.post('http://127.0.0.1:5000/qbox.html', json = {"users": data}, proxies={"http": None , "https": None})

# نمایش پاسخ
print(response.json())


