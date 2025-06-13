# Morgan Fitness App

A fitness platform built with Remix that offers:

- Daily workout videos with video instruction
- Group workout sessions (live and recorded)
- Amazon affiliate product recommendations
- Integrated messaging system
- Subscription-based access

## Features

- **Workout Library**: Access to daily workout videos with detailed instructions
- **Group Sessions**: Join live or pre-recorded group workout sessions
- **Shop**: Curated selection of recommended fitness equipment and supplements
- **Messaging**: Direct communication with trainers
- **Subscription Management**: Secure payment processing with Stripe

## Tech Stack

- **Framework**: Remix
- **UI**: Mantine UI
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Cookie-based sessions
- **File Storage**: AWS S3
- **Payment Processing**: Stripe
- **Real-time Chat**: Socket.IO

## Prerequisites

- Node.js 16+
- PostgreSQL
- AWS Account (for S3)
- Stripe Account

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd morgan-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Update the values with your configuration

4. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret key for session encryption
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `AWS_REGION`: AWS region
- `AWS_BUCKET_NAME`: S3 bucket name

## Development

```bash
# Start development server
npm run dev

# Run type checking
npm run typecheck

# Run linting
npm run lint

# Build for production
npm run build
```

## Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## License

MIT
