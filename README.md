# WLU Muslim Student's Association Website

This project is the official website for Laurier's Muslim Student Association. It was developed to serve the Muslim community at Wilfrid Laurier University by the permission of Allah.

## Features

- 🕌 Prayer timings and Jummah information
- 📚 Blog with categories and search functionality
- 🎓 Resources for students
- 🏠 Roommate service for housing
- 🍽️ Halal food directory
- 📝 Forms and event registration
- 🎥 Media recordings (Halaqah, Khutbah, Guest Speakers)
- 📱 Responsive design with dark mode support
- 🔍 SEO optimized
- 🔐 User authentication with Clerk
- 💳 Payment processing with Stripe
- 📧 Newsletter subscription
- 📸 Instagram feed integration

## Tech Stack

[![Technologies](https://skillicons.dev/icons?i=nextjs,typescript,tailwind,react,postgres,supabase,aws)](https://skillicons.dev)

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Payload CMS
- **Database**: PostgreSQL (via Supabase)
- **Storage**: S3-compatible storage (via Supabase)
- **Authentication**: Clerk
- **Payments**: Stripe
- **Email**: Resend
- **Package Manager**: pnpm

## Getting Started

1. Clone this repository to your local machine
```bash
git clone <repository-url>
```

2. Install dependencies using pnpm
```bash
pnpm install
```

3. Set up your environment variables
```bash
cp .env.example .env
```
Fill in the required environment variables in the `.env` file.

4. Start the development server
```bash
pnpm dev
```

The website should now be accessible at `http://localhost:3000` in your web browser.

## Environment Variables

Required environment variables:
- `DATABASE_URI`: PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `S3_BUCKET`: S3 bucket name
- `S3_ACCESS_KEY_ID`: S3 access key
- `S3_SECRET_ACCESS_KEY`: S3 secret key
- `S3_REGION`: S3 region
- `S3_ENDPOINT`: S3 endpoint
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOKS_ENDPOINT_SECRET`: Stripe webhook secret
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `CLERK_SECRET_KEY`: Clerk secret key

## Project Structure

```
src/
├── app/              # Next.js app directory
├── blocks/          # Payload CMS blocks
├── collections/     # Payload CMS collections
├── components/      # React components
├── globals/         # Global configurations
├── lib/            # Utility functions
├── plugins/        # Payload CMS plugins
├── redux/          # State management
├── styles/         # Global styles
└── Utils/          # Helper functions
```

## Authors and Acknowledgements

### Contributors
![avatar](https://images.weserv.nl/?url=https://github.com/Syed-Ahmed02.png?v=4&h=100&w=100fit=cover&mask=circle) ![avatar](https://images.weserv.nl/?url=https://github.com/UsamaMo.png?v=4&h=100&w=100fit=cover&mask=circle) ![avatar](https://images.weserv.nl/?url=https://github.com/CoderMF.png?v=4&h=100&w=100fit=cover&mask=circle) ![avatar](https://images.weserv.nl/?url=https://github.com/mxsaad.png?v=4&h=100&w=100fit=cover&mask=circle) ![avatar](https://images.weserv.nl/?url=https://github.com/WaleedAAA.png?v=4&h=100&w=100fit=cover&mask=circle) ![avatar](https://images.weserv.nl/?url==https://github.com/rzlm.png?v=4&h=100&w=100fit=cover&mask=circle)

### Special Thanks
Thanks to the executive teams of the Laurier Muslim Students Association in the 2023-2025 school year for facilitating the project and providing valuable feedback.

## Contact Information
If you would like to reach out to us, feel free to contact us using the form on our [resources page](https://www.wlumsa.org/resources).
