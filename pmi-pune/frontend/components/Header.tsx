"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import UserMenu from "@/components/auth/UserMenu";
import SearchBar from "@/components/SearchBar";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Header() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 glass shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-display font-bold text-primary-900 dark:text-primary-100 hover:text-primary-600 transition-colors">
            PMI Pune-Deccan
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/events" className="text-foreground hover:text-primary-600 transition-colors font-medium">
              Events
            </Link>
            <Link href="/certifications" className="text-foreground hover:text-primary-600 transition-colors font-medium">
              Certifications
            </Link>
            <Link href="/resources" className="text-foreground hover:text-primary-600 transition-colors font-medium">
              Resources
            </Link>
            <Link href="/members" className="text-foreground hover:text-primary-600 transition-colors font-medium">
              Members
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary-600 transition-colors font-medium">
              About
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <SearchBar />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {session ? (
              <Link
                href="/dashboard"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 hover:shadow-lg"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/membership"
                className="bg-secondary-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary-600 transition-all duration-300 hover:shadow-lg"
              >
                Join Us
              </Link>
            )}
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 glass rounded-lg p-4 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/events"
                className="text-foreground hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/certifications"
                className="text-foreground hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Certifications
              </Link>
              <Link
                href="/resources"
                className="text-foreground hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/members"
                className="text-foreground hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Members
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-2 border-t border-border">
                <SearchBar />
              </div>
              {session ? (
                <Link
                  href="/dashboard"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 text-center block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/membership"
                  className="bg-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-600 transition-all duration-300 text-center block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join Us
                </Link>
              )}
              <div className="pt-2">
                <UserMenu />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

