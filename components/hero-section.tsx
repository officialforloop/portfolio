"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [particles, setParticles] = useState<
    Array<{
      left: string;
      top: string;
      delay: string;
      duration: string;
    }>
  >([]);
  const fullText = "Full-Stack Software Engineer";

  useEffect(() => {
    setIsVisible(true);

    // Generate particle positions only on client side to avoid hydration mismatch
    const particleData = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 2}s`,
    }));
    setParticles(particleData);

    // Typing animation
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypingText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const techStack = [
    "JavaScript",
    "TypeScript",
    "Next.js",
    "Nest.js",
    "Tailwind CSS",
    "Bootstrap",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-28 lg:pt-32 hero-offset">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div className="absolute inset-0 gradient-mesh" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent/30 rounded-full animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Name */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-balance">
                <span className="text-gradient">Tajudeen</span>
                <br />
                <span className="text-foreground">Muktar</span>
              </h1>

              {/* Typing Animation Title */}
              <div className="h-12 flex items-center">
                <h2 className="text-xl md:text-2xl text-muted-foreground font-mono">
                  {typingText}
                  <span className="animate-pulse">|</span>
                </h2>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
              I build accessible, pixel-perfect digital experiences that blend
              thoughtful design with robust engineering. Specializing in modern
              web technologies and scalable solutions.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className={`px-4 py-2 text-sm font-medium bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-300 animate-float`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect hover:animate-pulse-glow transition-all duration-300"
              >
                View My Work
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:border-accent hover:text-accent transition-all duration-300 bg-transparent"
              >
                Get In Touch
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-accent transition-colors"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-accent transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-accent transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-tech-purple/30 rounded-full blur-3xl animate-pulse-glow scale-110" />

              <div className="relative group">
                {/* Gradient border ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-tech-purple rounded-full p-1 animate-pulse-glow">
                  <div className="bg-background rounded-full h-full w-full"></div>
                </div>

                {/* Profile Image Container */}
                <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-full p-8 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-500 group-hover:scale-105">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src="/muktar.png"
                      alt="Tajudeen Muktar - Full-Stack Software Engineer"
                      className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Code Elements */}
              <div className="absolute -top-4 -right-4 bg-tech-green/20 backdrop-blur-sm border border-tech-green/30 rounded-lg px-3 py-2 animate-float">
                <code className="text-tech-green text-sm font-mono">
                  {"{ code }"}
                </code>
              </div>
              <div
                className="absolute -bottom-4 -left-4 bg-tech-purple/20 backdrop-blur-sm border border-tech-purple/30 rounded-lg px-3 py-2 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <code className="text-tech-purple text-sm font-mono">
                  {"</>"}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-muted-foreground text-sm">
              Scroll to explore
            </span>
            <ArrowDown className="h-5 w-5 text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
