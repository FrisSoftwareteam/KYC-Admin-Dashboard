# KYC Admin Dashboard

A comprehensive admin dashboard for managing Know Your Customer (KYC) processes, built with modern React technologies. This application allows administrators to oversee verifications, businesses, partners, agents, transactions, and more.

## Features

- **Dashboard Overview**: Real-time metrics and charts for verifications, businesses, partners, and agents.
- **Verification Management**: View and manage KYC verification requests and details.
- **Business Management**: Add, edit, and view business profiles and details.
- **Partner Management**: Invite, manage, and monitor partners and their agents.
- **User Management**: Administer users and their roles/permissions.
- **Transaction Tracking**: Monitor and filter transactions.
- **Address Verification**: Handle address-related verifications.
- **Settings**: Configure application settings.
- **Real-time Notifications**: Integrated with Ably for real-time updates.
- **Responsive Design**: Built with Chakra UI for a modern, accessible interface.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Chakra UI
- **State Management**: Recoil
- **Data Fetching**: TanStack React Query
- **Routing**: React Router DOM
- **Charts**: ApexCharts and Chart.js
- **Maps**: Google Maps API integration
- **Real-time**: Ably
- **Forms**: Formik with Yup validation
- **Icons**: React Icons
- **Animations**: Framer Motion
- **HTTP Client**: Axios

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (v1.22 or later)
- Backend API server running on `http://localhost:8000/api/v1` (see Backend Setup below)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   cd kyc-admin-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Ensure the backend API is running on `http://localhost:8000/api/v1`. If not, start your backend server.

## Running the Application

1. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

The application will automatically reload when you make changes to the code.

## Backend Setup

This frontend application requires a backend API server to function properly. The backend should provide endpoints for:

- Authentication (login, refresh tokens)
- Metrics and dashboard data
- Verification management
- Business and partner management
- User management
- Transaction data
- File uploads and processing

The API base URL is configured in `src/shared/constants/env.ts`. Ensure your backend server matches this configuration.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code linting
- `npm run format` - Format code with Prettier
- `npm run check-typing` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # Reusable UI components
├── features/            # Feature-based modules (auth, dashboard, etc.)
├── hooks/               # Custom React hooks
├── lib/                 # Third-party library configurations
├── providers/           # React context providers
├── routes/              # Routing configuration
├── shared/              # Shared utilities and constants
├── utils/               # Utility functions
└── assets/              # Static assets (images, icons)
```

## Environment Variables

Create a `.env` file in the root directory if needed. The API base URL is currently hardcoded in `src/shared/constants/env.ts`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
