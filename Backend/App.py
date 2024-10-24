from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

services = [
        {
            "CreatedAt": "2024-10-22T11:39:14.527898728Z",
            "Endpoint": {
                "Ports": [
                    {
                        "Protocol": "tcp",
                        "PublishMode": "ingress",
                        "PublishedPort": 5009,
                        "TargetPort": 5000
                    }
                ],
                "Spec": {
                    "Mode": "vip",
                    "Ports": [
                        {
                            "Protocol": "tcp",
                            "PublishMode": "ingress",
                            "PublishedPort": 5009,
                            "TargetPort": 5000
                        }
                    ]
                },
                "VirtualIPs": [
                    {
                        "Addr": "10.0.0.34/24",
                        "NetworkID": "lt58xre1i7zb1r4vvuwia72mv"
                    }
                ]
            },
            "ID": "2gw5ib9uadw1g3pj9hrcvossl",
            "Spec": {
                "EndpointSpec": {
                    "Mode": "vip",
                    "Ports": [
                        {
                            "Protocol": "tcp",
                            "PublishMode": "ingress",
                            "PublishedPort": 5009,
                            "TargetPort": 5000
                        }
                    ]
                },
                "Labels": {},
                "Mode": {
                    "Replicated": {
                        "Replicas": 1
                    }
                },
                "Name": "registry",
                "TaskTemplate": {
                    "ContainerSpec": {
                        "DNSConfig": {},
                        "Image": "registry:2@sha256:ac0192b549007e22998eb74e8d8488dcfe70f1489520c3b144a6047ac5efbe90",
                        "Init": False,
                        "Isolation": "default"
                    },
                    "ForceUpdate": 0,
                    "Placement": {
                        "Platforms": [
                            {"Architecture": "amd64", "OS": "linux"},
                            {"Architecture": "unknown", "OS": "unknown"},
                            {"OS": "linux"},
                            {"Architecture": "arm64", "OS": "linux"},
                            {"Architecture": "s390x", "OS": "linux"}
                        ]
                    },
                    "Resources": {
                        "Limits": {},
                        "Reservations": {}
                    },
                    "Runtime": "container"
                }
            },
            "UpdatedAt": "2024-10-22T11:39:14.529226176Z",
            "Version": {
                "Index": 907
            }
        },
        {
            "CreatedAt": "2024-10-22T12:40:01.115712028Z",
            "Endpoint": {
                "Ports": [
                    {
                        "Protocol": "tcp",
                        "PublishMode": "ingress",
                        "PublishedPort": 8000,
                        "TargetPort": 8000
                    }
                ],
                "Spec": {
                    "Mode": "vip",
                    "Ports": [
                        {
                            "Protocol": "tcp",
                            "PublishMode": "ingress",
                            "PublishedPort": 8000,
                            "TargetPort": 8000
                        }
                    ]
                },
                "VirtualIPs": [
                    {
                        "Addr": "10.0.0.39/24",
                        "NetworkID": "lt58xre1i7zb1r4vvuwia72mv"
                    },
                    {
                        "Addr": "10.0.3.4/24",
                        "NetworkID": "a33gruskditrg5kffyno08n77"
                    }
                ]
            },
            "ID": "3p2or3dy92bs581vvy4g98u2r",
            "Spec": {
                "EndpointSpec": {
                    "Mode": "vip",
                    "Ports": [
                        {
                            "Protocol": "tcp",
                            "PublishMode": "ingress",
                            "PublishedPort": 8000,
                            "TargetPort": 8000
                        }
                    ]
                },
                "Labels": {
                    "com.docker.stack.image": "127.0.0.1:5009/stackdemo",
                    "com.docker.stack.namespace": "c"
                },
                "Mode": {
                    "Replicated": {
                        "Replicas": 1
                    }
                },
                "Name": "c_web",
                "TaskTemplate": {
                    " ContainerSpec": {
                        "DNSConfig": {},
                        "Image": "127.0.0.1:5009/stackdemo:latest",
                        "Init": False,
                        "Isolation": "default"
                    },
                    "ForceUpdate": 0,
                    "Placement": {
                        "Platforms": [
                            {"Architecture": "amd64", "OS": "linux"},
                            {"Architecture": "unknown", "OS": "unknown"},
                            {"OS": "linux"},
                            {"Architecture": "arm64", "OS": "linux"},
                            {"Architecture": "s390x", "OS": "linux"}
                        ]
                    },
                    "Resources": {
                        "Limits": {},
                        "Reservations": {}
                    },
                    "Runtime": "container"
                }
            },
            "UpdatedAt": "2024-10-22T12:40:01.117234944Z",
            "Version": {
                "Index": 908
            }
        }
        
]

@app.route('/services', methods=['GET'])
def get_services():
    return jsonify(services)

if __name__ == '__main__':
    app.run(debug=True)