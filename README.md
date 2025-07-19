# Elite Talent Agency

![App Preview](https://imgix.cosmicjs.com/b432bc60-645f-11f0-a051-23c10f41277a-photo-1438761681033-6461ffad8d80-1752902263067.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern modeling agency website built with Next.js 15 and Cosmic CMS, showcasing professional models, photographers, and designers with comprehensive portfolio galleries and contact information.

## Features

- **Talent Showcase** - Professional profiles for models, photographers, and designers
- **Portfolio Galleries** - High-resolution image galleries with optimized loading
- **Advanced Filtering** - Filter talent by specialties, experience, and availability
- **Contact Integration** - Direct contact information and booking status
- **Responsive Design** - Mobile-optimized layouts for all devices
- **SEO Optimized** - Dynamic metadata and structured data

## Clone this Bucket

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=687b29ba7e239a53d1483fe8&clone_repository=687b2b887e239a53d1483ffc)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a modeling agency website with models, photographers and designers"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: staging in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Content Management:** [Cosmic](https://www.cosmicjs.com/docs) headless CMS
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** TypeScript
- **Deployment:** Vercel/Netlify ready

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A [Cosmic](https://www.cosmicjs.com) account and bucket

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Start the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Models
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all models with portfolio data
const models = await cosmic.objects
  .find({ type: 'models' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get a single model by slug
const model = await cosmic.objects
  .findOne({ type: 'models', slug: 'model-slug' })
  .depth(1)
```

### Filtering by Specialty
```typescript
// Filter models by specialty
const fashionModels = await cosmic.objects
  .find({ 
    type: 'models',
    'metadata.specialties': { $in: ['Fashion'] }
  })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with your Cosmic bucket's content structure:

- **Models** - Professional model profiles with measurements, specialties, and portfolios
- **Photographers** - Photographer profiles with equipment, styles, and portfolio galleries
- **Designers** - Designer profiles with specialties, experience, and creative portfolios

Content is fetched server-side for optimal performance and SEO, with proper error handling for empty states.

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to [Vercel](https://vercel.com)
2. Add environment variables in your Vercel dashboard
3. Deploy automatically on every push to main

### Netlify
1. Connect your repository to [Netlify](https://netlify.com)
2. Add environment variables in your Netlify dashboard
3. Set build command: `bun run build`
4. Set publish directory: `.next`

### Environment Variables
Set these in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
<!-- README_END -->