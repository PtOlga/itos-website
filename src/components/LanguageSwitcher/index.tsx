'use client';

import { useLocale } from 'next-intl';
import { locales, type Locale } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, {locale: newLocale});
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            locale === loc
              ? 'bg-LightApricot text-white'
              : 'text-white hover:bg-white/10'
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

