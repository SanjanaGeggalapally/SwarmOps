from flask import jsonify
import docker 

def error_handler(e):
    return jsonify({"Error": str(e)})

def get_client():
    return docker.from_env()