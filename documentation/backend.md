# Backend API

The SwarmOps Backend API is built using Python and Flask, providing essential services for managing and orchestrating Docker Swarm components. This API handles various operations related to the SwarmOps application, enabling seamless communication between the frontend and backend.

## Overview

The backend API supports the frontend application by providing endpoints for managing nodes, services, and tasks within the Docker Swarm cluster. It is built with RESTful principles and optimized for performance and scalability.

## Features

- **User  Authentication**: Secure access to the API with JWT.
- **Node Management**: Endpoints to manage and monitor nodes in the Swarm cluster.
- **Service Control**: Create, update, and delete services within the cluster.
- **Task Tracking**: Monitor and manage tasks across the Swarm.
- **User  Management**: Admin functionalities for adding, editing, and deleting users.

### Utility Functions

For more information on the utility functions used in the backend, please refer to the [Utilities Documentation](../utils.md).

## API Endpoints

### Authentication

- **POST /login**
  - **Description**: Logs in a user and receive a JWT token.
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
    - `Authorization`: `Bearer <token>`

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

### Users

- **GET /users**
  - **Description**: Retrieve a list of all users (Superadmin only).
  - **Headers**:
    - `Authorization`: `Bearer <token>`
  - **Response**: Returns an array of user objects.

- **POST /addUser**
  - **Description**: Add a new user (Superadmin only).
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
  - **Description**: Edit a user's role (Superadmin only).
  - **Request Body**:
    ```json
    {
      "role": "<new_role>"
    }
    ```
  - **Response**: Confirmation message upon successful update.

- **DELETE /deleteUser /<target_username>**
  - **Description**: Delete a user (Superadmin only).
  - **Response**: Confirmation message upon successful deletion.

## Resource Center

For further information, you can refer to the following resources:

- [Return to Project Overview](../README.md): Navigate back to the main documentation for an overview of the entire project.
- [Frontend Documentation](../frontend.md): Detailed information about the frontend application.