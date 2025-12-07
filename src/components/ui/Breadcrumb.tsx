'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'tabler-icons-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Build breadcrumb items based on current path
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];
    
    if (pathname === '/') {
      return items;
    }
    
    const pathSegments = pathname.split('/').filter(Boolean);
    
    pathSegments.forEach((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Custom labels for specific routes
      if (segment === 'confirm' && pathSegments[index + 1] === 'declaration') {
        label = 'Confirm';
      } else if (segment === 'declaration') {
        label = 'Declaration';
      } else if (segment === 'select' && pathSegments[index + 1] === 'books') {
        label = 'Select';
      } else if (segment === 'books') {
        label = 'Books';
      } else if (segment === 'orderbooks') {
        label = 'Order Books';
      } else if (segment === 'login') {
        label = 'Login';
      } else if (segment === 'prequalification') {
        label = 'Prequalification';
      } else if (segment === 'signin') {
        label = 'Sign In';
      } else if (segment === 'tracking') {
        label = 'Tracking';
      }
      
      items.push({ label, href });
    });
    
    return items;
  };
  
  const items = getBreadcrumbItems();
  
  if (items.length <= 1) {
    return null; // Don't show breadcrumb on home page
  }
  
  return (
    <div className="breadcrumbs">
      <ul>
        {items.flatMap((item, index) => {
          const elements = [
            <li key={item.href}>
              {index === items.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          ];
          
          if (index < items.length - 1) {
            elements.push(
              <li key={`separator-${index}`} className="breadcrumbs-separator rtl:rotate-180">
                <ChevronRight className="w-4 h-4" />
              </li>
            );
          }
          
          return elements;
        })}
      </ul>
    </div>
  );
}

