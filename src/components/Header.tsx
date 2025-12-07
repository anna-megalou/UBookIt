'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Button from "./ui/Button";
import Breadcrumb from "./ui/Breadcrumb";

export default function Header() {
  const pathname = usePathname();
  
  // Pages where Sign In should become Logout
  const logoutPages = [
    '/confirm/declaration',
    '/select/books',
    '/orderbooks'
  ];
  
  const showLogout = logoutPages.includes(pathname);
  const buttonText = showLogout ? 'Logout' : 'Sign In';
  const buttonHref = showLogout ? '/' : '/login/prequalification';

  return (
    <header className="fixed top-0 left-0 right-0 z-60 bg-primary-light pt-6 pb-4 h-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center w-full relative">
          {/* Logo and Breadcrumb */}
          <div className="flex flex-row items-center gap-4 flex-none">
            <Link href="/" className="text-4xl font-bold text-primary-dark">
              UBookIt
            </Link>
            <Breadcrumb />
          </div>

          {/* Navigation */}
          <div className="flex flex-row justify-end items-center gap-12">
            <Navigation variant="header" />
            <Button href={buttonHref} size="sm">
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
