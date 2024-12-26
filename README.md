# GoAirways Frontend
![Sin título-2024-11-22-1530](https://github.com/user-attachments/assets/ec2a0a96-a6b9-4dc4-bc90-745f19b9bcf2)

## Overview

GoAirways is a sophisticated frontend project built with **Vue.js** and **Nuxt.js**, designed to provide a seamless and dynamic user experience for an airline management platform. This frontend serves as a gateway to the backend, leveraging Nuxt.js server capabilities and implementing modern tools for state management, routing, and enhanced user interactions.

This project its part of a FullStack project with a backend build in Go:&#x20;

## Security
![Sin título-2024-11-22-1530](https://github.com/user-attachments/assets/794bac3b-7b99-4f32-9616-f33a7f477526)

I implemented my own security system using two-factor authentication. First, introduce CARD ID and Passwords communicate directly with the backend written in Go to send an email containing a unique PIN that expires after 2 minutes. Once the PIN is validated on a server built with Nuxt, I create a JWT, attach it to an HTTP-only cookie, and send it to the entire app. From this point onwards, every request goes through a gateway in the Nuxt server, which validates the token's integrity (valid for 1 hour) and checks aspects like user roles, etc. If valid, it redirects the response to the Go backend,  there more checks are maded and finally updating general states and loading the UI.

## Key Features

* **Dynamic Routing**: Utilizes Nuxt.js dynamic routing to create personalized and flexible user experiences.
* **State Management**: Implements **Pinia** for robust and efficient state management.
* **Map Integration**: Leverages **Mapbox** for interactive maps and location-based features.
* **Data Grids**: Employs **Ag-Grid Vue** for powerful and customizable data tables.
* **Notifications**: Uses **Vue Toastification** for elegant and responsive notifications.
* **Date Management**: Incorporates **Luxon** for advanced date and time formatting.
* **SSR and Security**: Provides server-side rendering (SSR) with a security layer that includes HttpOnly cookies for authentication.
* **Microservices Support**: Integrates **Nuxt Server** and **Express.js** to connect internal microservices seamlessly.

## Technology Stack

* **Framework**: Vue.js with Nuxt.js
* **State Management**: Pinia
* **Mapping**: Mapbox
* **Data Grids**: Ag-Grid Vue
* **Notifications**: Vue Toastification
* **Date Handling**: Luxon
* **Server**: Nuxt Server and Express.js

## Application Structure

The application includes multiple pages and routes:

### Pages and Routes

1. **Login**
   * User authentication with JWT and HttpOnly cookies.
   * Supports two-factor authentication (2FA).
2. **Route Creator**
   * Enables creation of airline routes dynamically using Mapbox.
3. **Route Approval**
   * Admin interface for approving or rejecting airline routes.
4. **Plane Registry**
   * Interface for registering new planes.
5. **Hub Administration**
   * Admin tools for managing airport hubs.
6. **Plane (Dynamic)**
   * Dynamic pages for viewing and managing specific planes, utilizing Nuxt.js’s dynamic routing feature.

## Features in Detail

### Dynamic Routing

* Nuxt.js’s routing system dynamically generates pages for entities like planes or routes.

### State Management with Pinia

* Simplifies state management with a clean and reactive API.
* Centralized store ensures data consistency across components.

### Mapbox Integration

* Interactive and visually appealing maps.
* Real-time data overlay for flight routes, hubs, and planes.

### Ag-Grid Vue

* Efficient and feature-rich data tables.
* Provides filtering, sorting, and pagination capabilities.

### Vue Toastification

* Lightweight and customizable toast notifications for user feedback.
* Ensures alerts are non-intrusive yet highly visible.

### Luxon for Dates

* Advanced date formatting and manipulation.
* Handles timezone conversions seamlessly.

### SSR and Security

* Nuxt.js server capabilities provide server-side rendering for better SEO and faster page loads.
* Security layer with:
  * HttpOnly cookies for authentication.
  * Integration with JWT for secure session management.

### Microservices with Express.js

* Internal microservices connected through Express.js, enabling modular and scalable backend interactions.

## Project Setup

### Prerequisites

* Node.js (>= 16.0)
* npm or yarn

### Installation

1. Clone the repository:
   `git clone `[`https://github.com/your-repo/goairways-frontend.git`](https://github.com/your-repo/goairways-frontend.git)
2. Navigate to the project directory:
   `cd goairways-frontend`
3. Install dependencies:
   npm install
   \# or
   `yarn install`

### Running the Project

#### Development Mode

To start the development server:

npm run dev
\# or
`yarn dev`

#### Production Build

To build the application for production:

npm run build
\# or
`yarn build`

To start the production server:

npm run start
\# or
`yarn start`

### Linting and Formatting

Run ESLint for code linting:

`npm run lint`

Run Prettier for code formatting:

`npm run format`

## Deployment

1. Build the project:
   `npm run build`
2. Deploy the `.output` directory to your hosting provider (e.g., Vercel, AWS, DigitalOcean).

## Future Enhancements

* Integration with real-time WebSocket updates for live flight tracking.
* Multi-language support for broader accessibility.
* Enhanced analytics dashboard for administrators.

## Conclusion

GoAirways frontend is designed to offer a powerful and user-friendly interface for managing airline operations. Its use of modern tools and technologies ensures scalability, performance, and security, making it an ideal choice for dynamic and complex applications.
