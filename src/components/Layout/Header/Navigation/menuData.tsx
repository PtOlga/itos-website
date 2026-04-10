import { HeaderItem } from "@/types/menu";

export const getHeaderData = (t: (key: string) => string): HeaderItem[] => [
  { label: t('home'), href: "/" },
  { label: t('about'), href: "/about" },
  { label: t('portfolio'), href: "/portfolio" },
  { label: t('blog'), href: "/blog" },
  { label: t('contact'), href: "/contact" },
  { label: t('pricing'), href: "/pricing" },
];
