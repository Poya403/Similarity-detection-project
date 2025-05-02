from flask import Flask, request, jsonify
import json
from sentence_transformers import SentenceTransformer, util
from flask_cors import CORS

app = Flask(__name__)

CORS(app) # اجازه دسترسی از frontend (Live Server) به API
# بارگذاری مدل
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

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
                embeddings = model.encode([answer1['description'], answer2['description']])
                similarity = util.cos_sim(embeddings[0], embeddings[1])

                # ذخیره نتیجه
                results.append({
                    "user1_name": user1_name,
                    "user2_name": user2_name,
                    "question_number": answer1['qnumber'],
                    "answer1": answer1['description'],
                    "answer2": answer2['description'],
                    "similarity_percentage": float(similarity.item()) * 100  # تبدیل به درصد
                })

     # ذخیره نتایج به عنوان JSON
    with open('results.json', 'w') as json_file:
        json.dump(results, json_file)

    return jsonify(results)

@app.route('/results.html' , methods=['GET'])

def get_results():
    try:
        with open('results.json', 'r') as json_file:
            results = json.load(json_file)
        return jsonify(results)
    except FileNotFoundError:
        return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)