
from flask import Flask, request, jsonify
from flask_cors import CORS
import docker.errors as de
import json
import os
import re
from node import node_prcs 
from utils.utils import error_handler, get_client


app = Flask(__name__)
CORS(app)


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
        return error_handler(e)


@app.route('/services')
def swarm_services_list(count=False):
    try:
        client = get_client()
        slist = client.services.list()
        # services_data = [svc_prcs(service.attrs) for service in slist]
        services_data = [service.attrs for service in slist]
        return jsonify(services_data)
    except de.APIError as e:
        return error_handler(e)

@app.route('/services/new')
def swarm_services_list(count=False):
    try:
        client = get_client()
        slist = client.services.list()
        services_data = [svc_prcs(service.attrs) for service in slist]
        # services_data = [service.attrs for service in slist]
        return jsonify(services_data)
    except de.APIError as e:
        return error_handler(e)

# Swarm Services - Inspect
@app.route("/services/inspect/<id>")
def swarm_service_inspect(id):
    try:
        client = get_client()
        service = client.services.get(id)
        return jsonify(svc_prcs(service.attrs))
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
        # nodes_data = [node_prcs(node.attrs) for node in nlist]

        return jsonify(nodes_data)
    except de.APIError as e:
        return error_handler(e)
    
@app.route("/nodes/new")
def swarm_nodes_list(count=False):
    try:
        client = get_client()
        nlist = client.nodes.list()
        if count: 
            return len(nlist)
        
        # nodes_data = [node.attrs for node in nlist]
        nodes_data = [node_prcs(node.attrs) for node in nlist]

        return jsonify(nodes_data)
    except de.APIError as e:
        return error_handler(e)

def svc_prcs(svc):

    res = {}
    # service name
    res['name'] = svc.get("Spec").get("Name")

    # service ID
    res['id'] = svc.get("ID")

    # Image used by service
    img = svc.get("Spec").get("TaskTemplate").get("ContainerSpec").get("Image")
    # image name format = {image_name}@{sha_code}
    pattern = r"^(?P<img_name>.*?)@"
    match = re.search(pattern, img)
    res['image'] = match.group('img_name')
    
    # Ports - int:int or str:str
    ports_list = svc.get("Endpoint").get("Ports")
    
    if ports_list is not None: 
        # Published Port i.e. port exposed to outside world
        res['pub_port'] = svc.get("Endpoint").get("Ports")[0].get("PublishedPort")

        # Target Port i.e. port exposed inside container
        res['tar_port'] = svc.get("Endpoint").get("Ports")[0].get("TargetPort")
        
    else:
        res['pub_port'] = "Undefined"
        res['tar_port'] = "Undefined"

    # Service Replicas - int
    print(f'cnt: {swarm_nodes_list(count=True)}')
    res['replicas'] = svc.get("Spec").get("Mode").get("Replicated", {"Replicas": swarm_nodes_list(count=True)}).get("Replicas")
    
    # Service Version - int
    res['version'] = svc.get("Version").get("Index")

    # Creation Time 
    res['created_at'] = svc.get("CreatedAt")
    
    # Last Updation Time
    res['last_updated_at'] = svc.get("UpdatedAt")

    # Labels - dict
    res['labels'] = svc.get("Spec").get("Labels")
    
    # print("res : ", res)
    
    return res

if __name__ == '__main__':
    app.run(debug=True)
