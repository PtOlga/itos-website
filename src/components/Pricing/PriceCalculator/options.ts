export interface CalculatorOption {
  id: string
  name: string
  price: number
  priceSEK: number
  category: 'main' | 'communication' | 'seo' | 'additional' | 'store'
}

export interface ProjectType {
  id: 'landing' | 'multipage' | 'store'
  name: string
  basePrice: number
  basePriceSEK: number
}

export const projectTypes: ProjectType[] = [
  {
    id: 'landing',
    name: 'One-page website (Landing)',
    basePrice: 280,
    basePriceSEK: 2200,
  },
  {
    id: 'multipage',
    name: 'Multi-page website',
    basePrice: 780,
    basePriceSEK: 7900,
  },
  {
    id: 'store',
    name: 'Online store',
    basePrice: 930,
    basePriceSEK: 9700,
  },
]

export const calculatorOptions: CalculatorOption[] = [
  // Main options
  { id: 'news', name: 'News', price: 40, priceSEK: 460, category: 'main' },
  { id: 'catalog', name: 'Catalog', price: 180, priceSEK: 2100, category: 'main' },
  { id: 'search', name: 'Search', price: 100, priceSEK: 1150, category: 'main' },
  { id: 'gallery', name: 'Photo gallery', price: 160, priceSEK: 1850, category: 'main' },
  { id: 'articles', name: 'Articles', price: 100, priceSEK: 1150, category: 'main' },
  { id: 'map', name: 'Geo map (Google)', price: 60, priceSEK: 690, category: 'main' },

  // Interactive communication
  { id: 'faq', name: 'Frequently asked questions (FAQ)', price: 60, priceSEK: 690, category: 'communication' },
  { id: 'reviews', name: 'Discussion / Reviews', price: 50, priceSEK: 580, category: 'communication' },

  // SEO functions
  { id: 'sitemap', name: 'Site map (XML)', price: 0, priceSEK: 460, category: 'seo' },
  { id: 'microformats', name: 'Structured data for Google', price: 150, priceSEK: 1730, category: 'seo' },
  { id: 'rss', name: 'RSS feed', price: 0, priceSEK: 580, category: 'seo' },

  // Additional features
  { id: 'excel-import', name: 'Import-Export price Excel', price: 140, priceSEK: 1610, category: 'additional' },
  { id: 'multilang', name: 'Additional languages on site', price: 300, priceSEK: 3450, category: 'additional' },

  // Store options
  { id: 'product-variants', name: 'Product variants (sizes, colors, configurations)', price: 150, priceSEK: 1730, category: 'store' },
  { id: 'product-search', name: 'Search products by parameters', price: 100, priceSEK: 1150, category: 'store' },
  { id: 'alphabetical-search', name: 'Alphabetical search', price: 80, priceSEK: 920, category: 'store' },
]

export const categoryNames = {
  main: 'Main options',
  communication: 'Interactive communication',
  seo: 'Functions for quality promotion',
  additional: 'Additional features',
  store: 'Store',
}