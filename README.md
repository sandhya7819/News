# News5 - Next.js News Website

A modern, responsive news website built with Next.js 14, TypeScript, and Tailwind CSS. This is a complete clone of the News5 HTML template, rebuilt with modern React and Next.js.

## Features

- 🎨 Modern UI/UX Design
- 🌙 Dark Mode Support (with persistence)
- 📱 Fully Responsive (Mobile-first approach)
- 🛒 E-commerce Integration (Shop, Cart, Checkout)
- 📝 Blog System (List, Detail, Category pages)
- 🔐 User Authentication (Sign In, Sign Up, Reset Password)
- 🔍 Search Functionality
- 📧 Newsletter Subscription
- 🏷️ Category Filtering
- ⚡ Fast Performance (Next.js 14 App Router)
- 🎯 SEO Optimized
- ♿ Accessible Design

## Pages & Routes

### Main Pages
- `/` - Homepage with hero, trending, latest, and category sections
- `/latest` - Latest news articles
- `/trending` - Trending articles sorted by views
- `/blog` - Blog listing page
- `/article/[id]` - Article detail page with related articles

### Category Pages
- `/category/[slug]` - Category-specific articles

### Shop Pages
- `/shop` - Product listing
- `/shop/product/[id]` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout page

### Authentication
- `/sign-in` - Login page
- `/sign-up` - Registration page
- `/reset-password` - Password reset

### Utility Pages
- `/faq` - Frequently Asked Questions
- `/terms` - Terms of Use
- `/privacy` - Privacy Policy
- `/404` - Not Found page

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── article/[id]/       # Article detail pages
│   ├── blog/              # Blog listing
│   ├── category/[slug]/   # Category pages
│   ├── shop/              # E-commerce pages
│   ├── sign-in/           # Authentication pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── articles/          # Article components
│   ├── cart/              # Shopping cart components
│   ├── layout/            # Header & Footer
│   ├── products/          # Product components
│   ├── providers/         # Context providers
│   ├── sections/          # Page sections
│   └── ui/                # UI components
├── lib/                   # Utilities and data
│   └── data.ts            # Sample data
├── public/                # Static assets
├── types/                 # TypeScript type definitions
└── tailwind.config.ts     # Tailwind configuration
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image Component
- **State Management:** React Context (for theme)

## Key Components

### Layout Components
- `Header` - Navigation bar with search, cart, and user menu
- `Footer` - Footer with links and newsletter signup
- `ThemeProvider` - Dark mode context provider

### Article Components
- `ArticleCard` - Reusable article card with variants
- `ArticleList` - Grid layout for articles
- `HeroSection` - Featured article hero section
- `TrendingSection` - Trending articles section
- `LatestSection` - Latest articles section
- `CategorySection` - Category-specific sections

### Shop Components
- `ProductCard` - Product display card
- `CartDropdown` - Shopping cart dropdown

### Features

- **Dark Mode:** Toggle between light and dark themes with localStorage persistence
- **Responsive Design:** Mobile-first approach with breakpoints for all devices
- **Image Optimization:** Next.js Image component for optimized loading
- **SEO:** Proper meta tags and semantic HTML
- **Accessibility:** ARIA labels and keyboard navigation support

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme.

### Content
Modify `lib/data.ts` to add/edit articles, products, and categories.

### Styling
Global styles are in `app/globals.css`. Component-specific styles use Tailwind classes.

## License

This project is for educational purposes. The original News5 template design is from ThemeWant.

## Contributing

Feel free to submit issues and enhancement requests!

