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

## Deployment on Vercel

This project is configured for deployment on Vercel as a monorepo.

1. **Environment Variables:**
   Copy `.env.example` to `.env` and fill in your values. In Vercel dashboard, add these environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`

2. **Deploy:**
   - Connect your GitHub repo to Vercel.
   - Vercel will detect the monorepo and deploy three projects: `frontend`, `panel`, and `api`.
   - The API will be serverless functions under `/api`.
   - Frontend at root domain.
   - Panel can be accessed via the panel project URL or configured subdomain.

## Technologies Used

- **Backend:** Node.js, Express.js (converted to Vercel serverless functions)
- **Frontend:** React, CSS
- **Panel:** Vite, React, Tailwind CSS
- **Authentication:** Context API for state management
- **Database:** MongoDB
- **Deployment:** Vercel

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.