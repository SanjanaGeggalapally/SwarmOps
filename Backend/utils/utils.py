from flask import jsonify
import docker 
from pymongo import MongoClient

def error_handler(e):
    return jsonify({"Error": str(e)})

def docker_client():
    return docker.from_env()

# MongoDB connection function
def mongo_client():
    try:
        client = MongoClient("db:27017")  # Connect to the MongoDB service
        print("MongoDB connection established successfully.")
        return client
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return None