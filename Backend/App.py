from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "hello"})

@app.route('/services', methods=['GET'])
def services():
    return jsonify([
        {
            "id": 1,
            "name": "service1"
        },
        {
            "id": 2,
            "name": "service2"
        },
        {
            "id": 3,
            "name": "service3"
        },
        {
            "id": 4,
            "name": "service4"
        },
        {
            "id": 5,
            "name": "service5"
        }
    ])

if __name__ == '__main__':
    app.run(debug=True)