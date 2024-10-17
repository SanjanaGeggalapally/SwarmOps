from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

services = [
    {
        'id': 'webapp1234',  # Updated ID without hyphen
        'name': 'Web App',
        'image': 'myapp:latest',
        'replicas': 3,
        'desiredState': 'Running',
        'runningState': 'Running',
        'updateStatus': 'Up to date',
        'ports': ['80:80'],
        'networks': ['frontend', 'backend'],
        'creationTime': '2024-10-01T12:00:00Z',
        'labels': {'environment': 'production'}
    },
    {
        'id': 'db5678',  # Updated ID without hyphen
        'name': 'Database',
        'image': 'mysql:5.7',
        'replicas': 1,
        'desiredState': 'Running',
        'runningState': 'Running',
        'updateStatus': 'Up to date',
        'ports': ['3306:3306'],
        'networks': ['backend'],
        'creationTime': '2024-10-01T12:00:00Z',
        'labels': {'environment': 'production'}
    },
    {
        'id': 'cache9101',  # Updated ID without hyphen
        'name': 'Cache Service',
        'image': 'redis:latest',
        'replicas': 2,
        'desiredState': 'Running',
        'runningState': 'Running',
        'updateStatus': 'Up to date',
        'ports': ['6379:6379'],
        'networks': ['backend'],
        'creationTime': '2024-10-01T12:00:00Z',
        'labels': {'environment': 'staging'}
    },
    {
        'id': 'broker1121',  # Updated ID without hyphen
        'name': 'Message Broker',
        'image': 'rabbitmq:3-management',
        'replicas': 1,
        'desiredState': 'Running',
        'runningState': 'Running',
        'updateStatus': 'Up to date',
        'ports': ['5672:5672', '15672:15672'],
        'networks': ['backend'],
        'creationTime': '2024-10-01T12:00:00Z',
        'labels': {'environment': 'production'}
    },
    {
        'id': 'storage3141',  # Updated ID without hyphen
        'name': 'File Storage',
        'image': 'minio/minio',
        'replicas': 2,
        'desiredState': 'Running',
        'runningState': 'Running',
        'updateStatus': 'Up to date',
        'ports': ['9000:9000'],
        'networks': ['storage'],
        'creationTime': '2024-10-01T12:00:00Z',
        'labels': {'environment': 'production'}
    },
    {
        'id': 'gateway5161',  # Updated ID without hyphen
        'name': 'API Gateway',
        'image': 'kong:latest',
        'replicas': 1,
        'desiredState': 'Running',
        'runningState': 'Running',
        'updateStatus': 'Up to date',
        'ports': ['8000:8000'],
        'networks': ['frontend', 'backend'],
        'creationTime': '2024-10-01T12:00:00Z',
        'labels': {'environment': 'production'}
    }
]

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "hello"})

@app.route('/services/<service_id>', methods=['GET'])
def get_service(service_id):
    service = next((s for s in services if s['id'] == service_id), None)
    if service:
        print("GET")
        return jsonify(service)
    else:
        return jsonify({'error': 'Service not found'}), 404

@app.route('/services', methods=['GET'])
def all_services():
    return jsonify(services)

@app.route('/services/<service_id>', methods=['DELETE'])
def delete_service(service_id):
    service = next((s for s in services if s['id'] == service_id), None)
    services.remove(service)
    print(service)
    return services