import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from '@/components/ScrollToTop';
import Aoscompo from "@/utils/aos";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { Metadata } from 'next';
import ConsentManager from '@/components/Consent/ConsentManager'
import { Toaster } from 'react-hot-toast'

const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? ''

export const metadata: Metadata = {
  title: {
    default: 'ITOS',
    template: '%s | ITOS'
  },
  description: 'Professional IT solutions and web development services',
  keywords: ['IT solutions', 'web development', 'software development'],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
        <Aoscompo>
          <Header />
          <NextTopLoader color='#f9c78f' />
          {children}
          <Footer />
        </Aoscompo>
        <ConsentManager googleTagId={GOOGLE_TAG_ID} />
        <Toaster position="bottom-right" />
        <ScrollToTop />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
