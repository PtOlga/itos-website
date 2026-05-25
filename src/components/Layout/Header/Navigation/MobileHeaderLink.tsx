import { useState } from 'react';
import Link from 'next/link';
import { HeaderItem } from '../../../../types/menu';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { type Locale } from '@/i18n/config';
import { getLocalizedPath, isPathActive } from '@/utils/localePath';

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const path = usePathname();
  const locale = useLocale() as Locale;
  const itemIsActive = isPathActive(path, item.href);
  const itemHref = getLocalizedPath(item.href, locale);

  return (
    <div className="relative w-full">
      <Link
      href={itemHref}
        onClick={item.submenu ? handleToggle : undefined}
        className={`flex items-center justify-between w-full py-2 px-3 rounded-md text-black dark:text-white focus:outline-hidden ${itemIsActive ? 'bg-primary text-white! dark:bg-primary dark:text-white' : null}`}
      >
        {item.label}
        {item.submenu && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 10l5 5l5-5" />
          </svg>
        )}
      </Link>
      {submenuOpen && item.submenu && (
        <div className="bg-white dark:bg-darkmode p-2 w-full">
          {item.submenu.map((subItem) => (
            <Link key={subItem.href} href={getLocalizedPath(subItem.href, locale)} className={`block py-2 px-3 text-gray-500 hover:bg-gray-200 ${isPathActive(path, subItem.href) ? 'text-primary!' : null}`}>
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;