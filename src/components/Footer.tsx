import Link from "next/link";
import {
  IconBrandInstagramFilled,
  IconBrandLinkedinFilled,
  IconBrandTwitterFilled,
} from "@tabler/icons-react";
import Navigation from "./Navigation";

const socialLinks = [
  {
    href: "#",
    icon: IconBrandTwitterFilled,
    ariaLabel: "Twitter",
  },
  {
    href: "#",
    icon: IconBrandLinkedinFilled,
    ariaLabel: "LinkedIn",
  },
  {
    href: "#",
    icon: IconBrandInstagramFilled,
    ariaLabel: "Instagram",
  },
];

export default function Footer() {
  return (
    <footer className="container mx-auto px-sm py-10 bg-primary-light">
      <div className="flex flex-row justify-between items-center">
        {/* Copyright */}
        <div className="flex flex-col w-fill gap-6 justify-between items-start">
          <Navigation variant="footer" />
          <div className="text-secondary-typography text-sm mb-4 md:mb-0">
            Copyright 2025 - All right reserved by ACME Industries Ltd.
          </div>
        </div>
        {/* Social Media Icons */}
        <div className="flex flex-row gap-8">
          {socialLinks.map(({ href, icon: Icon, ariaLabel }) => (
            <Link
              key={ariaLabel}
              href={href}
              className="text-primary-dark hover:text-primary-dark transition-colors"
              aria-label={ariaLabel}
            >
              <Icon className="w-10 h-10" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
