# StudyAbroad | Nepali Student Helper

A production-ready website built with Next.js 14 to help Nepali students explore study-abroad options by country and education level.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Credentials & Google OAuth)
- **Deployment**: Docker & Docker Compose

## Features
- **Exploration**: Detailed study-abroad guides for 8+ countries.
- **Level-Based**: Tailored requirements for +2, Bachelor, Master, and PhD.
- **User Accounts**: Save favorites and manage profiles (optional).
- **Contact**: Integrated contact form with database storage.
- **Admin**: Script-based seeding and basic DB access.
- **Production Ready**: Full Docker setup and SEO optimizations.

## Setup Options

### Option A: Lite Setup (No Docker, Easiest for slow laptops)
This is the recommended way if Docker is heavy for your system. It uses a cloud database to offload the work from your laptop.

1.  **Create a free Database**:
    - Go to [Neon.tech](https://neon.tech/) or [Supabase](https://supabase.com/).
    - Create a new project and copy the **PostgreSQL Connection String**.
2.  **Configure Environment**:
    - Rename `.env.example` to `.env`.
    - Paste your connection string into `DATABASE_URL`.
    - Set `NEXTAUTH_SECRET` to any random string.
3.  **Install & Start**:
    ```bash
    npm install
    npx prisma migrate dev
    npx prisma db seed
    npm run dev
    ```

### Option B: Local Setup (Manual)
Use this if you have PostgreSQL installed on your machine directly.

1.  **Configure `.env`**: Update `DATABASE_URL` with your local Postgres credentials.
2.  **Run commands**:
    ```bash
    npm install
    npx prisma migrate dev
    npx prisma db seed
    npm run dev
    ```

### Option C: Docker Setup
Best for production-like testing.
```bash
docker compose up --build
```

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string.
- `NEXTAUTH_SECRET`: Secret for session encryption.
- `NEXTAUTH_URL`: Canonical URL of the site.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: For Google OAuth.
- `ADS_ENABLED`: Set to `true` to enable AdSense placeholders.

## Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project and configure the OAuth consent screen.
3. Create OAuth 2.0 Client IDs.
4. Add `http://localhost:3000/api/auth/callback/google` to Authorized redirect URIs.
5. Copy Client ID and Secret to your `.env` file.

## Project Structure
- `src/app`: Routes and Pages (Next.js App Router).
- `src/components`: UI components (shadcn/ui + custom).
- `src/lib`: Shared utilities (Prisma client, Auth config).
- `prisma`: Database schema and seed script.

## Disclaimer
General guidance for Nepali students. Always verify with official university or embassy sources.
