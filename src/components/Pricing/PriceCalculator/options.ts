export interface CalculatorOption {
  id: string
  name: string
  price: number
  category: 'main' | 'communication' | 'seo' | 'additional' | 'store'
}

export interface ProjectType {
  id: 'landing' | 'multipage' | 'store'
  name: string
  basePrice: number
}

export const projectTypes: ProjectType[] = [
  {
    id: 'landing',
    name: 'One-page website (Landing)',
    basePrice: 190,
  },
  {
    id: 'multipage',
    name: 'Multi-page website',
    basePrice: 690, // 190 + 500
  },
  {
    id: 'store',
    name: 'Online store',
    basePrice: 840, // 190 + 650
  },
]

export const calculatorOptions: CalculatorOption[] = [
  // Main options
  {
    id: 'news',
    name: 'News',
    price: 40,
    category: 'main',
  },
  {
    id: 'catalog',
    name: 'Catalog',
    price: 180,
    category: 'main',
  },
  {
    id: 'search',
    name: 'Search',
    price: 100,
    category: 'main',
  },
  {
    id: 'gallery',
    name: 'Photo gallery',
    price: 160,
    category: 'main',
  },
  {
    id: 'articles',
    name: 'Articles',
    price: 100,
    category: 'main',
  },
  {
    id: 'map',
    name: 'Geo map (Google)',
    price: 60,
    category: 'main',
  },

  // Interactive communication
  {
    id: 'faq',
    name: 'Frequently asked questions (FAQ)',
    price: 60,
    category: 'communication',
  },
  {
    id: 'reviews',
    name: 'Discussion / Reviews',
    price: 50,
    category: 'communication',
  },

  // SEO functions
  {
    id: 'sitemap',
    name: 'Site map (XML)',
    price: 40,
    category: 'seo',
  },
  {
    id: 'microformats',
    name: 'Microformats',
    price: 150,
    category: 'seo',
  },
  {
    id: 'rss',
    name: 'RSS feed',
    price: 50,
    category: 'seo',
  },

  // Additional features
  {
    id: 'auto-import',
    name: 'Auto-import articles from internet',
    price: 140,
    category: 'additional',
  },
  {
    id: 'ads',
    name: 'Advertising rotation (text, banners, links)',
    price: 90,
    category: 'additional',
  },
  {
    id: 'excel-import',
    name: 'Import-Export price Excel',
    price: 140,
    category: 'additional',
  },
  {
    id: 'multilang',
    name: 'Additional languages on site',
    price: 300,
    category: 'additional',
  },

  // Store options
  {
    id: 'product-variants',
    name: 'Product variants (sizes, colors, configurations)',
    price: 150,
    category: 'store',
  },
  {
    id: 'product-search',
    name: 'Search products by parameters',
    price: 100,
    category: 'store',
  },
  {
    id: 'alphabetical-search',
    name: 'Alphabetical search',
    price: 80,
    category: 'store',
  },
]

export const categoryNames = {
  main: 'Main options',
  communication: 'Interactive communication',
  seo: 'Functions for quality promotion',
  additional: 'Additional features',
  store: 'Store',
}

