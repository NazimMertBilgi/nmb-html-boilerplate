# Build Instructions

This page explains how to build the project using the `package.json` file.

## Requirements

You will need the following tools to build the project:

- Node.js
- npm (Node Package Manager)

## Steps

1. Navigate to the project directory.

2. Install the required packages:
    ```sh
    npm install
    ```

3. Build the project:
    ```sh
    npm run build
    ```

4. If you are using VS Code, you can use the shortcut `Ctrl + Shift + B` to build the project.

## package.json

Important scripts in the `package.json` file:

```json
{
  "scripts": {
    "start": "start http://localhost:7007 & nodemon start.js --ext *",
    "build": "node index.js",
  }
}
```

- `build`: Builds the project using Node.js.
- `start`: Starts the development server and opens the project in the browser.