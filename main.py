from flask import Flask, request, jsonify
import json,os
from sentence_transformers import SentenceTransformer, util
from flask_cors import CORS
import requests

app = Flask(__name__)

CORS(app) # اجازه دسترسی از frontend (Live Server) به API
# بارگذاری مدل زبانی
model = SentenceTransformer('distiluse-base-multilingual-cased-v1')

@app.route('/qbox.html', methods=['POST'])
def calculate_similarity():
    data = request.json
    results = []

#  بررسی وجود کلید 'users' در داده‌های ورودی
    if 'users' not in data:
        return jsonify({"error": "Missing 'users' key in request data"}), 400

    users = data['users']
    names = list(users.keys())

    for i in range(len(names)):
        for j in range(i + 1, len(names)):
            user1_name = names[i]
            user2_name = names[j]

            for answer1, answer2 in zip(users[user1_name], users[user2_name]):
            # محاسبه شباهت
                desc1 = str(answer1['description'] or "").strip()
                desc2 = str(answer2['description'] or "").strip()

                #محاسبه اختلاف زمانی
                t1 = answer1.get('time_taken',0)
                t2 = answer2.get('time_taken',0)
                time_diff = abs(t1 - t2)

                if not desc1 or not desc2:
                    results.append({
                        "user1_name": user1_name,
                        "user2_name": user2_name,
                        "question_number": answer1['qnumber'],
                        "answer1": desc1,
                        "answer2": desc2,
                        "time1": t1,
                        "time2": t2,
                        "time_diff": time_diff,
                        "similarity_percentage": 0.0,  # تبدیل به درصد
                    })
                    continue

                embeddings = model.encode([desc1,desc2])
                similarity = util.cos_sim(embeddings[0], embeddings[1])

                # ذخیره نتیجه
                results.append({
                    "user1_name": user1_name,
                    "user2_name": user2_name,
                    "question_number": answer1['qnumber'],
                    "answer1": desc1,
                    "answer2": desc2,
                    "time1": t1,
                    "time2": t2,
                    "time_diff": time_diff,
                    "similarity_percentage": float(similarity.item()) * 100  # تبدیل به درصد
                })

     # ذخیره نتایج به عنوان JSON
    with open('results.json', 'w') as json_file:
        json.dump(results, json_file)

    return jsonify(results)

@app.route('/results' , methods=['GET'])

def get_results():
    try:
        with open('results.json', 'r') as json_file:
            results = json.load(json_file)
        return jsonify(results)
    except FileNotFoundError:
        return jsonify([])

@app.route('/save_user', methods=['POST'])
def save_user_data():
    user_data = request.get_json()

    # اگر فایل test.json وجود ندارد، بسازش
    if not os.path.exists('test.json'):
        with open('test.json', 'w', encoding='utf-8') as f:
            json.dump({}, f)

    # خواندن اطلاعات قبلی
    with open('test.json', 'r', encoding='utf-8') as f:
        all_users = json.load(f)

    # ترکیب اطلاعات قبلی با داده جدید
    all_users.update(user_data)

    # ذخیره به‌روزرسانی‌شده در فایل
    with open('test.json', 'w', encoding='utf-8') as f:
        json.dump(all_users, f, ensure_ascii=False, indent=2)

    response = requests.post('http://127.0.0.1:5000/qbox.html', json = {"users": all_users}, proxies={"http": None , "https": None})
    
    return jsonify({"message": "User data saved successfully."})
  
if __name__ == '__main__':
    app.run(debug=True)