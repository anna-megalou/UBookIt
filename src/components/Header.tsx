import Link from "next/link";
import Navigation from "./Navigation";
import Button from "./ui/Button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-60 bg-primary-light pt-6 pb-4 h-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center w-full relative">
          {/* Logo */}
          <div className="flex-none w-fill pr-20">
            <Link href="/" className="text-4xl font-bold text-primary-dark">
              UBookIt
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex flex-row justify-end items-center gap-12">
            <Navigation variant="header" />
            <Button href="/login/prequalification" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
