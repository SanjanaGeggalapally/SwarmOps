# Introduction

SwarmOps is a robust dashboard application developed by our team to simplify the administration and orchestration of Docker Swarm components. With an intuitive user interface, it empowers users to efficiently manage and monitor Docker Swarm clusters. SwarmOps provides a comprehensive suite of features that enable users to:

- Oversee and manage **Nodes** within the Swarm cluster.
- Monitor and control **Services** and their lifecycles.
- Track and manage **Tasks** across the cluster.
- Access other essential tools for seamless orchestration.

## Why Choose SwarmOps?
- Centralize all your needs in one place. No more switching between platforms—everything is streamlined and easy to access.
- Whether you are managing a few services or handling a large infrastructure, SwarmOps will save you time and effort with its user-friendly interface.

By integrating DevOps best practices and leveraging modern technologies, SwarmOps simplifies complex Swarm operations, making it an invaluable resource for administrators and developers alike.

# Getting Started

Welcome to the Getting Started guide for SwarmOps! This section will help you set up the project on your local machine and get it running smoothly.

## 1. Installation Process  
To install the project, clone the repository to your local machine. Open your terminal and run the following command:

    git clone https://devtfs.realpage.com/tfs/Realpage/DevOpsInterns2024/_git/swarmops

## 2.	Software dependencies
Before running the project, ensure you have the following software installed on your system:
1. **Docker** Installation: [Download Docker](https://www.docker.com/get-started) (for Containerization)
2. **Node.js** Installation: [Download Node.js](https://nodejs.org) (for Frontend Development)
3. **Python** Installation: [Download Python](https://www.python.org/downloads) (for Backend Development)
4. **Nginx** Installation: [Download Nginx](https://nginx.org/en/docs/install.html) (for Proxy Configuration)

The project uses Dockerfiles to automatically install the dependencies specified in requirements.txt for the backend and the necessary packages for the frontend.

## 3.	API references
### Frontend Application
**Base URL:** [http://swarmops_frontend:80/]()  
**Description:** This serves the React frontend application. All requests to the root URL will be handled by the frontend service.
    
### Backend API
**Base URL:** [http://swarmops_backend:5000/api/]()  
**Description:** This is the base URL for all API requests directed to the backend service. The backend is built using Flask and handles various operations related to the application.

# Build and Run

SwarmOps makes building and running the application effortless with automation powered by Docker Compose. Simply follow these steps:

1. Ensure you have Docker and Docker Compose installed on your system.
2. Navigate to the directory containing the `build-compose.yml` file.
3. Run the following command:
    ```bash
    docker-compose up

# Resource Center

For further information, you can refer to the following documentation:

- [Frontend Documentation](../frontend/README.md): Detailed information about the React + Vite frontend application.
- [Backend Documentation](../backend/README.md): Comprehensive details about the backend API and its functionalities.

# Contribution

SwarmOps thrives on collaborative efforts within our organization. Here’s how team members can contribute to its growth:

## How to Get Involved
- **Share Feedback:** Report any issues or share ideas for improvement through our designated channels, like team meetings, internal forums, or our project repository.
- **Enhance Functionality:** Collaborate on developing new features or refining existing ones to improve usability and performance.
- **Document Processes:** Help maintain comprehensive guides and documentation for better understanding and onboarding of new team members.
- **Propose Innovations:** Present suggestions for future advancements during brainstorming sessions or tech discussions.
- **Support Your Team:** Assist colleagues in troubleshooting or using SwarmOps effectively, fostering a collaborative environment.

## Future Scope & Advancements
- **Improved Insights:** Develop advanced analytics dashboards for better tracking of cluster performance and resource allocation.
- **Integration with Organizational Tools:** Enable seamless interfacing with internal DevOps platforms and tools for streamlined workflows.
- **Scalability:** Enhance scalability features to better handle growing infrastructure needs within the organization.
- **Security Enhancements:** Focus on robust internal security measures to ensure secure cluster management.
- **Automation:** Implement automated processes to simplify repetitive Swarm operations.
- **Custom Features:** Tailor SwarmOps further to suit specific requirements unique to our organization.

By collaborating effectively, our team can ensure that SwarmOps continues to evolve as a powerful, organization-specific orchestration tool. Together, we shape the future of internal Docker Swarm management!