"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Filter } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: "frontend" | "fullstack" | "backend" | "mobile";
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("projects");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      description:
        "Modern e-commerce solution with real-time inventory and payment processing",
      longDescription:
        "A comprehensive e-commerce platform built with Next.js and Stripe integration, featuring real-time inventory management, advanced search, and seamless checkout experience.",
      image: "/modern-ecommerce-dashboard.png",
      technologies: [
        "Next.js",
        "TypeScript",
        "Stripe",
        "PostgreSQL",
        "Tailwind CSS",
      ],
      category: "fullstack",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true,
    },
    {
      id: "task-management-app",
      title: "Task Management App",
      description:
        "Collaborative task management with real-time updates and team features",
      longDescription:
        "A collaborative task management application with real-time synchronization, team collaboration features, and advanced project tracking capabilities.",
      image: "/task-management-dashboard.png",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
      category: "fullstack",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true,
    },
    {
      id: "weather-app",
      title: "Weather Forecast App",
      description:
        "Beautiful weather app with location-based forecasts and interactive maps",
      longDescription:
        "A responsive weather application featuring location-based forecasts, interactive weather maps, and detailed meteorological data visualization.",
      image: "/weather-app-interface.png",
      technologies: ["React Native", "Expo", "Weather API", "Maps SDK"],
      category: "mobile",
      liveUrl: "https://example.com",
      featured: false,
    },
    {
      id: "portfolio-website",
      title: "Portfolio Website",
      description: "Modern portfolio with animations and interactive elements",
      longDescription:
        "A modern portfolio website featuring smooth animations, interactive elements, and optimized performance built with Next.js and Framer Motion.",
      image: "/portfolio-website-design.png",
      technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
      category: "frontend",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false,
    },
    {
      id: "api-service",
      title: "RESTful API Service",
      description: "Scalable API service with authentication and rate limiting",
      longDescription:
        "A robust RESTful API service built with Node.js and Express, featuring JWT authentication, rate limiting, and comprehensive documentation.",
      image: "/api-documentation-interface.png",
      technologies: ["Node.js", "Express", "JWT", "Redis", "Swagger"],
      category: "backend",
      githubUrl: "https://github.com/example",
      featured: false,
    },
    {
      id: "social-media-dashboard",
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for social media management and insights",
      longDescription:
        "A comprehensive social media management dashboard with analytics, scheduling, and multi-platform integration for content creators and businesses.",
      image: "/social-media-analytics-dashboard.png",
      technologies: ["Vue.js", "D3.js", "Node.js", "PostgreSQL", "Chart.js"],
      category: "fullstack",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true,
    },
  ];

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "frontend", label: "Frontend" },
    { value: "fullstack", label: "Full-Stack" },
    { value: "backend", label: "Backend" },
    { value: "mobile", label: "Mobile" },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              A collection of projects that showcase my expertise in modern web
              development, from frontend interfaces to full-stack applications
              and mobile experiences.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={filter === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category.value)}
                className={`transition-all duration-300 ${
                  filter === category.value
                    ? "bg-primary text-primary-foreground glow-effect"
                    : "hover:border-accent hover:text-accent"
                }`}
              >
                <Filter className="mr-2 h-4 w-4" />
                {category.label}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`group bg-card/30 backdrop-blur-sm border-border/50 overflow-hidden hover:border-accent/50 transition-all duration-500 animate-float ${
                  project.featured ? "lg:col-span-2" : ""
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          className="bg-primary/90 hover:bg-primary"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-background/90"
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent text-accent-foreground">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs bg-secondary/50 hover:bg-secondary/70 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4">
                    <Link href={`/projects/${project.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:text-accent"
                      >
                        View Details
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>

                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* View All Projects */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-accent hover:text-accent transition-all duration-300 bg-transparent"
            >
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
