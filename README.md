# Claude Travel Hub

A modern travel marketplace with tour booking, search, and Claude AI-powered travel recommendations. Built with Next.js 15, React 19, Supabase, and the Anthropic Claude API.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fquantnexusai%2Fclaude-travel-hub&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,ANTHROPIC_API_KEY&envDescription=Get%20keys%20from%20Supabase%20and%20Anthropic&envLink=https%3A%2F%2Fgithub.com%2Fquantnexusai%2Fclaude-travel-hub%23environment-variables&project-name=claude-travel-hub&repository-name=claude-travel-hub)

## Features

- **Tour Browsing & Search** - Browse tours by category, price, destination with advanced filtering
- **Tour Details** - Full tour information with booking capabilities
- **Shopping Cart** - Add tours to cart with traveler count management
- **User Dashboard** - View bookings, saved tours, and travel history
- **Claude AI Assistant** - Get personalized travel recommendations powered by Claude
- **Authentication** - Secure user authentication with Supabase
- **Demo Mode** - Works immediately without any API keys configured
- **Responsive Design** - Beautiful UI that works on all devices
- **Travel News** - Stay updated with travel tips and destination guides

## Quick Start

### 1. Deploy to Vercel (Recommended)

Click the "Deploy with Vercel" button above. The app will work immediately in demo mode with sample data.

### 2. Configure Environment Variables (Optional)

To enable full functionality, add these environment variables in your Vercel project settings:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | For auth & database |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your Supabase publishable key | For auth & database |
| `ANTHROPIC_API_KEY` | Your Anthropic API key | For Claude AI features |

### 3. Set Up Supabase (Optional)

If you want to use real authentication and database:

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run the schema from `supabase/schema.sql`
4. Copy your project URL and publishable key to Vercel environment variables
5. Redeploy your application

## Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

**Note:** The app runs in demo mode when environment variables are not configured.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **AI**: Anthropic Claude API
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

```
claude-travel-hub/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── api/claude/      # Claude AI API route
│   │   ├── tours/           # Tour listing and detail pages
│   │   ├── news/            # Travel news pages
│   │   ├── assistant/       # Claude AI chat interface
│   │   ├── dashboard/       # User dashboard
│   │   ├── cart/            # Shopping cart
│   │   └── ...
│   ├── components/          # Reusable React components
│   └── lib/                 # Utilities and configurations
│       ├── supabase.ts      # Supabase client
│       ├── auth-context.tsx # Auth provider
│       ├── types.ts         # TypeScript types
│       └── demo-data.ts     # Demo mode data
├── supabase/
│   └── schema.sql          # Database schema
└── public/                  # Static assets
```

## Demo Mode

When no Supabase credentials are configured, the app automatically runs in demo mode with:

- Sample tour data (8 featured destinations)
- Demo user authentication
- Simulated bookings and cart
- Claude AI demo responses

This allows users to explore all features immediately after deployment.

## Local Development

See [CONTRIBUTING.md](./CONTRIBUTING.md) for local development instructions.

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Links

- [Live Demo](https://claude-travel-hub.vercel.app)
- [GitHub Repository](https://github.com/quantnexusai/claude-travel-hub)
- [Supabase Documentation](https://supabase.com/docs)
- [Claude API Documentation](https://docs.anthropic.com)
