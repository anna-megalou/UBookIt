"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { removeBasePath } from '@/lib/utils';

interface NavigationProps {
  className?: string;
  linkClassName?: string;
  variant?: 'header' | 'footer';
}

const navigationItemsLogin = [
  { href: '/', label: 'Home' },
  { href: '/#hero', label: 'Service' },
  { href: '/#about', label: 'About' },
  { href: '/#faq', label: 'FAQ' },
];

const navigationItems = [
  { href: '/#hero', label: 'Service' },
  { href: '/#about', label: 'About' },
  { href: '/#faq', label: 'FAQ' },
];

export default function Navigation({
  className = '',
  linkClassName = '',
  variant = 'header',
}: NavigationProps) {
  const pathname = usePathname();
  const normalizedPathname = removeBasePath(pathname);
  const baseLinkClasses =
    variant === 'header'
      ? 'text-secondary-dark hover:text-primary-dark text-lg font-bold'
      : 'text-secondary-dark hover:text-primary-dark text-[16px] font-bold';

  return (
    <nav className={className}>
      <div className="flex flex-row w-fill gap-8">
        {
        normalizedPathname === "/login/prequalification/" || normalizedPathname === "/login/signin/" ? navigationItemsLogin.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${baseLinkClasses} ${linkClassName}`}
          >
            {item.label}
          </Link>
        )) : navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${baseLinkClasses} ${linkClassName}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

