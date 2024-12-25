# How to Run the Project (112-1-HW1)

## Prerequisites
- Node.js (npm)
- Yarn

## MongoDB Setup

1. Follow this tutorial: [MongoDB Setup Guide](https://youtu.be/O5cmLDVTgAs?si=CNNLtl9m7kX7GbFh) (watch between 2:01:08 and 2:03:00).
2. Copy the provided MongoDB connection string.

## Backend Setup

1. In the `backend/` directory, create a `.env` file with the following content:
    ```
    PORT=8000
    MONGO_URL=mongodb+srv://... (your connection string)
    ```
2. Install the required dependencies:
    ```bash
    cd backend
    yarn
    ```
3. Start the server:
    ```bash
    yarn start
    ```

## Frontend Setup

1. Open `frontend/index.html` in your browser.
2. (Optional) If running on a remote server, navigate to the `frontend/` directory and run the following command. Also, update the `baseURL` in `frontend/index.js` to your domain:
    ```bash
    python3 -m http.server [PORT]
    ```

## Reference
This project is the HW1 for the EE3035: Web Programming course, Fall 2023.
Some of the code has been adapted from the demo available at:
[https://github.com/ntuee-web-programming/112-1-unit1-todo-list/tree/main](https://github.com/ntuee-web-programming/112-1-unit1-todo-list/tree/main),
which is licensed under the MIT License.
