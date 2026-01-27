# Contributing to Claude Travel Hub

Thank you for your interest in contributing! This guide will help you set up the project for local development.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/quantnexusai/claude-travel-hub.git
cd claude-travel-hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

For development, you can leave the environment variables empty to use demo mode, or configure them for full functionality:

```env
# Supabase (optional - leave empty for demo mode)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Anthropic API (optional - leave empty for demo mode)
ANTHROPIC_API_KEY=
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Setting Up Supabase (Optional)

For full database and authentication features:

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be provisioned

### 2. Run Database Schema

1. Go to SQL Editor in your Supabase dashboard
2. Copy the contents of `supabase/schema.sql`
3. Run the SQL to create all tables and policies

### 3. Configure Environment

Update your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Configure Auth Settings

In your Supabase dashboard:

1. Go to Authentication > URL Configuration
2. Set Site URL to `http://localhost:3000`
3. Add `http://localhost:3000/*` to Redirect URLs

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── tours/             # Tour pages
│   ├── news/              # News pages
│   ├── assistant/         # Claude AI chat
│   ├── dashboard/         # User dashboard
│   └── ...
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── TourCard.tsx
│   └── ...
└── lib/                   # Utilities
    ├── supabase.ts       # Supabase client
    ├── auth-context.tsx  # Auth context
    ├── types.ts          # TypeScript types
    └── demo-data.ts      # Demo data
```

## Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## Code Style

- Use TypeScript for all new files
- Follow the existing code patterns
- Use Tailwind CSS for styling
- Keep components focused and reusable

## Making Changes

1. Create a new branch for your feature
2. Make your changes
3. Test in demo mode and with Supabase if applicable
4. Submit a pull request

## Demo Mode

The app automatically runs in demo mode when Supabase credentials are not configured. This is useful for:

- Quick testing
- UI development
- Feature prototyping

Demo mode provides:
- Sample tour data
- Mock authentication
- Simulated Claude AI responses

## Need Help?

- Check existing issues on GitHub
- Open a new issue for bugs or feature requests
- Review the README for deployment instructions
