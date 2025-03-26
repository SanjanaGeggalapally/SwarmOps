# Getting Started

Welcome to the Getting Started guide for SwarmOps! This section will help you set up the project on your local machine and get it running smoothly.

## Installation Process  
To install the project, clone the repository to your local machine. Open your terminal and run the following command:

    git clone https://devtfs.realpage.com/tfs/Realpage/DevOpsInterns2024/_git/swarmops

## Software dependencies
Before running the project, ensure you have the following software installed on your system:
1. **Docker** Installation: [Download Docker](https://www.docker.com/get-started) (for Containerization)
2. **Node.js** Installation: [Download Node.js](https://nodejs.org) (for Frontend Development)
3. **Python** Installation: [Download Python](https://www.python.org/downloads) (for Backend Development)
4. **Nginx** Installation: [Download Nginx](https://nginx.org/en/docs/install.html) (for Proxy Configuration)

The project uses Dockerfiles to automatically install the dependencies specified in requirements.txt for the backend and the necessary packages for the frontend.

## API references
### Frontend Application
**Base URL:** [http://swarmops_frontend:80/]()  
**Description:** This serves the React frontend application. All requests to the root URL will be handled by the frontend service.
    
### Backend API
**Base URL:** [http://swarmops_backend:5000/api/]()  
**Description:** This is the base URL for all API requests directed to the backend service. The backend is built using Flask and handles various operations related to the application.

## Build and Run

SwarmOps makes building and running the application effortless with automation powered by Docker Compose. Simply follow these steps:

1. Ensure you have Docker and Docker Compose installed on your system.
2. Navigate to the directory containing the `build-compose.yml` file.
3. Run the following command:
    ```bash
    docker-compose up

---

**[Go to the User Guide](user-guide.md)**  
**[Go to the Administrator Guide](administrator-guide.md)**