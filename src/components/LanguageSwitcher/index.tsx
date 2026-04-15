'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getLocalizedPath } from '@/utils/localePath';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    router.push(getLocalizedPath(pathname, newLocale));
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

