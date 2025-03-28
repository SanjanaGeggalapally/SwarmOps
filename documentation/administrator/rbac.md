# Role-Based Access Control (RBAC)

This document explains the implementation of Role-Based Access Control (RBAC) in SwarmOps, focusing on securing access to resources by assigning roles with specific permissions.

---

## Overview

RBAC in SwarmOps empowers administrators to control access to sensitive resources and operations within the Docker Swarm cluster. By utilizing roles such as **User**, **Admin**, and **Superadmin**, it ensures that permissions are tailored to user responsibilities, fostering security and preventing unauthorized actions.

---

## Key Features

1. **Role Definition**:
   - Roles such as **User**, **Admin**, and **Superadmin** determine the scope of permissions within the application.

2. **Granular Access Control**:
   - Permissions are assigned based on roles, ensuring users can only perform actions relevant to their responsibilities.

3. **Secure API Access**:
   - API endpoints are protected using JWT tokens to authenticate users and validate their roles.

---

## Role Capabilities

| **Role**        | **Description**                                           | **Permissions**                                 |
|------------------|-----------------------------------------------------------|------------------------------------------------|
| **Superadmin**   | Oversees everything with full control over the system.    | Can manage users (add, edit, delete), services, and nodes. |
| **Admin**        | Operates and maintains services and nodes.                | Has full access to services and nodes but restricted from managing users. |
| **User**         | Views the system passively with no operational controls.  | Can only view details of nodes and services but cannot edit or modify anything. |

---

## Authentication and Authorization Workflow

1. **User Login**:
   - Users log in via `POST /login` to receive a JWT token.
   - The token contains the user’s role and is required for all subsequent API requests.

2. **Role Validation**:
   - Each API endpoint checks the user's role from the token to determine whether the requested action is permitted.

3. **Permission Enforcement**:
   - Unauthorized actions return a `403 Forbidden` response, ensuring sensitive operations remain secure.

---

## Integration with Backend

RBAC in SwarmOps is seamlessly integrated into the backend:

- **User Management**:
  - Endpoints such as `POST /addUser`, `PUT /editUser/<username>`, and `DELETE /deleteUser/<username>` allow Superadmins to manage users and assign roles.
  - Admins and unauthenticated users (User role) are restricted from accessing these endpoints.

- **Middleware**:
  - A middleware function validates JWT tokens, checks user roles, and ensures only authorized users can access specific endpoints.

---

## API Endpoints for RBAC

### 1. Login
- **Endpoint**: `POST /login`
- **Description**:
  - Authenticates users and provides a JWT token for secure access.
- **Request Body**:
  ```json
  {
    "username": "<username>",
    "password": "<password>"
  }
- **Response**:
  - Returns a JWT token containing the user's role.

### 2. Add User (Superadmin Only)
- **Endpoint**: `POST /addUser`
- **Description**:
  - Allows Superadmins to add a new user and assign a role.
- **Request Body**:
  ```json
  {
    "username": "<new_username>",
    "email": "<new_email>",
    "role": "<user_role>"
  }
- **Response**:
  - Confirmation message upon successful addition.

### 3. Edit User (Superadmin Only)
- **Endpoint**: `PUT /editUser/<username>`
- **Description**:
  - Allows Superadmins to modify a user’s role.
- **Request Body**:
  ```json
  {
    "role": "<new_role>"
  }
- **Response**:
  - Confirmation message upon successful update.

### 4. Delete User (Superadmin Only)
- **Endpoint**: `DELETE /deleteUser/<username>`
- **Description**:
  - Allows Superadmins to delete a user from the system.
- **Response**:
  - Confirmation message upon successful deletion.

---

This document explains the RBAC implementation in SwarmOps, focusing on assigning roles, controlling permissions, and securing access to resources. It emphasizes how **Users** can only view nodes and services, while **Admins** can manage them fully, and **Superadmins** have additional capabilities for managing users.

---

**[← Go Back to the Administrator Guide](../administrator-guide.md)**