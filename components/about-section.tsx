"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Code, Database, Globe, Smartphone } from "lucide-react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("about")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const skillCategories = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      color: "text-primary",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Backend",
      skills: ["Node.js", "Nest.js", "PostgreSQL", "MongoDB", "Redis"],
      color: "text-tech-green",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Tools",
      skills: ["Git", "Docker", "AWS", "Vercel", "Figma"],
      color: "text-accent",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile",
      skills: ["React Native", "Expo", "iOS", "Android", "PWA"],
      color: "text-tech-purple",
    },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful
              design with robust engineering. My favorite work lies at the intersection of design and development,
              creating experiences that not only look great but are meticulously built for performance and usability.
            </p>
          </div>

          {/* Experience Highlight */}
          <div className="mb-16">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-8 hover:border-accent/50 transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Currently Building At</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium text-accent">Isalu Hospital</h4>
                      <p className="text-muted-foreground">
                        Specializing in scalable web applications and modern development practices. Contributing to the
                        creation and maintenance of critical systems that power user experiences such as EMR (Electronic Medical Record), IsaluCare (a telemedicine platform), Hospital Website, among others.
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">2024 — Present</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    In the past, I've had the opportunity to develop software across a variety of settings — from{" "}
                    <span className="text-accent font-medium">advertising agencies</span> and{" "}
                    <span className="text-accent font-medium">large corporations</span> to{" "}
                    <span className="text-accent font-medium">start-ups</span> and{" "}
                    <span className="text-accent font-medium">small digital product studios</span>.
                  </p>
                  <p className="text-muted-foreground">
                    Additionally, I also released a{" "}
                    <span className="text-accent font-medium">comprehensive video course</span> a few years ago, guiding
                    learners through building modern web applications.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={category.title}
                className={`bg-card/30 backdrop-blur-sm border-border/50 p-6 hover:border-accent/50 transition-all duration-500 animate-float`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={`${category.color}`}>{category.icon}</div>
                    <h3 className="font-semibold">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs bg-secondary/50 hover:bg-secondary/70 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Personal Touch */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              In my spare time, I'm usually climbing, reading, hanging out with my family, or exploring new technologies
              and contributing to open-source projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
