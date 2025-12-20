"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "tabler-icons-react";
import { removeBasePath } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const normalizedPathname = removeBasePath(pathname);
  console.log('Breadcrumb - Original pathname:', pathname, 'Normalized:', normalizedPathname);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Build breadcrumb items based on current path
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    // Second item: Always show dropdown menu with Select Books and Tracking
    const secondItem: BreadcrumbItem = {
      label: "Menu",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Order Books", href: "/confirm/declaration/" },
        { label: "Tracking", href: "/tracking" },
        { label: "History", href: "/#" },
      ],
    };
    items.push(secondItem);

    if (normalizedPathname === "/") {
      return items;
    }

    // Don't show additional breadcrumbs for pages that are in the menu dropdown
    if (normalizedPathname === "/select/books" || normalizedPathname === "/tracking") {
      return items;
    }

    const pathSegments = normalizedPathname.split("/").filter(Boolean);

    pathSegments.forEach((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);

      // Custom labels for specific routes
      if (segment === "confirm" && pathSegments[index + 1] === "declaration") {
        label = "Confirm";
      } else if (segment === "select" && pathSegments[index + 1] === "books") {
        label = "Select";
      } else if (segment === "books") {
        label = "Books";
      } else if (segment === "orderbooks") {
        label = "Order Books";
      } else if (segment === "prequalification") {
        label = "Prequalification";
      } else if (segment === "tracking") {
        label = "Tracking";
      } else if (segment === "declaration") {
        label = "Declaration";
      }

      items.push({
        label,
        href,
        hasDropdown: false,
        dropdownItems: undefined,
      });
    });

    return items;
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      Object.keys(dropdownRefs.current).forEach((key) => {
        const ref = dropdownRefs.current[key];
        if (ref && !ref.contains(event.target as Node)) {
          setOpenDropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items = getBreadcrumbItems();

  // Don't show breadcrumb on home page
  if (normalizedPathname === "/" || normalizedPathname === "/login/prequalification/" || normalizedPathname === "/login/signin/") {
    return null;
  }
    return (
      <div className="breadcrumbs">
        <ul>
          {items.flatMap((item, index) => {
            const dropdownKey = `dropdown-${index}`;
            const isOpen = openDropdowns[dropdownKey] || false;
            const isLast = index === items.length - 1;

            const elements = [
              <li key={item.href}>
                {item.hasDropdown && !isLast ? (
                  <div
                    ref={(el) => {
                      dropdownRefs.current[dropdownKey] = el;
                    }}
                    className="dropdown relative inline-flex"
                  >
                    <button
                      type="button"
                      id={dropdownKey}
                      className="dropdown-toggle inline-flex items-center gap-1 text-primary-dark hover:text-secondary-dark transition-colors"
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      onClick={() => toggleDropdown(dropdownKey)}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <ul
                        className="dropdown-menu absolute top-full left-0 mt-1 min-w-40 bg-white border border-secondary-border rounded-lg shadow-lg z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby={dropdownKey}
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <li key={dropdownItem.href}>
                            <Link
                              href={dropdownItem.href}
                              className="dropdown-item block px-4 py-2 text-primary-dark"
                            >
                              {dropdownItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : isLast ? (
                  <span aria-current="page">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-primary-dark hover:text-secondary-dark transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>,
            ];

            if (index < items.length - 1) {
              elements.push(
                <li
                  key={`separator-${index}`}
                  className="breadcrumbs-separator rtl:rotate-180"
                >
                  <span className="rtl:-rotate-[40deg]">/</span>
                </li>
              );
            }

            return elements;
          })}
        </ul>
      </div>
    );
}
