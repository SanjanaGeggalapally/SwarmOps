# Node Management

This document explains the implementation and functionality of node management in SwarmOps, enabling administrators to view, monitor, and manage cluster nodes efficiently.

---

## Overview

Node Management in SwarmOps enables administrators to:  
- View and retrieve comprehensive details about nodes, including hostname, role, and status, in the Docker Swarm cluster.  
- Modify node configurations, such as updating hostnames or removing nodes no longer required in the cluster.  
- Search for nodes efficiently using attributes like hostname, role, or status, simplifying overall management.

Other node-related actions, such as draining, updating roles, or rejoining nodes, must be performed manually using command-line tools or scripts.

---

## Backend Architecture

### Utility Functions Supporting Node Management
- **Node Processing**:
  - `node_prcs(node)`:
    - Processes raw node data retrieved from Docker Swarm.
    - Extracts key details such as:
      - Node ID
      - Hostname
      - Role (e.g., manager or worker)
      - Status (e.g., active or draining)
      - Platform details (architecture and OS)

- **Docker Client**:
  - `docker_client()`:
    - Establishes a connection with the Docker API to enable hostname editing and node deletion.

---

## API Endpoints

### 1. Retrieve All Nodes
- **Endpoint**: `GET /nodes`
- **Description**:
  - Fetches a list of all nodes in the Docker Swarm cluster.
- **Response**:
  - Returns an array of node objects with details such as:
    - Node ID
    - Hostname
    - Role
    - Status
    - Platform details

### 2. Edit Node Hostname
- **Endpoint**: `POST /nodes/edit/<node_id>`
- **Description**:
  - Updates the hostname of a specific node in the cluster.
- **Request Body**:
  ```json
  {
    "hostname": "<new_hostname>"
  }
- **Response**:
  - Confirmation message upon successful hostname update.

### 3. Delete Node
- **Endpoint**: `DELETE /nodes/<node_id>`
- **Description**:
  - Deletes a specific node from the Swarm cluster.
- **Response**:
  - Confirmation message upon successful node deletion.

## Integration with Frontend

Node Management in SwarmOps seamlessly integrates with the frontend, ensuring a smooth and user-friendly experience for administrators:

1. **Node Monitoring**:
   - The frontend sends `GET /nodes` requests to fetch and display the list of nodes along with their details, such as hostname, role, and status.

2. **Hostname Editing**:
   - Provides a straightforward interface for administrators to update the hostname of a node using the `POST /nodes/edit/<node_id>` endpoint.

3. **Node Deletion**:
   - Enables administrators to remove nodes from the cluster via the `DELETE /nodes/<node_id>` endpoint, ensuring a simple and efficient workflow.
   
---

**[← Go Back to the Administrator Guide](../administrator-guide.md)**