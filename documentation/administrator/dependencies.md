# Dependencies

This document outlines the software, tools, and libraries required for both backend and frontend functionality of the SwarmOps application.

---

## Backend Dependencies

### Python with Flask Framework
- **Python**: Used as the core programming language for the backend, utilizing `pycache`.
- **Framework**: Flask, a lightweight web application framework, is at the heart of backend development.
- **Virtual Environment**: Managed using `venv` to isolate dependencies.

### Requirements.txt
The following packages are defined in `requirements.txt` and are installed automatically with Docker:
- **flask**: Core framework.
- **flask_cors**: Enables Cross-Origin Resource Sharing (CORS).
- **docker**: Integrates Docker functionalities.
- **bcrypt**: Provides encryption for secure password handling.
- **pymongo**: Allows interaction with MongoDB databases.
- **pyjwt**: Handles JSON Web Tokens for authentication.
- **datetime**: Deals with date and time functionality.

### MongoDB
MongoDB serves as the database for storing application data. Ensure MongoDB is installed and properly configured for the backend.

### Automation with Docker
The backend setup, including dependency installation, is automated via Docker. Azure Pipelines and Docker Compose YAML files are used for continuous integration (CI) and continuous deployment (CD).

---

## Frontend Dependencies

### Core Technologies
- **React**: Frontend library for building user interfaces.
- **Vite**: Used for fast development and building of React applications.
- **JSX**: For creating components with React syntax.

### Styling
- **TailwindCSS**: Utility-first CSS framework for efficient styling.

### Code Quality
- **ESLint**: Ensures code consistency and quality across frontend components.

### Automation with Azure Pipelines
Azure Pipelines are employed for automating the frontend build, testing, and deployment processes, integrated with Docker Compose YAML files.

---

**[← Go Back to the Administrator Guide](../administrator-guide.md)**