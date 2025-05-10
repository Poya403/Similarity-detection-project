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
        "Charlie": [
            {"qnumber": 1,"description": "The quik brown fox jumpz over the lazy dog."},
            {"qnumber": 2,"description": "Photosynthesis turns sunlight into energy."},
            {"qnumber": 3,"description": "Python is a high-level coding language."}
        ],
        "Dana": [
            {"qnumber": 1,"description": "A fast brown fox leaps over a idle dog."},
            {"qnumber": 2,"description": "Sunlight is turned into energy by photosynthesis."},
            {"qnumber": 3,"description": "Python is a high-level programming tool."}
        ],
        "Eve": [
            {"qnumber": 1,"description": "The quick brown fox jumps over the lazy dog."},
            {"qnumber": 2,"description": "Photosynthesis converts sunlight into energy."},
            {"qnumber": 3,"description": "Python is a high-level programming language."}
        ],
        "Frank": [
            {"qnumber": 1,"description": "Cats chase mice in the garden."},
            {"qnumber": 2,"description": "The Earth orbits the Sun in 365 days."},
            {"qnumber": 3,"description": "C++ is used for system programming."}
        ]
    }
}

response = requests.post('http://127.0.0.1:5000/qbox.html', json=data, proxies={"http": None, "https": None})

print(response.json())

