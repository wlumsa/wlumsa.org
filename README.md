<div align="center">
  <a href="https://wlumsa.org">
    <img src="src/logo.png" alt="Laurier Muslim Students' Association" width="112" />
  </a>

  <h1>Laurier Muslim Students' Association</h1>

  <p>
    The digital home of the Muslim community at Wilfrid Laurier University.
  </p>

  <p>
    <a href="https://wlumsa.org"><strong>Visit the website</strong></a>
    &nbsp;&middot;&nbsp;
    <a href="https://www.instagram.com/wlumsa/">Instagram</a>
    &nbsp;&middot;&nbsp;
    <a href="mailto:wlumsa.admin@gmail.com">Contact</a>
  </p>

  <p>
    <a href="https://github.com/wlumsa/wlumsa.org/actions/workflows/check.yml"><img src="https://github.com/wlumsa/wlumsa.org/actions/workflows/check.yml/badge.svg" alt="Check status" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-1f6f5c" alt="MIT License" /></a>
    <img src="https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white" alt="Node.js 22" />
    <img src="https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white" alt="pnpm 10" />
  </p>
</div>

---

## About

This repository powers [wlumsa.org](https://wlumsa.org), the official website of the Laurier Muslim Students' Association. It brings events, prayer information, student resources, community services, and MSA content into one accessible platform.

### What it supports

- Events, registrations, forms, and event-planning workflows
- Prayer times, Jummah details, prayer spaces, and Ramadan resources
- Blog posts, recordings, newsletters, and daily reminders
- Student resources, housing information, and halal food directories
- A role-aware admin workspace for content and operations
- Responsive design, dark mode, analytics, and search-engine metadata

## Platform

| Area                   | Technology                                           |
| ---------------------- | ---------------------------------------------------- |
| Web application        | Next.js 16, React 19, TypeScript                     |
| Content management     | Payload CMS 3                                        |
| Styling                | Tailwind CSS, DaisyUI                                |
| Data and storage       | PostgreSQL, Supabase, S3-compatible storage          |
| Email and forms        | Resend, React Email, Payload Form Builder            |
| Payments               | Stripe (optional)                                    |
| Hosting and monitoring | Vercel Analytics, Speed Insights, PostHog (optional) |
| Quality                | ESLint, Prettier, Knip, Node test runner, Playwright |

The public Next.js application and Payload admin panel share one codebase. Payload owns structured content and admin authentication, PostgreSQL stores application data, and S3-compatible storage serves uploaded media.

## Getting started

### Prerequisites

- [Node.js 22](https://nodejs.org/) — pinned in `.nvmrc`
- [pnpm 10.14](https://pnpm.io/) — pinned in `package.json`
- Access to the project's PostgreSQL, Supabase, storage, email, and Google Sheets credentials

### Local setup

```bash
git clone https://github.com/wlumsa/wlumsa.org.git
cd wlumsa.org
nvm use
pnpm install
```

Create `.env.local` and add the configuration described below. Credentials are not committed; request development values from a project maintainer.

Prepare the database, then start the application:

```bash
pnpm exec payload migrate
pnpm dev
```

The site runs at [localhost:3000](http://localhost:3000), with the Payload admin panel at [localhost:3000/admin](http://localhost:3000/admin).

## Configuration

Environment variables are validated in `src/env.mjs`. The application needs these values for a complete local environment:

| Service              | Variables                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Application          | `DATABASE_URI`, `PAYLOAD_SECRET`                                                                             |
| Supabase             | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`                                                  |
| Object storage       | `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_REGION`, `S3_ENDPOINT`, `NEXT_PUBLIC_S3_BUCKET` |
| Email                | `RESEND_API_KEY`                                                                                             |
| Google Sheets        | `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEETS_SPREADSHEET_ID`                         |
| Legacy compatibility | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`                                                                          |

Optional integrations:

| Purpose                | Variables                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------- |
| Public application URL | `NEXT_PUBLIC_SERVER_URL`                                                            |
| Newsletter audiences   | `RESEND_AUDIENCE_ID`, `NEXT_PUBLIC_RESEND_AUDIENCE_ID`                              |
| Google Sheets tab      | `GOOGLE_SHEETS_SHEET_NAME`                                                          |
| Stripe payments        | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOKS_ENDPOINT_SECRET`                              |
| Analytics              | `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_MEASUREMENT_ID` |
| Scheduled jobs         | `CRON_SECRET`                                                                       |

> Never commit `.env` files or expose server-side credentials through `NEXT_PUBLIC_` variables.

## Development

| Command               | Purpose                                                           |
| --------------------- | ----------------------------------------------------------------- |
| `pnpm dev`            | Start the local development server                                |
| `pnpm build`          | Create a production build and sitemap                             |
| `pnpm check`          | Run types, linting, dead-code checks, formatting, and smoke tests |
| `pnpm test:e2e`       | Run Playwright tests against the configured application           |
| `pnpm format`         | Format the repository with Prettier                               |
| `pnpm generate:types` | Regenerate Payload collection types                               |
| `pnpm email`          | Preview React Email templates locally                             |

Lefthook installs with the project dependencies. It checks staged files before commits and runs type and smoke tests before pushes. Please run `pnpm check` before opening a pull request.

## Project structure

```text
src/
├── app/          # Public pages, admin routes, and API endpoints
├── blocks/       # Reusable Payload content blocks
├── collections/  # Payload collections and access rules
├── components/   # React UI, forms, and admin components
├── globals/      # Site-wide Payload configuration
├── lib/          # Domain services and shared helpers
├── migrations/   # Versioned database migrations
├── plugins/      # Project-specific Payload integrations
├── styles/       # Global and feature styles
└── Utils/        # Data access and application utilities

public/           # Static files and downloadable resources
tests/            # Smoke and browser-level tests
```

## Content operations

Authorized team members use `/admin` to manage events, blog posts, forms, recordings, prayer information, resources, newsletters, and site navigation. Database changes are versioned in `src/migrations`; production builds run pending migrations before compiling the application.

Vercel also runs scheduled jobs for weekly prayer-time refreshes and event-planning reminders. Public-page Playwright tests run after successful deployments.

## Contributing

1. Create a focused branch from `main`.
2. Make the smallest coherent change and include tests where appropriate.
3. Run `pnpm check` and, for user-facing changes, `pnpm test:e2e`.
4. Open a pull request explaining the problem, the solution, and any operational impact.

For security issues or configuration access, contact the [technology team](mailto:tech.wlumsa@gmail.com) instead of opening a public issue. For general enquiries, email [wlumsa.admin@gmail.com](mailto:wlumsa.admin@gmail.com).

## Acknowledgements

Created with the support of Laurier MSA executive teams and contributors, including [Maruf Hossain](https://github.com/MarufHossain14) and [Syed Ahmed](https://github.com/Syed-Ahmed02).

## License

Released under the [MIT License](LICENSE). Copyright &copy; 2023–2026 WLU MSA.
