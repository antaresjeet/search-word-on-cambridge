# Development Guide for Search Word On Cambridge

Welcome to the development guide for the "Search by Selection On Cambridge" extension. This document provides detailed instructions for setting up the development environment, contributing to the project, and building the extension.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js installation
- **Gulp**: Task runner for automating tasks
- **Sass**: CSS preprocessor for writing CSS

## Setting Up the Development Environment

1. **Clone the Repository**

   ```sh
   git clone https://github.com/antaresjeet/search-word-on-cambridge.git
   ```

2. **Navigate to the Project Directory**

   ```sh
   cd search-word-on-cambridge
   ```

3. **Install Dependencies**

   Install the required npm packages:

   ```sh
   npm install
   ```

4. **Build the Project**

   Run the following command to compile Sass, minify JavaScript, and build the extension:

   ```sh
   npm run build
   ```

   This will generate the `extension.zip` and `extension.xpi` file and any other build artifacts in the project directory.

## Development Workflow

### Gulp Tasks

- **Compile Sass**: Converts `.scss` files to `.css`.

  ```sh
  gulp sass
  ```

- **Minify JavaScript**: Minifies JavaScript files.

  ```sh
  gulp minify
  ```

- **Watch for Changes**: Automatically rebuilds files on changes.

  ```sh
  gulp watch
  ```

### Adding Features

1. **Create a New Branch**

   ```sh
   git checkout -b feature-branch-name
   ```

2. **Make Changes**

   Implement your feature or bug fix in the appropriate files.

3. **Test Your Changes**

   Load the unpacked extension in Chrome or Firefox to test locally.

4. **Commit Your Changes**

   ```sh
   git add .
   git commit -m "Add a brief description of your changes"
   ```

5. **Push Your Changes**

   ```sh
   git push origin feature-branch-name
   ```

6. **Create a Pull Request**

   - Go to the GitHub repository.
   - Click **Compare & pull request**.
   - Provide a title and description for your pull request.
   - Click **Create pull request**.

## Building the Extension

### For Chrome

1. Run the build command:

   ```sh
   npm run build
   ```

2. The build artifacts will be created in the project directory. You can load the `extension.zip` file in Chrome.

### For Firefox

1. Run the build command:

   ```sh
   npm run build
   ```

2. The build artifacts will be created in the project directory. You can load the `extension.xpi` file in Firefox.

## Troubleshooting

- **Tooltip Issues**: Ensure you have the latest version of the extension installed and check for any JavaScript errors in the browser console.
- **Build Errors**: Check the build output for errors and ensure all dependencies are correctly installed.

## Contributing

We welcome contributions to improve the extension! Follow the guidelines in the [README.md](README.md) for detailed instructions on how to contribute.

## Contact

If you have any questions or need further assistance, feel free to reach out to us at [antaresjeet@gmail.com](mailto:antaresjeet@gmail.com).
