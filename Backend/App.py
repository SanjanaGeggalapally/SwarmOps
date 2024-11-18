
from flask import Flask, request, jsonify
from flask_cors import CORS
import docker
import docker.errors as de
import json
import os

app = Flask(__name__)
CORS(app)

def get_client():
    return docker.from_env()

# Home
@app.route('/')
def home():
    return jsonify({ "hello": "world" })

@app.route('/ping')
def ping():
    client = get_client()
    return jsonify({ "ping": client.ping() })

# Swarm services - update
@app.route('/services/update/<id>', methods=['POST'])
def update_service(id):
    try:
        # Parse JSON data from the request
        service_data = request.get_json()
 
        # Process the data (e.g., update the database)
        # For demonstration, we'll just print it
        print(f"Received data for service ID {id}: {service_data}")
        Name = service_data['Name'] 
        Replicas = service_data['Replicas']
        print(f"name : {Name} type: {type(Name)}, replicas : {Replicas} type: {type(Replicas)}")
        Replicas_int = int(Replicas)
        print(f"name : {Name} type: {type(Name)}, replicas : {Replicas_int} type: {type(Replicas_int)}")
        client = get_client()
        svc = client.services.get(id)
        version = svc.attrs['Version']['Index']
        print(f"version: {version}") 
        svc.update(name=Name, mode={'Replicated': {'Replicas': Replicas_int}})
 
        # svc.update(maxreplicas=Replicas_int)    
        #svc.update(name=Name)
        # Respond with a success message
        return jsonify({"message": "Service updated successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)})


@app.route("/servicesStatic")
def services_static():
    try:
        json_file_path = os.path.join(os.path.dirname(__file__), 'data.json')
        
        with open(json_file_path, 'r') as json_file:
            data = json.load(json_file)
        
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "data.json file not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/services")
def swarm_services_list():
    try:
        client = get_client()
        slist = client.services.list()
        services_data = [service.attrs for service in slist]
        return jsonify(services_data)
    except de.APIError as e:
        return jsonify({"error": str(e)}), 500

# Swarm Services - Inspect
@app.route("/services/inspect/<id>")
def swarm_service_inspect(id):
    try:
        client = get_client()
        response = client.services.get(id)
        return jsonify({"service": response.attrs})
    except de.NotFound as nf:
        return jsonify({"error": str(nf)}), 404
    except de.APIError as ae:
        return jsonify({"error": str(ae)}), 500
    except de.InvalidVersion as iv:
        return jsonify({"error": str(iv)}), 400

# Swarm Nodes API
@app.route("/nodes")
def swarm_nodes_list():
    try:
        client = get_client()
        nlist = client.nodes.list()
        nodes_data = [node.attrs for node in nlist]
        return jsonify(nodes_data)
    except de.APIError as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

