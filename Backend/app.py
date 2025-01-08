from flask import Flask, request, jsonify
from flask_cors import CORS
import docker.errors as de
import bcrypt
import re
from utils.node import node_prcs
from utils.utils import error_handler, docker_client, mongo_client
from utils.task import task_prcs
# from pymongo import MongoClient
import jwt
import datetime
from functools import wraps
from datetime import timezone



SECRET_KEY = 'your_secret_key'

# JWT verification decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            token = token.split(" ")[1]  # Get the token part
            current_user = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            print("current user ", current_user)
            print("current user type ", type(current_user))
        except Exception as e:
            return jsonify({'message': 'Token is invalid!'}), 403
        return f(current_user, *args, **kwargs)
    return decorated

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():

    client = mongo_client()
    db = client['usersDB']  # Use your actual database name
    users_collection = db['users']      # Collection for user data
    # user = users_collection.find_one({'username': current_user}, {'_id': 0, 'password': 0})  # Exclude password field
    # sa = users_collection.find({'role' : 'superadmin'}).limit(1).count()
    sa = users_collection.count_documents({'role' : 'superadmin'})
    # print("sa  list ", sa.to_list())
    # print("-----------------------------")
    print("sa count", sa)
    print("-----------------------------")

    # if users_collection.count_documents({}) == 0:
    if sa == 0:
        print("-----------------------------")
        print("super admin does not exist")
        print("-----------------------------")
        created_username = 'default_superadmin'
        created_password ='Realpage@123'
        created_email = 'default_superadmin@realpage.com'
        created_role= 'superadmin'

        # Hash the password
        hashed_password = bcrypt.hashpw(created_password.encode('utf-8'), bcrypt.gensalt())

        # Store user information
        user_data = {
            'username': created_username,
            'password': hashed_password,
            'email': created_email,
            'role': created_role
        }
        
        users_collection.insert_one(user_data)
    
    print("Users in DB:", list(users_collection.find()))
    return jsonify({"hello": "world"})

@app.route('/ping')
def ping():
    client = docker_client()
    return jsonify({"ping": client.ping()})

# Swarm services - Update
@app.route('/services/update/<service_id>', methods=['POST'])
@token_required
def update_service(current_user, service_id):
    
    if not current_user: 
        return jsonify({"message": "Unauthorized Access"}), 401
    
    try:
        service_data = request.get_json()
        Name = service_data['name']
        Replicas = service_data['replicas']
        Replicas_int = int(Replicas)
        client = docker_client()
        svc = client.services.get(service_id)
        svc.update(name=Name, mode={'Replicated': {'Replicas': Replicas_int}})
        return jsonify({"message": "Service updated successfully"}), 200
    except Exception as e:
        return error_handler(e)

@app.route('/services')
def swarm_services_list():  # Renamed function
    try:
        client = docker_client()
        slist = client.services.list()
        services_data = [svc_prcs(service.attrs) for service in slist]
        return jsonify(services_data)
    except de.APIError as e:
        return error_handler(e)

# Swarm Services - Inspect
@app.route("/services/inspect/<id>")
def swarm_service_inspect(id):
    try:
        client = docker_client()
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
@token_required
def swarm_service_delete(current_user, id):
    
    if current_user['role'] != 'superadmin':
        return jsonify({"message":"Unauthorized Access"}), 401
    
    try: 
        client = docker_client()
        svc = client.services.get(id)
        svc.remove()
        return jsonify({"message": "Service deleted successfully"}), 200
    except de.APIError as e:
        return error_handler(e)

# Swarm Nodes API
@app.route("/nodes")
def swarm_nodes_list(count=False):  
    try:
        client = docker_client()
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
    



@app.route('/login', methods=['POST'])
def login():
    data = request.json
    
    username = data.get('username')
    password = data.get('password')

    client = mongo_client()
    db = client['usersDB']
    users_collection = db['users']

    user = users_collection.find_one({'username': username})

    if bcrypt.checkpw(password.encode('utf-8'), user['password']):
        # Create a JWT token with an aware datetime object
        token = jwt.encode({
            'username': username,
            'role' : user['role'],
            'exp': datetime.datetime.now(timezone.utc) + datetime.timedelta(hours=1)  # Token expires in 1 hour
        }, SECRET_KEY, algorithm='HS256')

        return jsonify({'message': 'Login successful', 'token': token ,'role':user['role']}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
    

@app.route('/users', methods=['GET'])
@token_required
def get_users(current_user):
    client = mongo_client()
    db = client['usersDB']
    users_collection = db['users']
    # Get the current user's info to check their role
    # current_user = users_collection.find_one({'username': username}, {'_id': 0, 'password': 0})

    if not current_user:
        return jsonify({'message': 'Current user not found'}), 404

    # Check if the current user is a superadmin
    if current_user['role'] != 'superadmin':
        return jsonify({'message': 'Unauthorized action'}), 403

    # Fetch all users excluding the password field
    users = list(users_collection.find({}, {'_id': 0, 'password': 0}))
    
    return jsonify(users), 200 

@app.route('/addUser', methods=['POST'])
@token_required
def addUser(current_user):
    client = mongo_client()
    db = client['usersDB']  # Use your actual database name
    users_collection = db['users']      # Collection for user data
    
    # user = users_collection.find_one({'username': current_user}, {'_id': 0, 'password': 0})  # Exclude password field

    if current_user['role'] != "superadmin":
        return jsonify({"message": "Unauthorized User"}), 401
    
    data = request.json
    created_username = data.get('username')
    created_password ='Realpage@123'
    created_email = data.get('email')
    created_role=data.get('role')

    if users_collection.find_one({'username': created_username}):
        return jsonify({'message': 'User already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(created_password.encode('utf-8'), bcrypt.gensalt())

    # Store user information
    user_data = {
        'username': created_username,
        'password': hashed_password,
        'email': created_email,
        'role':created_role
    }
    users_collection.insert_one(user_data)
    print("Users in DB:", list(users_collection.find()))

    return jsonify({'message': 'User Added Successfully'}), 201


@app.route('/editUser/<target_username>', methods=['PUT'])
@token_required
def edit_user(current_user, target_username):  # Accept both target and requesting usernames
    client = mongo_client()
    db = client['usersDB']
    users_collection = db['users']
    
    # current_user = users_collection.find_one({'username': username}, {'_id': 0, 'password': 0})
    
    if not current_user:
        return jsonify({'message': 'Current user not found'}), 404
    if current_user['role'] != 'superadmin':
        return jsonify({'message': 'Unauthorized action'}), 403
    
    user_to_edit = users_collection.find_one({'username': target_username})
    if not user_to_edit:
        return jsonify({'message': 'User not found'}), 404
    
    data = request.json
    new_role = data.get('role')
    users_collection.update_one({'username': target_username}, {'$set': {'role': new_role}})
    return jsonify({'message': 'User role updated successfully'}), 200

@app.route('/deleteUser/<target_username>', methods=['DELETE'])
@token_required
def delete_user(current_user, target_username):  # Accept both target and requesting usernames
    client = mongo_client()
    db = client['usersDB']
    users_collection = db['users']
    
    # current_user = users_collection.find_one({'username': username}, {'_id': 0, 'password': 0})
    
    if not current_user:
        return jsonify({'message': 'Current user not found'}), 404
    if current_user['role'] != 'superadmin':
        return jsonify({'message': 'Unauthorized action'}), 403
    
    user_to_delete = users_collection.find_one({'username': target_username})
    if not user_to_delete:
        return jsonify({'message': 'User not found'}), 404
    
    users_collection.delete_one({'username': target_username})
    return jsonify({'message': 'User deleted successfully'}), 200


# User route to get user data
@app.route('/user', methods=['GET'])
@token_required
def get_user(current_user):
    # client = mongo_client()
    # db = client['usersDB']
    # users_collection = db['users']
    
    # user = users_collection.find_one({'username': username}, {'_id': 0, 'password': 0})  # Exclude password field
    if current_user:
        return jsonify(current_user), 200
    else:
        return jsonify({'message': 'User not found'}), 404
    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True,use_reloder=True)