import { HeaderItem } from "@/types/menu";

export const getHeaderData = (t: (key: string) => string): HeaderItem[] => [
  { label: t('home'), href: "/" },
  { label: t('about'), href: "/about" },
  {
    label: t('portfolio'),
    href: "/portfolio",
    submenu: [
      { label: t('portfolioList'), href: "/portfolio" },
      { label: t('portfolioDetails'), href: "/portfolio/portfolio-1" },
    ],
  },
  {
    label: t('blog'),
    href: "#",
    submenu: [
      { label: t('blogList'), href: "/blog" },
      { label: t('blogDetails'), href: "/blog/blog_1" },
    ],
  },
  { label: t('contact'), href: "/contact" },
  { label: t('pricing'), href: "/pricing" },
];
