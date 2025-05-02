import requests

data = {
    "users": {
        "Alice": [
            {"qnumber": 1, "description": "The quick brown fox jumps over the lazy dog."},
            {"qnumber": 2, "description": "Photosynthesis converts sunlight into energy."},
            {"qnumber": 3, "description": "Python is a high-level programming language."}
        ],
        "Bob": [
            {"qnumber": 1, "description": "The quick brown fox jumps over the lazy dog."},
            {"qnumber": 2, "description": "Photosynthesis converts sunlight into energy."},
            {"qnumber": 3, "description": "Java is a programming language for apps."}
        ],
    }
}

response = requests.post('http://127.0.0.1:5000/qbox.html', json=data, proxies={"http": None, "https": None})

print(response.json())

