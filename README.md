# Running `todo-v2` Locally

## Prerequisites
- Node.js installed on your machine.
- A code editor such as Visual Studio Code.

## Steps

1. **Clone the Repository**
    - First, you need to clone the repository to your local machine. You can do this with the following command:
    ```
    git clone https://github.com/geekabhinav007/ToDo-v2.git
    ```

2. **Install Dependencies**
    - Navigate into the project directory (e.g., `cd todo-v2`).
    - Install the necessary dependencies by running:
    ```bash
    npm install
    ```

3. **Run the Application**
    - You can start the development server by running:
    ```bash
    npm run dev
    ```
    - This will start the server, and the application will be accessible at `http://localhost:5173` (or whatever port is specified in your configuration).

4. **Build the Application**
    - To create a production build of the application, you can run:
    ```bash
    npm run build
    ```
    - This will create a `dist` folder with the production-ready files.

5. **Preview the Build**
    - You can preview the production build by running:
    ```bash
    npm run preview
    ```
    - This will serve the built files, and the application will be accessible at `http://localhost:5173`.

6. **Linting**
    - To lint your code, you can run:
    ```bash
    npm run lint
    ```
    - This will run ESLint on your code and report any linting errors.

