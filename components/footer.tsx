"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter, ArrowUp, Heart } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "GitHub", href: "#github" },
      { label: "Contact", href: "#contact" },
    ],
    social: [
      {
        label: "GitHub",
        href: "https://github.com/tajudeen",
        icon: <Github className="h-4 w-4" />,
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/tajudeen-muktar",
        icon: <Linkedin className="h-4 w-4" />,
      },
      {
        label: "Twitter",
        href: "https://twitter.com/tajudeen_dev",
        icon: <Twitter className="h-4 w-4" />,
      },
      {
        label: "Email",
        href: "mailto:tajudeen.muktar1124@gmail.com",
        icon: <Mail className="h-4 w-4" />,
      },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  };

  return (
    <footer className="relative bg-card/30 backdrop-blur-sm border-t border-border/50">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gradient mb-2">
                  Tajudeen Muktar
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Full-Stack Software Engineer passionate about creating
                  exceptional digital experiences through thoughtful design and
                  robust engineering.
                </p>
              </div>
              <div className="flex space-x-4">
                {footerLinks.social.map((social) => (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hover:text-accent transition-colors"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Navigation</h4>
              <ul className="space-y-2">
                {footerLinks.navigation.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Get In Touch</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>San Francisco, CA</p>
                <p>
                  <a
                    href="mailto:tajudeen.muktar1124@gmail.com"
                    className="hover:text-accent transition-colors"
                  >
                    tajudeen.muktar1124@gmail.com
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+15551234567"
                    className="hover:text-accent transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {currentYear} Tajudeen Muktar. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>using Next.js & Tailwind CSS</span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex space-x-4 text-sm">
                {footerLinks.legal.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="hover:text-accent transition-colors"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
