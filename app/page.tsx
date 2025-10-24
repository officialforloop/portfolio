import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { GitHubSection } from "@/components/github-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <GitHubSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
