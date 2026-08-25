# Dazz Tradelink Architecture Document

## Frontend Structure
The frontend is built with Next.js (App Router), utilizing Server Components by default and Client Components only where browser-side interactivity is required.
- **Framework:** Next.js + TypeScript
- **Routing:** Next.js App Router
- **Styling:** Tailwind CSS
- **State Management / Data Fetching:** Next.js server-side data fetching + Axios for client-side API communication where needed
- **Form Handling:** React Hook Form + Zod for validation
- **SEO & Optimization:** Next.js metadata APIs, `next/image` for image optimization, dynamic metadata, sitemap.ts, and robots.ts

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
A custom React-based Admin Dashboard will be integrated into the frontend using Next.js route groups (under the `/admin` route), protected by JWT authentication. It will utilize Client Components for interactive functionalities.
It will include content editors for all dynamic pages, as well as management interfaces for projects, blogs, jobs, and contact messages. 
**Note:** The Admin CMS controls content only. Layouts are fixed React/Next.js components. The Page model remains database-driven via MongoDB.

## Cloudinary Structure
Cloudinary will be used to store and serve all media assets (images, PDFs, etc.).
- Folders will be organized logically: `/dazz/projects`, `/dazz/blogs`, `/dazz/pages`, etc.
- Uploads will be handled via the Node.js backend.
