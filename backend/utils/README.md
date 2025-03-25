# Backend Utilities

The `utils` module contains utility functions that support the SwarmOps backend API. These functions are designed to handle common tasks such as processing node and task data, managing error responses, and establishing connections to external services like Docker and MongoDB.

## Overview of Utility Files

### 1. `node.py`

This file contains functions for processing node data retrieved from the Docker Swarm. The main function is:

- **`node_prcs(node)`**: 
  - **Parameters**: 
    - `node`: A dictionary containing information about a Docker Swarm node.
  - **Returns**: A dictionary with processed node information, including:
    - ID
    - Version
    - Created At
    - Updated At
    - Labels
    - Role
    - Hostname
    - Platform (Architecture and OS)
    - Status (State and IP Address)
    - Manager Status (Leader)

### 2. `task.py`

This file contains functions for processing task data retrieved from the Docker Swarm. The main function is:

- **`task_prcs(task)`**: 
  - **Parameters**: 
    - `task`: A dictionary containing information about a Docker Swarm task.
  - **Returns**: A dictionary with processed task information, including:
    - ID
    - Version
    - Created At
    - Updated At
    - Image
    - Node ID
    - Desired State

### 3. `utils.py`

This file contains general utility functions that are used throughout the backend API. The main functions are:

- **`error_handler(e)`**: 
  - **Parameters**: 
    - `e`: An exception object.
  - **Returns**: A JSON response containing the error message.

- **`docker_client()`**: 
  - **Returns**: A Docker client instance connected to the Docker environment.

- **`mongo_client()`**: 
  - **Returns**: A MongoDB client instance connected to the MongoDB service. If the connection fails, it prints an error message and returns `None`.

## Usage

These utility functions are imported and used in the main application (`app.py`) to streamline operations related to Docker and MongoDB, as well as to handle errors gracefully. For more information on the backend API, please refer to the [Backend API Documentation](../README.md).

## Contribution

Contributions to the utilities module are welcome! Please ensure that any new functions are well-documented and tested.