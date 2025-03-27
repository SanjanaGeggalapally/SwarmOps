# Role-Based Access Control (RBAC)

## Overview

Role-Based Access Control (RBAC) is implemented in the SwarmOps Backend API to manage user permissions and ensure secure access to various functionalities. This system allows users to define roles and assign permissions accordingly, ensuring that users can only access resources and perform actions that are appropriate for their roles.

## User Roles

The following roles are defined within the SwarmOps application:

- **Superadmin**: Has full access to all functionalities, including user management, node management, and service control.
- **Admin**: Can manage nodes and services but does not have access to user management functionalities.
- **User**: Has limited access, primarily to view nodes and services without the ability to modify them.

## API Endpoints

### Authentication

- **POST /login**
  - **Description**: Logs in a user and returns a JWT token for authenticated access.
  - **Request Body**:
    ```json
    {
      "username": "<username>",
      "password": "<password>"
    }
    ```
  - **Response**: Returns a JWT token for authenticated access.

- **GET /user**
  - **Description**: Retrieve the current user's information.
  - **Headers**: 
    - `Authorization: Bearer <token>`

### Nodes

- **GET /nodes**
  - **Description**: Retrieve a list of nodes in the Swarm cluster.
  - **Response**: Returns an array of node objects with details.

### Services

- **GET /services**
  - **Description**: Retrieve a list of services in the Swarm.
  - **Response**: Returns an array of service objects with details.

- **POST /services/update/<service_id>**
  - **Description**: Update an existing service.
  - **Request Body**:
    ```json
    {
      "name": "<service_name>",
      "replicas": "<number_of_replicas>"
    }
    ```
  - **Response**: Confirmation message upon successful update.

- **GET /services/inspect/<id>**
  - **Description**: Inspect a specific service by ID.
  - **Response**: Returns detailed information about the specified service.

- **DELETE /services/delete/<id>**
  - **Description**: Delete a service by ID.
  - **Response**: Confirmation message upon successful deletion.

### Users (Superadmin Only)

- **GET /users**
  - **Description**: Retrieve a list of all users.
  - **Headers**: 
    - `Authorization: Bearer <token>`
  - **Response**: Returns an array of user objects.

- **POST /addUser**
  - **Description**: Add a new user.
  - **Request Body**:
    ```json
    {
      "username": "<new_username>",
      "email": "<new_email>",
      "role": "<user_role>"
    }
    ```
  - **Response**: Confirmation message upon successful addition.

- **PUT /editUser /<target_username>**
  - **Description**: Edit a user's role.
  - **Request Body**:
    ```json
    {
      "role": "<new_role>"
    }
    ```
  - **Response**: Confirmation message upon successful update.

- **DELETE /deleteUser /<target_username>**
  - **Description**: Delete a user.
  - **Response**: Confirmation message upon successful deletion.

## Utility Functions

The backend API utilizes several utility functions to support RBAC and other functionalities:

1. **node.py**
   - **Function**: `node_prcs(node)`
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

2. **task.py**
   - **Function**: `task_prcs(task)`
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

3. **utils.py**
   - **Function**: `error_handler(e)`
     - **Parameters**: 
       - `e`: An exception object.
     - **Returns**: A JSON response containing the error message.
   - **Function**: `docker_client()`
     - **Returns**: A Docker client instance