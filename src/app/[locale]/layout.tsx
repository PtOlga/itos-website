import { DM_Sans } from "next/font/google";
import "../globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from '@/components/ScrollToTop';
import Aoscompo from "@/utils/aos";
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "../context/AuthDialogContext";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import { Metadata } from 'next';

const dmsans = DM_Sans({ subsets: ["latin"] });

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
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={dmsans.className}>
        <NextIntlClientProvider messages={messages}>
          <AuthDialogProvider>
            <SessionProviderComp>
              <ThemeProvider
                attribute="class"
                enableSystem={true}
                defaultTheme="system"
              >
                <Aoscompo>
                  <Header />
                  <NextTopLoader color='#f9c78f' />
                  {children}
                  <Footer />
                </Aoscompo>
                <ScrollToTop />
              </ThemeProvider>
            </SessionProviderComp>
          </AuthDialogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

