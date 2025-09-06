# Construction Tech API

This project is a Node.js REST API for a construction technology platform connecting homeowners and contractors. It features JWT-based authentication, role-based access control, and a relational data model for managing users, projects, bids, and milestones. The application is fully containerized with Docker for consistent development and deployment.

## Entity-Relationship (ER) Model Overview

The API is built around four core models with the following relationships:

* **User & Project**: A `User` (as a 'Homeowner') has a **one-to-many** relationship with `Projects`.
* **User & Bid**: A `User` (as a 'Contractor') has a **one-to-many** relationship with `Bids`.
* **Project & Bid**: A `Project` has a **one-to-many** relationship with `Bids`.
* **Project & Milestone**: A `Project` has a **one-to-many** relationship with `Milestones`.


***
## How to Run Locally with Docker

This project is containerized, so the only prerequisite is **Docker Desktop**.

1.  **Clone the repository**.

2.  **Create a `.env` file** in the root of the project by copying the example below. Be sure to fill in your own database credentials.

    ```env
    # Database Variables
    DB_HOST=db
    DB_USER=postgres
    DB_PASSWORD=your_postgres_password
    DB_NAME=construction_db
    DB_PORT=5432

    # Application Port
    PORT=8000

    # JWT Secret Key
    JWT_SECRET=your_long_random_jwt_secret_string
    ```

3.  **Build and run the containers** using Docker Compose. Open a terminal in the project root and run:
    ```bash
    docker-compose up --build
    ```
    The API will be available at `http://localhost:8000`.
***
## How to Test API Endpoints (Postman)

The following is a guide to testing the core application flow using an API client like Postman.

### 1. Register Users
First, register a **Homeowner** and a **Contractor**.

* **Request**: `POST /api/auth/register`
* **Body (Homeowner)**:
    ```json
    {
        "name": "Alice Homeowner",
        "email": "alice@example.com",
        "password": "password123",
        "role": "Homeowner"
    }
    ```
* **Body (Contractor)**:
    ```json
    {
        "name": "Bob Contractor",
        "email": "bob@example.com",
        "password": "password456",
        "role": "Contractor"
    }
    ```

### 2. Log In to Get Tokens
Log in as both users to get their JWTs, which are needed for all other requests.

* **Request**: `POST /api/auth/login`
* **Body**:
    ```json
    {
        "email": "alice@example.com",
        "password": "password123"
    }
    ```
* **Action**: Copy the `token` from the response. This will be your **Homeowner Token**. Repeat the process for the contractor to get a **Contractor Token**.

### 3. Making Authenticated Requests
For all subsequent requests, go to the **Authorization** tab, select **Type: Bearer Token**, and paste the appropriate token into the token field.

### 4. API Endpoints
* **Create a Project** (as Homeowner)
    * **Token**: Homeowner Token
    * **Request**: `POST /api/projects`
    * **Body**:
        ```json
        {
            "title": "Build a New Deck",
            "description": "A 12x16 foot wooden deck.",
            "location": "123 Main St, Anytown"
        }
        ```
    * **Action**: Copy the `id` from the response for the new project.

* **Submit a Bid** (as Contractor)
    * **Token**: Contractor Token
    * **Request**: `POST /api/bids/<PROJECT_ID>` (replace `<PROJECT_ID>` with the ID from the previous step)
    * **Body**:
        ```json
        {
            "price": "4500.50",
            "estimatedDuration": "3 weeks"
        }
        ```

* **View Project Details** (as Homeowner or Contractor)
    * **Token**: Homeowner or Contractor Token
    * **Request**: `GET /api/projects/<PROJECT_ID>`
    * **Result**: The response will contain project details, including an array of all bids submitted.
***
## How to Deploy to AWS Elastic Beanstalk

The application is configured for deployment to the AWS Elastic Beanstalk Docker platform.

1.  **Create a Free Tier AWS Account**.
2.  **Install and configure the AWS CLI and EB CLI**.
3.  **Create a Free Tier PostgreSQL database using AWS RDS**. Note the database endpoint, username, and password.
4.  **Initialize the project** by running `eb init -p Docker -r <your-region>`.
5.  **Create the environment** by running `eb create <your-environment-name>`.
6.  **Configure Environment Variables**: In the Elastic Beanstalk console, navigate to your environment's **Configuration > Software** section and add the following properties:
    * `DB_HOST`: Your RDS database endpoint.
    * `DB_USER`: Your RDS username.
    * `DB_PASSWORD`: Your RDS password.
    * `DB_NAME`: The name of the database (e.g., `postgres`).
    * `JWT_SECRET`: A secure, random string.
    * `PORT`: `8080`.
7.  **Test**: The application will be live at the URL provided by Elastic Beanstalk.
8.  **Cleanup**: Terminate the Elastic Beanstalk environment and delete the RDS instance to avoid any charges.
