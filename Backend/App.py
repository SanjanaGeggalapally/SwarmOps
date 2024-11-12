from flask import Flask, jsonify
# from flask_cors import CORS
import docker
import docker.errors as de
import json
import os

app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

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


@app.route("/services")
def swarm_services_list():
    try:
        client = get_client()
        slist = client.services.list()
        services_data = [service.attrs for service in slist]
        return jsonify({"services": services_data})
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

# Swarm Services - Inspect
@app.route("/services/update/<id>", methods=['POST'])
def swarm_service_update(id):
    
    pass

# Swarm Nodes API
@app.route("/nodes")
def swarm_nodes_list():
    try:
        client = get_client()
        nlist = client.nodes.list()
        nodes_data = [node.attrs for node in nlist]
        return jsonify({"nodes": nodes_data})
    except de.APIError as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


# Swarm Services - Static
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