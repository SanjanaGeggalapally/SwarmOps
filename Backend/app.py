from flask import Flask, request, jsonify
from flask_cors import CORS
import docker.errors as de
import bcrypt
import re
from utils.node import node_prcs
from utils.utils import error_handler, get_client
from utils.task import task_prcs
from pymongo import MongoClient
import jwt
import datetime
SECRET_KEY = 'your_secret_key'

app = Flask(__name__)
CORS(app)

# MongoDB connection function
def mongo_client():
    try:
        client = MongoClient("db:27017")  # Connect to the MongoDB service
        print("MongoDB connection established successfully.")
        return client
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return None

@app.route('/')
def home():
    return jsonify({"hello": "world"})

@app.route('/ping')
def ping():
    client = get_client()
    return jsonify({"ping": client.ping()})

# Swarm services - Update
@app.route('/services/update/<service_id>', methods=['POST'])
def update_service(service_id):
    try:
        service_data = request.get_json()
        Name = service_data['name']
        Replicas = service_data['replicas']
        Replicas_int = int(Replicas)

        client = get_client()
        svc = client.services.get(service_id)
        svc.update(name=Name, mode={'Replicated': {'Replicas': Replicas_int}})

        return jsonify({"message": "Service updated successfully"}), 200
    except Exception as e:
        return error_handler(e)

import time

@app.route('/services')
def swarm_services_list():  # Renamed function
    try:
        client = get_client()
        slist = client.services.list()
        services_data = [svc_prcs(service.attrs) for service in slist]
        return jsonify(services_data)
    except de.APIError as e:
        return error_handler(e)

# Swarm Services - Inspect
@app.route("/services/inspect/<id>")
def swarm_service_inspect(id):
    try:
        client = get_client()
        service = client.services.get(id)

        return jsonify({
            "serviceData": svc_prcs(service.attrs),
            "tasksData": [task_prcs(task) for task in service.tasks()]
        })
    
    except de.NotFound as nf:
        return error_handler(nf)
    except de.APIError as ae:
        return error_handler(ae)
    except de.InvalidVersion as iv:
        return error_handler(iv)

# Swarm Services - Delete
@app.route("/services/delete/<id>")
def swarm_service_delete(id):
    try:
        client = get_client()
        svc = client.services.get(id)
        svc.remove()
        return jsonify({"message": "Service deleted successfully"}), 200
    except de.APIError as e:
        return error_handler(e)

# Swarm Nodes API
@app.route("/nodes")
def swarm_nodes_list(count=False):
    try:
        client = get_client()
        nlist = client.nodes.list()
        if count:
            return len(nlist)
       
        nodes_data = [node.attrs for node in nlist]
        return jsonify(nodes_data)
    except de.APIError as e:
        return error_handler(e)

@app.route("/nodes/new")
def swarm_nodes_new_list(count=False):  # Renamed function
    try:
        client = get_client()
        nlist = client.nodes.list()
        if count:
            return len(nlist)
       
        nodes_data = [node_prcs(node.attrs) for node in nlist]
        return jsonify(nodes_data)
    except de.APIError as e:
        return error_handler(e)

def svc_prcs(svc):
    res = {}
    res['name'] = svc.get("Spec").get("Name")
    res['id'] = svc.get("ID")
    img = svc.get("Spec").get("TaskTemplate").get("ContainerSpec").get("Image")
    pattern = r"^(?P<img_name>.*?)@"
    match = re.search(pattern, img)
    res['image'] = match.group('img_name')
   
    ports_list = svc.get("Endpoint").get("Ports")
    if ports_list is not None:
        res['pub_port'] = svc.get("Endpoint").get("Ports")[0].get("PublishedPort")
        res['tar_port'] = svc.get("Endpoint").get("Ports")[0].get("TargetPort")
    else:
        res['pub_port'] = "Undefined"
        res['tar_port'] = "Undefined"

    res['replicas'] = svc.get("Spec").get("Mode").get("Replicated", {"Replicas": swarm_nodes_list(count=True)}).get("Replicas")
    res['version'] = svc.get("Version").get("Index")
    createdAt = svc.get("CreatedAt")
    ca_time = createdAt.split('T')[0]
    res['created_at'] = ca_time
    res['last_updated_at'] = svc.get("UpdatedAt")

    return res




def clear_users():
    try:
        client = mongo_client()
        db = client['usersDB']
        users_collection = db['users']
        result = users_collection.delete_many({})  # Delete all documents in the collection
        return jsonify({'message': f'Cleared {result.deleted_count} users from the collection.'}), 200
    except Exception as e:
        return jsonify({"message": "Error clearing users"}), 500
    


@app.route('/users', methods=['GET'])
def get_users():
    client = mongo_client()
    db = client['usersDB']
    users_collection = db['users']
    
    users = list(users_collection.find({}, {'_id': 0, 'password': 0}))  # Exclude password field
    return jsonify(users), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    mongo = mongo_client()
    
    username = data.get('username')
    password = data.get('password')

    client = mongo_client()
    db = client['usersDB']
    users_collection = db['users']

    user = users_collection.find_one({'username': username})

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        # Create a JWT token
        token = jwt.encode({
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
        }, SECRET_KEY, algorithm='HS256')

        return jsonify({'message': 'Login successful', 'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/addUser', methods=['POST'])
def addUser():
    data = request.json
    username = data.get('username')
    password ='Realpage@123'
    email = data.get('email')
    role=data.get('role')
    client = mongo_client()
    db = client['usersDB']  # Use your actual database name
    users_collection = db['users']      # Collection for user data

    if users_collection.find_one({'username': username}):
        return jsonify({'message': 'User already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Store user information
    user_data = {
        'username': username,
        'password': hashed_password,
        'email': email,
        'role':role
    }
    users_collection.insert_one(user_data)
    print("Users in DB:", list(users_collection.find()))

    return jsonify({'message': 'User Added Successfully'}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True,use_reloder=True)