"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Target,
  Lightbulb,
  Code,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface Challenge {
  problem: string;
  solution: string;
}

interface Architecture {
  [key: string]: string;
}

interface Metrics {
  [key: string]: string;
}

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
  timeline: string;
  role: string;
  features: string[];
  challenges: Challenge[];
  architecture: Architecture;
  metrics: Metrics;
}

interface ProjectDetailPageProps {
  project: Project;
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const sections = [
        "overview",
        "features",
        "challenges",
        "architecture",
        "metrics",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { id: "overview", label: "Overview", icon: <Target className="h-4 w-4" /> },
    {
      id: "features",
      label: "Features",
      icon: <Lightbulb className="h-4 w-4" />,
    },
    {
      id: "challenges",
      label: "Challenges",
      icon: <Code className="h-4 w-4" />,
    },
    {
      id: "architecture",
      label: "Architecture",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      id: "metrics",
      label: "Metrics",
      icon: <BarChart3 className="h-4 w-4" />,
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="absolute inset-0 gradient-mesh opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Back Navigation */}
            <div className="mb-8">
              <Link href="/#projects">
                <Button
                  variant="ghost"
                  className="hover:text-accent transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Project Info */}
              <div className="space-y-6">
                <div>
                  {project.featured && (
                    <Badge className="bg-accent text-accent-foreground mb-4">
                      Featured Project
                    </Badge>
                  )}
                  <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                    {project.title}
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Project Meta */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{project.timeline}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{project.role}</span>
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {project.liveUrl && (
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Live Demo
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-border hover:border-accent hover:text-accent transition-all duration-300 bg-transparent"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Project Image */}
              <div className="relative">
                <div className="relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-4 hover:border-accent/50 transition-all duration-500">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full rounded-xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sticky Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:text-accent hover:bg-card/50"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Overview */}
            <section id="overview" className="space-y-8">
              <h2 className="text-2xl font-bold text-gradient">
                Project Overview
              </h2>
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-8">
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </Card>
            </section>

            {/* Features */}
            <section id="features" className="space-y-8">
              <h2 className="text-2xl font-bold text-gradient">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <Card
                    key={index}
                    className="bg-card/30 backdrop-blur-sm border-border/50 p-6 hover:border-accent/50 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Challenges */}
            <section id="challenges" className="space-y-8">
              <h2 className="text-2xl font-bold text-gradient">
                Technical Challenges
              </h2>
              <div className="space-y-6">
                {project.challenges.map((challenge, index) => (
                  <Card
                    key={index}
                    className="bg-card/30 backdrop-blur-sm border-border/50 p-8 hover:border-accent/50 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-destructive mb-2">
                          Challenge
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {challenge.problem}
                        </p>
                      </div>
                      <Separator className="bg-border/50" />
                      <div>
                        <h3 className="text-lg font-semibold text-tech-green mb-2">
                          Solution
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {challenge.solution}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Architecture */}
            <section id="architecture" className="space-y-8">
              <h2 className="text-2xl font-bold text-gradient">
                Technical Architecture
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(project.architecture).map(([key, value]) => (
                  <Card
                    key={key}
                    className="bg-card/30 backdrop-blur-sm border-border/50 p-6 hover:border-accent/50 transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold capitalize text-accent">
                        {key}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Metrics */}
            <section id="metrics" className="space-y-8">
              <h2 className="text-2xl font-bold text-gradient">
                Performance Metrics
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <Card
                    key={key}
                    className="bg-card/30 backdrop-blur-sm border-border/50 p-6 text-center hover:border-accent/50 transition-all duration-300"
                  >
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary">
                        {value}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {key}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <section className="py-16 border-t border-border/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/#projects">
              <Button
                variant="outline"
                className="hover:border-accent hover:text-accent transition-colors bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Projects
              </Button>
            </Link>
            <div className="flex gap-4">
              {project.liveUrl && (
                <Button asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live Demo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
