"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use ResizeObserver to update the nav height CSS variable whenever the
  // nav element's size changes (covers menu toggles, font changes, etc.).
  useEffect(() => {
    const el = navRef.current;
    if (!el || typeof ResizeObserver === "undefined") {
      // Fallback to simple resize + initial set
      const fallback = () => {
        const e = navRef.current;
        if (!e) return;
        const h = e.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--nav-height", `${h}px`);
      };
      fallback();
      window.addEventListener("resize", fallback);
      return () => window.removeEventListener("resize", fallback);
    }

    const setNavHeight = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--nav-height", `${h}px`);
    };

    // Initial set
    setNavHeight();

    const ro = new ResizeObserver(() => setNavHeight());
    ro.observe(el);
    // keep resize listener as a safety net (rare environments)
    window.addEventListener("resize", setNavHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setNavHeight);
    };
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-background/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-gradient">TM</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-accent transition-colors duration-200 text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/98 backdrop-blur-md rounded-lg mt-2 border border-border/50 shadow-xl">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-accent transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
