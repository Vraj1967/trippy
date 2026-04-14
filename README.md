# Trippy

A full-stack web application featuring a backend API, a React frontend, and an admin panel built with Vite.

## Project Structure

- **Backend/**: Node.js server with Express.js
- **frontend/**: React application for the main user interface
- **panel/**: Admin panel built with Vite and React

## Features

- User authentication and authorization
- Admin dashboard for managing users and contacts
- Responsive design with custom styling
- Modular component architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd trippy
   ```

2. Install dependencies for each module:

   **Backend:**
   ```bash
   cd Backend
   npm install
   ```

   **Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

   **Panel:**
   ```bash
   cd ../panel
   npm install
   ```

### Running the Application

1. **Start the Backend:**
   ```bash
   cd Backend
   npm start
   ```
   The server will run on `http://localhost:3000` (or as configured).

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm start
   ```
   The app will be available at `http://localhost:3000`.

3. **Start the Admin Panel:**
   ```bash
   cd panel
   npm run dev
   ```
   The panel will run on `http://localhost:5173` (default Vite port).

### Building for Production

- **Frontend:** `cd frontend && npm run build`
- **Panel:** `cd panel && npm run build`

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** React, CSS
- **Panel:** Vite, React, Tailwind CSS
- **Authentication:** Context API for state management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.