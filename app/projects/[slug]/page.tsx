import { notFound } from "next/navigation"
import { ProjectDetailPage } from "@/components/project-detail-page"
import { Navigation } from "@/components/navigation"

// Mock project data - In a real app, this would come from a CMS or database
const projects = {
  "ecommerce-platform": {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with real-time inventory and payment processing",
    longDescription:
      "A comprehensive e-commerce platform built with Next.js and Stripe integration, featuring real-time inventory management, advanced search, and seamless checkout experience. The platform supports multiple payment methods, order tracking, and admin dashboard for inventory management.",
    image: "/modern-ecommerce-dashboard.png",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS", "Prisma", "Redis"],
    category: "fullstack" as const,
    liveUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/tajudeen/ecommerce-platform",
    featured: true,
    timeline: "3 months",
    role: "Full-Stack Developer",
    features: [
      "Real-time inventory management",
      "Stripe payment integration",
      "Advanced product search and filtering",
      "Order tracking and management",
      "Admin dashboard with analytics",
      "Responsive design for all devices",
      "SEO optimized product pages",
      "Email notifications for orders",
    ],
    challenges: [
      {
        problem: "Real-time inventory synchronization across multiple users",
        solution:
          "Implemented Redis-based caching with WebSocket connections to ensure inventory updates are reflected instantly across all active sessions.",
      },
      {
        problem: "Complex payment flow with multiple payment methods",
        solution:
          "Created a unified payment abstraction layer that handles Stripe, PayPal, and Apple Pay while maintaining PCI compliance.",
      },
      {
        problem: "Performance optimization for large product catalogs",
        solution:
          "Implemented server-side pagination, image optimization, and database indexing to handle 10,000+ products efficiently.",
      },
    ],
    architecture: {
      frontend: "Next.js with TypeScript for type safety and server-side rendering",
      backend: "API routes with middleware for authentication and rate limiting",
      database: "PostgreSQL with Prisma ORM for type-safe database operations",
      caching: "Redis for session management and inventory caching",
      payments: "Stripe for secure payment processing with webhook handling",
      deployment: "Vercel with automatic deployments and preview environments",
    },
    metrics: {
      performance: "95+ Lighthouse score",
      uptime: "99.9% availability",
      loadTime: "< 2s initial page load",
      conversion: "15% improvement in checkout completion",
    },
  },
  "task-management-app": {
    id: "task-management-app",
    title: "Task Management App",
    description: "Collaborative task management with real-time updates and team features",
    longDescription:
      "A collaborative task management application with real-time synchronization, team collaboration features, and advanced project tracking capabilities. Built with modern web technologies to provide a seamless experience across devices.",
    image: "/task-management-dashboard.png",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI", "JWT", "Express"],
    category: "fullstack" as const,
    liveUrl: "https://taskmanager-demo.vercel.app",
    githubUrl: "https://github.com/tajudeen/task-management-app",
    featured: true,
    timeline: "2 months",
    role: "Full-Stack Developer",
    features: [
      "Real-time collaboration with Socket.io",
      "Drag-and-drop task management",
      "Team member assignment and notifications",
      "Project timeline and milestone tracking",
      "File attachments and comments",
      "Advanced filtering and search",
      "Mobile-responsive design",
      "Dark/light theme support",
    ],
    challenges: [
      {
        problem: "Real-time synchronization across multiple users",
        solution:
          "Implemented Socket.io with room-based connections and conflict resolution algorithms to handle simultaneous edits.",
      },
      {
        problem: "Complex state management for collaborative features",
        solution: "Used Redux with middleware for optimistic updates and rollback mechanisms for failed operations.",
      },
    ],
    architecture: {
      frontend: "React with Material-UI for consistent design system",
      backend: "Node.js with Express and Socket.io for real-time features",
      database: "MongoDB with Mongoose for flexible document storage",
      authentication: "JWT tokens with refresh token rotation",
      realtime: "Socket.io for instant updates and notifications",
      deployment: "Docker containers on AWS with load balancing",
    },
    metrics: {
      performance: "92+ Lighthouse score",
      users: "500+ active users",
      realtime: "< 100ms message latency",
      satisfaction: "4.8/5 user rating",
    },
  },
  "weather-app": {
    id: "weather-app",
    title: "Weather Forecast App",
    description: "Beautiful weather app with location-based forecasts and interactive maps",
    longDescription:
      "A responsive weather application featuring location-based forecasts, interactive weather maps, and detailed meteorological data visualization. Built with React Native for cross-platform compatibility.",
    image: "/weather-app-interface.png",
    technologies: ["React Native", "Expo", "Weather API", "Maps SDK", "AsyncStorage"],
    category: "mobile" as const,
    liveUrl: "https://expo.dev/@tajudeen/weather-app",
    githubUrl: "https://github.com/tajudeen/weather-app",
    featured: false,
    timeline: "1 month",
    role: "Mobile Developer",
    features: [
      "Current weather and 7-day forecast",
      "Location-based weather detection",
      "Interactive weather maps",
      "Severe weather alerts",
      "Favorite locations management",
      "Offline data caching",
      "Push notifications",
      "Beautiful weather animations",
    ],
    challenges: [
      {
        problem: "Accurate location detection and permissions",
        solution:
          "Implemented progressive permission requests with fallback to manual location selection and IP-based detection.",
      },
    ],
    architecture: {
      framework: "React Native with Expo for rapid development",
      api: "OpenWeatherMap API for weather data",
      maps: "MapBox SDK for interactive weather maps",
      storage: "AsyncStorage for offline caching",
      notifications: "Expo Notifications for weather alerts",
      deployment: "Expo Application Services for OTA updates",
    },
    metrics: {
      downloads: "10,000+ downloads",
      rating: "4.7/5 app store rating",
      retention: "75% 7-day retention rate",
      performance: "< 3s app launch time",
    },
  },
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = projects[slug as keyof typeof projects]

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProjectDetailPage project={project} />
    </main>
  )
}

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = projects[slug as keyof typeof projects]

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} - Tajudeen Muktar`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  }
}
