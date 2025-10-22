import Link from "next/link";

export default function Header() {
  return (
    <header className="container mx-auto px-auto py-8 bg-primary-light">
      <div className="flex flex-row  justify-between items-center">
        {/* Logo */}
        <div className="flex-none w-fill pr-20">
          <Link href="/" className="text-[32px] font-bold text-primary-dark">
            UniBookIt
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex flex-row justify-end items-center gap-12">
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

          {/* Sign In Button */}
          <div className="flex justify-end items-center bg-primary-dark rounded-full px-6 py-2 text-nowrap">
            <Link
              href="/login"
              className="text-white text-sm font-medium hover:bg-secondary-dark transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
