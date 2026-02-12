# ITOS Website

A modern Next.js website for IT solutions and web development services, built with TypeScript, Tailwind CSS, and Shadcn/ui components.

## 🚀 Features

- ⚡ **Next.js 15.5.9** - Latest React framework with App Router
- 🌍 **Internationalization** - Multi-language support (English & Swedish) with next-intl
- 🎨 **Tailwind CSS v3** - Utility-first CSS framework
- 🧩 **Shadcn/ui** - Beautiful, accessible component library
- 🔐 **NextAuth.js** - Authentication with Google, GitHub, and credentials
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark Mode** - Theme switching with next-themes
- 📝 **Markdown Blog** - Blog system with gray-matter
- 🎭 **Iconify** - Extensive icon library
- ✨ **AOS Animations** - Scroll animations
- 📊 **TypeScript** - Type-safe development
- 💰 **Price Calculator** - Interactive website cost calculator

## 📦 Tech Stack

### Core
- **Framework:** Next.js 15.5.9
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3.4.19
- **UI Components:** Shadcn/ui (Radix UI primitives)

### Libraries
- **Authentication:** NextAuth.js
- **Icons:** Iconify React
- **Animations:** AOS (Animate On Scroll)
- **Date Handling:** date-fns
- **HTTP Client:** Axios
- **Markdown:** gray-matter, remark, rehype
- **Utilities:** clsx, tailwind-merge, class-variance-authority

## 🛠️ Getting Started

### Prerequisites

- Node.js 22.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PtOlga/itos-website.git
   cd itos-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Google OAuth (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # GitHub OAuth (optional)
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
itos-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (site)/            # Main site routes
│   │   │   ├── (auth)/        # Authentication pages
│   │   │   ├── about/         # About page
│   │   │   ├── blog/          # Blog pages
│   │   │   ├── contact/       # Contact page
│   │   │   ├── documentation/ # Documentation
│   │   │   ├── faqs/          # FAQs page
│   │   │   ├── portfolio/     # Portfolio pages
│   │   │   └── pricing/       # Pricing page
│   │   ├── api/               # API routes
│   │   ├── context/           # React contexts
│   │   ├── demo/              # Shadcn/ui demo page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/                # Shadcn/ui components
│   │   ├── Auth/              # Authentication components
│   │   ├── Contact/           # Contact form components
│   │   └── ...                # Other components
│   ├── lib/                   # Utility libraries
│   ├── types/                 # TypeScript types
│   └── utils/                 # Utility functions
├── public/                    # Static assets
│   └── images/                # Image files
├── markdown/                  # Markdown content
│   └── Blog/                  # Blog posts
├── components.json            # Shadcn/ui configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── railway.toml               # Railway deployment config
└── package.json               # Dependencies
```

## 🎨 Available Pages

- **Home** - `/` - Landing page
- **About** - `/about` - About page
- **Blog** - `/blog` - Blog listing
- **Blog Post** - `/blog/[slug]` - Individual blog posts
- **Contact** - `/contact` - Contact form
- **Documentation** - `/documentation` - Documentation page
- **FAQs** - `/faqs` - Frequently asked questions
- **Portfolio** - `/portfolio` - Portfolio listing
- **Portfolio Item** - `/portfolio/[slug]` - Individual portfolio items
- **Pricing** - `/pricing` - Pricing plans
- **Sign In** - `/signin` - Authentication page
- **Sign Up** - `/signup` - Registration page
- **Demo** - `/demo` - Shadcn/ui components demo

## 🧩 Using Shadcn/ui Components

This project includes Shadcn/ui components. To add more components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

Example usage:

```tsx
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <Button variant="default">Click me</Button>
  )
}
```

Visit the demo page at `/demo` to see all available components.

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🚢 Deployment

### Railway

This project is configured for Railway deployment with `railway.toml`:

1. Push your code to GitHub
2. Connect your repository to Railway
3. Railway will automatically deploy using the configuration

### Manual Deployment

```bash
npm run build
npm start
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize colors:

```typescript
theme: {
  extend: {
    colors: {
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      // Add your custom colors
    }
  }
}
```

### CSS Variables

Modify CSS variables in `src/app/globals.css`:

```css
:root {
  --color-primary: #1358d8;
  --color-secondary: #13c296;
  /* Add your custom variables */
}
```

## 📝 Adding Blog Posts

Create a new markdown file in `markdown/Blog/`:

```markdown
---
title: "Your Post Title"
date: "2026-01-19"
author: "Your Name"
---

Your content here...
```

## 🔐 Authentication

The project uses NextAuth.js with support for:

- **Google OAuth** - Configure in `.env`
- **GitHub OAuth** - Configure in `.env`
- **Credentials** - Email/password authentication

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🔗 Links

- **Live Site:** [https://itos-website-production.up.railway.app](https://itos-website-production.up.railway.app)
- **Repository:** [https://github.com/PtOlga/itos-website](https://github.com/PtOlga/itos-website)
- **Shadcn/ui Docs:** [https://ui.shadcn.com](https://ui.shadcn.com)
- **Next.js Docs:** [https://nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS Docs:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

## 💡 Support

For support, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js and Shadcn/ui
