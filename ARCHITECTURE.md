# Dazz Tradelink Architecture Document

## Frontend Structure
The frontend is a Single Page Application (SPA) built with React and Vite. 
- **Framework:** React + TypeScript
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **State Management / Data Fetching:** React state/context + Axios for API communication
- **Form Handling:** React Hook Form + Zod for validation

Pages include Homepage, About Us, Divisions & Services (Construction, Food Trading, Logistics, Hospitality), Project Gallery, News & Blog, Careers & Contact Us. 
Layouts will be built with reusable React components, and data will be driven dynamically from the backend.

## Backend Structure
The backend provides a robust RESTful API built with Node.js and Express.
- **Framework:** Express + TypeScript
- **Validation:** Zod
- **Authentication:** JWT & bcrypt for secure admin access
- **Architecture:** Modular MVC (Model-View-Controller) pattern with routes, controllers, and services.

## Database Models
Using MongoDB with Mongoose, the following models are anticipated:
- **AdminUser:** For CMS authentication.
- **PageContent:** Dynamic content blocks for various pages (Homepage, About, Divisions, etc.).
- **Project:** For the Project Gallery management.
- **BlogPost:** For News & Blog management.
- **JobPosting:** For Careers section.
- **ContactMessage:** Storing inbound contact/inquiry forms.
- **GlobalSettings:** For site-wide settings (contact email, social links, etc.).

## API Structure
- `POST /api/auth/login` - Admin login
- `GET/PUT /api/content/:page` - Fetch/update page-specific content
- `CRUD /api/projects` - Project management
- `CRUD /api/blogs` - Blog management
- `CRUD /api/jobs` - Job posting management
- `POST /api/contact` - Submit contact forms
- `GET /api/contact` - View contact messages (Admin)

## Admin Structure
A custom React-based Admin Dashboard will be integrated into the frontend (under an `/admin` route or separate app), protected by JWT authentication.
It will include content editors for all dynamic pages, as well as management interfaces for projects, blogs, jobs, and contact messages. 
**Note:** The Admin CMS controls content only. Layouts are fixed React components.

## Cloudinary Structure
Cloudinary will be used to store and serve all media assets (images, PDFs, etc.).
- Folders will be organized logically: `/dazz/projects`, `/dazz/blogs`, `/dazz/pages`, etc.
- Uploads will be handled via the Node.js backend.
