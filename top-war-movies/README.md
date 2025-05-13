# Top War Movies – Angular Frontend

Welcome to **Top War Movies**, a modern Angular application for browsing, creating, updating, and managing war movies. The project is built with scalability, maintainability and security in mind, featuring modular code, service-based architecture, component-driven design, reactive programming with RxJS, route guards, HTTP interceptors and robust form validation.

---

## Design Prototype

You can view the original Figma design that this application is based on here:  
[Figma Design](https://www.figma.com/design/bLyQsQCxO0enh9VCiEwdFm/U06---DOM-BOM-frontend?node-id=0-1&p=f&t=sOASdG0qOyf99yPX-0)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Core Models](#core-models)
- [Key Services](#key-services)
- [Routing & Security](#routing--security)
- [Main Pages & Components](#main-pages--components)
- [Quick Start for New Developers](#quick-start-for-new-developers)
- [Extending the Project](#extending-the-project)
- [Contact](#contact)

---

## Features

- **Browse Movies**: View a card list of top war movies with images and summaries.
- **Movie Details**: See detailed information, including cast, director, ratings, and media.
- **Authentication**: Secure login, registration, and admin role handling using JWT.
- **Admin CRUD**: Admin users can create, update, and delete movies.
- **Route Guards**: Protects routes for authenticated users and admins.
- **HTTP Interceptor**: Automatically attaches JWT tokens to API requests.
- **Form Validation**: Robust client-side validation for movie forms.
- **Safe Media Embedding**: Uses a custom pipe to safely embed trailers.
- **Responsive UI**: Works seamlessly on desktop and mobile devices.
- **Error Handling**: User-friendly error messages and loading indicators.

---

## Tech Stack

- **Angular** ^19.2.0
- **TypeScript** ~5.7.2
- **RxJS** ~7.8.0
- **Karma & Jasmine** (Unit Testing)
- **REST API** (Backend, not included)
- **JWT** (Authentication)

---

## Installation

1. **Clone the repository**

git clone https://github.com/chas-academy/u08-angular-frontend-ViktorTheVariable.git<br>
cd top-war-movies

2. **Install dependencies**

npm install

---

## Running the Project

Start the development server:<br>
npm start or ng serve

The app will be available at [http://localhost:4200](http://localhost:4200).

---

## Project Structure

src/<br>
│<br>
├── app/<br>
│ ├── components/<br>
│ │ ├── card/<br>
│ │ ├── create-movie/<br>
│ │ ├── footer/<br>
│ │ ├── header/<br>
│ │ ├── home/<br>
│ │ ├── input-field/<br>
│ │ ├── layout/<br>
│ │ ├── login-register/<br>
│ │ ├── movie-details/<br>
│ │ ├── textarea-field/<br>
│ │ ├── update-movie/<br>
│ ├── guards/<br>
│ │ └── admin.guard.ts<br>
│ │ └── auth.guard.ts<br>
│ ├── interceptors/<br>
│ │ └── auth.interceptor.ts<br>
│ ├── models/<br>
│ │ ├── movie-details.model.ts<br>
│ │ └── movie-card.model.ts<br>
│ ├── pipes/<br>
│ │ └── safe-url.pipe.ts<br>
│ ├── services/<br>
│ │ ├── movie.service.ts<br>
│ │ ├── auth.service.ts<br>
│ │ └── movie-validation.service.ts<br>
│ └── app.component.ts<br>
├── environments/<br>
│ └── environment.development.ts<br>
│ └── environment.ts<br>
├── index.html<br>
├── main.ts<br>
├── styles.scss<br>
└── ...


---

## Core Models

- **MovieDetails**
  - Complete movie info: title, plot, releaseYear, director, writers, actors, length, warType, imdbRating (user & expert), language, country, media (image & trailer).
- **MovieCard**
  - Used for movie lists: title, plot, user rating, image.

---

## Key Services

- **MovieService**
  - Handles all movie-related API calls (list, details, create, update, delete).
- **AuthService**
  - Manages authentication, token storage, admin checks, login/logout/register.
- **MovieValidationService**
  - Validates movie form input before submission.

---

## Routing & Security

- **Routing** (`app.routes.ts`)
  - Uses a layout component with child routes for home, movie details, create/update movie, and login/register.
  - Route guards protect sensitive routes:
    - `AuthGuard`: Ensures only authenticated users can view movie details.
    - `AdminGuard`: Restricts create/update/delete operations to admin users.

- **HTTP Interceptor** (`interceptors/auth.interceptor.ts`)
  - Automatically attaches the JWT token to all outgoing HTTP requests for secure API communication.

- **SafeUrl Pipe** (`pipes/safe-url.pipe.ts`)
  - Safely embeds external resources like trailers in the application.

---

## Main Pages & Components

- **HomeComponent**
  - Displays all movies as cards. Admins see a "Create Movie" button.
- **MovieDetailsComponent**
  - Shows detailed info for a single movie. Admins can update or delete the movie.
- **CreateMovieComponent**
  - Form for admins to add a new movie. Includes validation and feedback.
- **UpdateMovieComponent**
  - Form for admins to edit an existing movie. Pre-fills fields, validates input.
- **LoginRegisterComponent**
  - Handles user authentication and registration using Angular’s Reactive Forms.
  - Features:
    - Separate login and registration forms with validation.
    - Displays error messages.
    - Navigates users after successful login or registration.
- **CardComponent**
  - Displays a movie summary for use on the home page.
- **LayoutComponent**
  - Includes header and footer, ensuring a consistent layout and navigation for all pages.

---

## Quick Start for New Developers

1. **Understand the Data Models**
   - Start with `src/app/models/movie-details.model.ts` and `movie-card.model.ts`.

2. **Explore the Services**
   - Check `movie.service.ts` and `auth.service.ts` in `src/app/services/` to see how data is fetched and managed.

3. **Review Routing and Guards**
   - Look at `app.routes.ts`, `guards/`, and `interceptors/` to understand navigation and security.

4. **Review Key Components**
   - Explore `components/` for main UI logic and form handling.

5. **Add New Features**
   - Generate a new component:
     ```
     ng generate component components/your-new-component
     ```
   - Use services for data access and add routes in `app.routes.ts` for new pages.

6. **Test Your Changes**
   - Run unit tests:
     ```
     npm test or ng test
     ```
   - Start the app and verify your feature in the browser.
---

## Extending the Project


  - Build an admin dashboard to list all users.
  - Allow admins to delete non-admin users.
  - Display user details such as username, registration date, and admin status.
  - Create a profile page where users/admin can view their information liek username, registration date, and admin status.
  - Improve error handling based on backend responses.
  - Handle JWT token expiration and automatically log users out when needed.
  - Add a simple frontend filtering and search for movies with GET /warmovies/ endpoint.
  - Write additional tests for components.

---

## Contact

For questions or suggestions, please contact the project owner or open an issue in the repository.

---

Happy coding! 🚀

