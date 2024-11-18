
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

# Swarm services - Update
@app.route('/services/update/<service_id>', methods=['POST'])
def update_service(service_id):
    try:
        service_data = request.get_json()

        # print(f"Received data for service ID {id}: {service_data}")
        Name = service_data['Name'] 
        Replicas = service_data['Replicas']
        print(f"name : {Name} type: {type(Name)}, replicas : {Replicas} type: {type(Replicas)}")
        Replicas_int = int(Replicas)
        print(f"name : {Name} type: {type(Name)}, replicas : {Replicas_int} type: {type(Replicas_int)}")

        client = get_client()
        svc = client.services.get(service_id)
        # version = svc.attrs['Version']['Index']
        # print(f"version: {version}") 
        svc.update(name=Name, mode={'Replicated': {'Replicas': Replicas_int}})
 
        return jsonify({"message": "Service updated successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)})

@app.route('/services')
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

