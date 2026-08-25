# Dazz Tradelink Corporate Website

## Project Description
A modern corporate website for Dazz Tradelink, featuring comprehensive company information, division details (Construction, Food Trading, Logistics, Hospitality), project galleries, news/blogs, and a contact system. It includes a bespoke Admin Content Management System (CMS) to manage all website content seamlessly.

## Tech Stack
**Frontend:** React, TypeScript, Vite, React Router, Tailwind CSS, Axios, React Hook Form, Zod
**Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt, Zod
**Storage:** Cloudinary

## Branch Strategy
- `main`: Production branch. Never directly develop features here.
- `dev`: Development/integration branch. All completed features eventually merge here.
- `feature/<feature-name>`: For implementing new features.
- `fix/<bug-name>`: For fixing bugs.

## Git Workflow
1. Create a feature branch from `dev` (`git checkout -b feature/name`).
2. Implement the feature.
3. Test thoroughly.
4. Commit changes with clear conventional commit messages.
5. Merge the feature branch into `dev`.
6. Push `dev` to GitHub.
7. Do NOT merge into `main` unless explicitly instructed.

## Local Setup
1. Clone the repository.
2. Install dependencies for both frontend and backend (`npm install`).
3. Set up environment variables (copy `.env.example` to `.env`).
4. Run development servers (e.g., `npm run dev` for both frontend and backend).

## Environment Variables
(See `.env.example` when available for a full list of required variables for backend and frontend.)

## Development Workflow
- Follow the Git Workflow.
- Every meaningful change must be committed.
- Keep `.env.example` files tracked.
- Ensure build artifacts and `.env` files are ignored via `.gitignore`.
