import Link from "next/link";
import { IconBrandInstagramFilled, IconBrandLinkedinFilled, IconBrandTwitterFilled } from "@tabler/icons-react";


export default function Footer() {
  return (
    <footer className="container mx-auto px-sm py-10 bg-primary-light">
      <div className="flex flex-row justify-between items-center">
        {/* Copyright */}
        <div className="flex flex-col w-fill gap-6 justify-between items-start">
          <div className="flex flex-row w-fill gap-8">
            <Link
              href="/service"
              className="text-secondary-dark hover:text-primary-dark text-[16px] font-bold"
            >
              Service
            </Link>
            <Link
              href="/about"
              className="text-secondary-dark hover:text-primary-dark  text-[16px] font-bold"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="text-secondary-dark hover:text-primary-dark  text-[16px] font-bold"
            >
              FAQ
            </Link>
          </div>
          <div className="text-secondary-typography text-sm mb-4 md:mb-0">
            Copyright 2025 - All right reserved by ACME Industries Ltd.
          </div>
        </div>
        {/* Social Media Icons */}
        <div className="flex flex-row gap-8">
          <Link
            href="#"
            className="text-primary-dark hover:text-primary-dark transition-colors"
            aria-label="Twitter"
          >
            <IconBrandTwitterFilled className="w-10 h-10" />
          </Link>
          <Link
            href="#"
            className="text-primary-dark hover:text-primary-dark transition-colors"
            aria-label="LinkedIn"
          >
            <IconBrandLinkedinFilled className="w-10 h-10" />
          </Link>
          <Link
            href="#"
            className="text-primary-dark hover:text-primary-dark transition-colors"
            aria-label="Instagram"
          >
            <IconBrandInstagramFilled className="w-10 h-10" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
