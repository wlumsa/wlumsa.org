<!-- MSA Banner -->

<p align="center">
  <img src="src/logo.png" width="140" />
</p>

<h1 align="center">
  <strong>Wilfrid Laurier University MSA</strong>
</h1>

<p align="center">
  <em><span style="color:#CCCCCC;">Empowering students through faith, community, and service.</span></em>
</p>

<p align="center">
  <a href="https://wlumsa.org">
    <img src="https://img.shields.io/badge/Website-wlumsa.org-0A66C2?style=for-the-badge&logo=Google%20Chrome&logoColor=white" />
  </a>
  <a href="https://www.instagram.com/wlumsa/">
    <img src="https://img.shields.io/badge/Instagram-@wlumsa-E4405F?style=for-the-badge&logo=instagram&logoColor=white" />
  </a>
  <a href="mailto:msa@wlu.ca">
    <img src="https://img.shields.io/badge/Email-msa@wlu.ca-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
</p>


---

# WLU Muslim Student's Association Website

This project is the official website for Laurier's Muslim Student Association. It was developed to serve the Muslim community at Wilfrid Laurier University by the permission of Allah.

## Features

### Core
- Prayer timings and Jummah information
- Blog with categories and search
- Student resources
- Halal food directory (restaurants and grocery stores)
- Forms and event registration
- Media recordings (halaqah, khutbah, guest speakers)
- Responsive design with dark mode support
- SEO configuration
- Newsletter subscription
- Instagram feed integration

### Optional / Disabled
- Stripe payments (used for events or products when enabled)
- Roommate service (currently disabled)


## Tech Stack

[![Technologies](https://skillicons.dev/icons?i=nextjs,typescript,tailwind,react,postgres,supabase,aws)](https://skillicons.dev)

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Payload CMS 3.x
- **Database**: PostgreSQL (via Supabase)
- **Storage**: S3-compatible storage (via Supabase)
- **Authentication**: Supabase Auth
- **Payments**: Stripe (optional)
- **Email**: Resend
- **Package Manager**: pnpm
- **Node**: >=22.x (required)

## Getting Started

**Prerequisites:** Node.js 22.x or higher (React 19 and Next.js 16 require it)

1. Clone the repo
```bash
git clone https://github.com/wlumsa/wlumsa.org.git
```

2. Install dependencies
```bash
pnpm install
```

3. Copy the example env file and fill it in
```bash
cp .env.example .env
```
You'll need database and Supabase keys to get started. Stripe and S3 keys are only needed if you're working on payments or file uploads.

4. Run the dev server
```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Environment Variables

**Database & Auth** (required)
- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Secret key for Payload CMS
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

**Storage** (required for file uploads)
- `S3_BUCKET` - S3 bucket name
- `S3_ACCESS_KEY_ID` - S3 access key
- `S3_SECRET_ACCESS_KEY` - S3 secret key
- `S3_REGION` - S3 region
- `S3_ENDPOINT` - S3 endpoint
- `NEXT_PUBLIC_S3_BUCKET` - Public S3 bucket name

**Payments** (optional - only if working on Stripe features)
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOKS_ENDPOINT_SECRET` - Stripe webhook secret

**Email** (required)
- `RESEND_API_KEY` - Resend API key for sending emails

**Analytics** (optional)
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog analytics key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL (defaults to us.i.posthog.com)
- `NEXT_PUBLIC_MEASUREMENT_ID` - Google Analytics measurement ID

**Other** (optional)
- `NEXT_PUBLIC_SERVER_URL` - Server URL for API calls

**Legacy** (still in env schema but not used)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Old Clerk keys (we switched to Supabase auth)
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - Clerk sign-in URL (legacy)
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - Clerk sign-up URL (legacy)
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` - Clerk redirect URL (legacy)
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - Clerk redirect URL (legacy)


## Content Management

Content is managed through Payload CMS. Admins log in at `/admin` to edit:

- Pages and blog posts
- Events and registration forms
- Media uploads (recordings, images)
- Prayer timings and Jummah info
- Resources and services
- Newsletter subscriptions

## Project Structure

```text
src/
├── app/             # Next.js app directory (routes and pages)
├── blocks/          # Payload CMS content blocks
├── collections/     # Payload CMS collections (posts, events, etc.)
├── components/      # Shared React components
├── globals/         # Payload global configs (navbar, footer)
├── lib/             # Utilities and helpers
├── migrations/      # Payload database migrations
├── plugins/         # Payload CMS plugins
├── styles/          # Global styles
└── Utils/           # Server and client utilities
```

## Authors and Acknowledgements

### Contributors
![avatar](https://images.weserv.nl/?url=https://github.com/Syed-Ahmed02.png?v=4&h=100&w=100fit=cover&mask=circle) ![avatar](https://images.weserv.nl/?url=https://github.com/rzlm.png?v=4&h=100&w=100fit=cover&mask=circle) ![avatar](https://images.weserv.nl/?url=https://github.com/MarufHossain14.png?v=4&h=100&w=100fit=cover&mask=circle)
### Special Thanks
Thanks to the executive teams of the Laurier Muslim Students Association in the 2023-2025 school year for facilitating the project and providing valuable feedback.

## Contact Information
If you would like to reach out to us, feel free to contact us using the form on our [resources page](https://www.wlumsa.org/resources).
