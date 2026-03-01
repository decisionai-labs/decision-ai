# Project Setup Guide

Follow these steps to set up the Decision AI project on a new machine.

## Prerequisites

Ensure you have the following installed on your machine:
- **Git**: [Download Git](https://git-scm.com/downloads)
- **Node.js** (v18 or higher): [Download Node.js](https://nodejs.org/)

## Installation

1.  **Clone the Repository**
    Open your terminal or command prompt and run:
    ```bash
    git clone https://github.com/NeuroSolanaAgents/neurosan.git
    cd neurosan
    ```

2.  **Open in Editor/IDE**
    Open the `neurosan` folder in your preferred code editor (e.g., VS Code, Cursor, or Antigravity).

3.  **Install Dependencies**
    Execute the following command to install all required packages:
    ```bash
    npm install
    ```
    *Note: This may take a few minutes.*

4.  **Start Development Server**
    Run the development server locally:
    ```bash
    npm run dev
    ```

5.  **View the App**
    Open your browser and navigate to:
    [http://localhost:3000](http://localhost:3000)

## Troubleshooting

-   **Port Conflicts**: If port 3000 is in use, the app may start on port 3001. Check your terminal output.
-   **Missing Dependencies**: If you encounter errors, try deleting `node_modules` and `package-lock.json`, then run `npm install` again.
