# Pokedex Application (MERN Stack)

A simple web application to display Pokémon data, built using the MERN stack (MongoDB, Express, React, Node.js). This project allows users to search for Pokémon individually, search for multiple Pokémon, and view a list of Pokémon filterable by type.

## Features

*   **Search Single Pokémon:** Find a Pokémon by its exact name (e.g., "Pikachu").
*   **Search Multiple Pokémon:** Find multiple Pokémon by providing a comma-separated list of names (e.g., "Bulbasaur, Charmander").
*   **Filterable Pokédex:** View a list of Pokémon and filter them by their primary type (e.g., show only "Fire" type Pokémon).

## Tech Stack

**Backend:**
*   Node.js
*   Express.js
*   MongoDB (Database)
*   Mongoose (ODM for MongoDB)
*   Cors (Cross-Origin Resource Sharing)
*   Dotenv (Environment Variables)

**Frontend:**
*   React.js (using Create React App or Vite)
*   JavaScript (ES6+)
*   CSS
*   Fetch API (for interacting with the backend)

## Setup and Installation

Follow these steps to get the project running locally.

**Prerequisites:**
*   Node.js and npm (or yarn) installed: [https://nodejs.org/](https://nodejs.org/)
*   MongoDB installed and running: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

**1. Backend Setup:**

*   Navigate to the backend project folder:
    ```bash
    cd simple-pokedex-backend
    ```
*   Install backend dependencies:
    ```bash
    npm install
    ```
*   Create an environment variable file named `.env` in the `simple-pokedex-backend` root directory.
*   Add the following lines to the `.env` file, replacing the MongoDB URI if yours is different:
    ```dotenv
    PORT=5001
    MONGO_URI=mongodb://localhost:27017/simplepokedex
    ```
    *(The database will be seeded with sample data automatically the first time the server connects if the collection is empty).*

**2. Frontend Setup:**

*   Navigate to the frontend project folder:
    ```bash
    cd ../pokedex-frontend
    # Or adjust path if your folders are structured differently
    ```
*   Install frontend dependencies:
    ```bash
    npm install
    ```
*   Create an environment variable file named `.env` in the `pokedex-frontend` root directory.
*   Add the following line to the frontend `.env` file. **Make sure the port matches your running backend's port (from the backend `.env`)**.

    *   **If using Create React App:**
        ```dotenv
        REACT_APP_API_BASE_URL=http://localhost:5001/api/pokemon
        ```
    *   **If using Vite:**
        ```dotenv
        VITE_API_BASE_URL=http://localhost:5001/api/pokemon
        ```

## Running the Project

1.  **Start MongoDB:** Make sure your MongoDB server instance is running.
2.  **Start Backend Server:**
    *   Open a terminal in the `simple-pokedex-backend` directory.
    *   Run:
        ```bash
        node server.js
        ```
    *   The backend should be running on `http://localhost:5001`.
3.  **Start Frontend Server:**
    *   Open a **separate** terminal in the `pokedex-frontend` directory.
    *   Run:
        ```bash
        npm start
        # Or if using Vite:
        # npm run dev
        ```
    *   This will usually open the application automatically in your web browser at `http://localhost:3000` (or another port if 3000 is busy).

You should now be able to use the Pokedex application in your browser!

## API Endpoints (Backend)

The backend provides the following API endpoints:

*   `GET /api/pokemon`: Get a list of all Pokémon. Supports filtering by type.
    *   Example: `GET /api/pokemon?type=water`
*   `GET /api/pokemon/name/:name`: Get a single Pokémon by its exact name.
    *   Example: `GET /api/pokemon/name/pikachu`
*   `POST /api/pokemon/bulk`: Get multiple Pokémon by providing an array of names in the request body.
    *   Request Body Example: `{ "names": ["Bulbasaur", "Squirtle"] }`
*   `GET /test`: A simple health check route.
