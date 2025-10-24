"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  Star,
  GitFork,
  Clock,
  ExternalLink,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  private: boolean;
}

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
}

export function GitHubSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          fetchGitHubData();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("github");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Mock GitHub data - In a real app, you'd fetch from GitHub API
  const fetchGitHubData = async () => {
    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock repository data
    const mockRepos: GitHubRepo[] = [
      {
        id: 1,
        name: "ecommerce-platform",
        description:
          "Modern e-commerce platform built with Next.js and Stripe integration",
        html_url: "https://github.com/tajudeen/ecommerce-platform",
        language: "TypeScript",
        stargazers_count: 124,
        forks_count: 23,
        updated_at: "2024-01-15T10:30:00Z",
        topics: ["nextjs", "ecommerce", "stripe", "typescript"],
        private: false,
      },
      {
        id: 2,
        name: "task-management-api",
        description:
          "RESTful API for task management with authentication and real-time features",
        html_url: "https://github.com/tajudeen/task-management-api",
        language: "JavaScript",
        stargazers_count: 89,
        forks_count: 15,
        updated_at: "2024-01-10T14:20:00Z",
        topics: ["nodejs", "express", "mongodb", "socketio"],
        private: false,
      },
      {
        id: 3,
        name: "react-component-library",
        description:
          "Reusable React components with TypeScript and Storybook documentation",
        html_url: "https://github.com/tajudeen/react-component-library",
        language: "TypeScript",
        stargazers_count: 67,
        forks_count: 12,
        updated_at: "2024-01-08T09:15:00Z",
        topics: ["react", "typescript", "storybook", "components"],
        private: false,
      },
      {
        id: 4,
        name: "weather-app-mobile",
        description:
          "Cross-platform weather app built with React Native and Expo",
        html_url: "https://github.com/tajudeen/weather-app-mobile",
        language: "JavaScript",
        stargazers_count: 45,
        forks_count: 8,
        updated_at: "2024-01-05T16:45:00Z",
        topics: ["react-native", "expo", "weather", "mobile"],
        private: false,
      },
      {
        id: 5,
        name: "portfolio-website",
        description:
          "Personal portfolio website with modern animations and responsive design",
        html_url: "https://github.com/tajudeen/portfolio-website",
        language: "TypeScript",
        stargazers_count: 32,
        forks_count: 6,
        updated_at: "2024-01-03T11:30:00Z",
        topics: ["nextjs", "portfolio", "framer-motion", "tailwindcss"],
        private: false,
      },
      {
        id: 6,
        name: "data-visualization-dashboard",
        description:
          "Interactive dashboard for data visualization using D3.js and React",
        html_url: "https://github.com/tajudeen/data-visualization-dashboard",
        language: "JavaScript",
        stargazers_count: 78,
        forks_count: 14,
        updated_at: "2023-12-28T13:20:00Z",
        topics: ["react", "d3js", "dashboard", "visualization"],
        private: false,
      },
    ];

    const mockStats: GitHubStats = {
      public_repos: 42,
      followers: 156,
      following: 89,
      total_stars: mockRepos.reduce(
        (sum, repo) => sum + repo.stargazers_count,
        0
      ),
    };

    setRepos(mockRepos);
    setFilteredRepos(mockRepos);
    setStats(mockStats);
    setLoading(false);
  };

  // Filter repositories based on search term and language
  useEffect(() => {
    let filtered = repos;

    if (searchTerm) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repo.topics.some((topic) =>
            topic.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedLanguage !== "all") {
      filtered = filtered.filter((repo) => repo.language === selectedLanguage);
    }

    setFilteredRepos(filtered);
  }, [searchTerm, selectedLanguage, repos]);

  // Ensure languages is a string[] by filtering out nulls with a type guard
  const languages = Array.from(
    new Set(
      repos
        .map((repo) => repo.language)
        .filter((l): l is string => l !== null && l !== undefined)
    )
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      TypeScript: "text-blue-400",
      JavaScript: "text-yellow-400",
      Python: "text-green-400",
      Java: "text-red-400",
      Go: "text-cyan-400",
      Rust: "text-orange-400",
    };
    return colors[language || ""] || "text-gray-400";
  };

  return (
    <section id="github" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              GitHub Activity
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Explore my open-source contributions and personal projects. Each
              repository represents a learning journey and a step forward in my
              development expertise.
            </p>
          </div>

          {/* GitHub Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-6 text-center hover:border-accent/50 transition-all duration-300">
                <div className="text-2xl font-bold text-primary">
                  {stats.public_repos}
                </div>
                <div className="text-sm text-muted-foreground">
                  Repositories
                </div>
              </Card>
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-6 text-center hover:border-accent/50 transition-all duration-300">
                <div className="text-2xl font-bold text-tech-green">
                  {stats.total_stars}
                </div>
                <div className="text-sm text-muted-foreground">Total Stars</div>
              </Card>
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-6 text-center hover:border-accent/50 transition-all duration-300">
                <div className="text-2xl font-bold text-accent">
                  {stats.followers}
                </div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </Card>
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-6 text-center hover:border-accent/50 transition-all duration-300">
                <div className="text-2xl font-bold text-tech-purple">
                  {stats.following}
                </div>
                <div className="text-sm text-muted-foreground">Following</div>
              </Card>
            </div>
          )}

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/30 backdrop-blur-sm border-border/50 focus:border-accent/50"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedLanguage === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage("all")}
                className={
                  selectedLanguage === "all"
                    ? "bg-primary glow-effect"
                    : "hover:border-accent hover:text-accent"
                }
              >
                All
              </Button>
              {languages.map((language) => (
                <Button
                  key={language}
                  variant={
                    selectedLanguage === language ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedLanguage(language)}
                  className={
                    selectedLanguage === language
                      ? "bg-primary glow-effect"
                      : "hover:border-accent hover:text-accent"
                  }
                >
                  {language}
                </Button>
              ))}
            </div>
          </div>

          {/* Repository Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card
                  key={i}
                  className="bg-card/30 backdrop-blur-sm border-border/50 p-6 animate-pulse"
                >
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-16"></div>
                      <div className="h-6 bg-muted rounded w-12"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo, index) => (
                <Card
                  key={repo.id}
                  className={`group bg-card/30 backdrop-blur-sm border-border/50 p-6 hover:border-accent/50 transition-all duration-500 animate-float`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="space-y-4">
                    {/* Repository Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Github className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          {repo.name}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {repo.description || "No description available"}
                    </p>

                    {/* Topics */}
                    {repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <Badge
                            key={topic}
                            variant="secondary"
                            className="text-xs bg-secondary/50 hover:bg-secondary/70 transition-colors"
                          >
                            {topic}
                          </Badge>
                        ))}
                        {repo.topics.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-secondary/50"
                          >
                            +{repo.topics.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Repository Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        {repo.language && (
                          <div className="flex items-center space-x-1">
                            <div
                              className={`w-3 h-3 rounded-full ${getLanguageColor(
                                repo.language
                              )}`}
                            />
                            <span>{repo.language}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="h-3 w-3" />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(repo.updated_at)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* View All Repositories */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-accent hover:text-accent transition-all duration-300 bg-transparent"
              asChild
            >
              <a
                href="https://github.com/tajudeen"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" />
                View All Repositories
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
