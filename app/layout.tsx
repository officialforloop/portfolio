import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Tajudeen Muktar - Full-Stack Software Engineer",
  description:
    "Professional portfolio of Tajudeen Muktar, a full-stack software engineer specializing in frontend and backend development with modern technologies.",
  generator: "v0.app",
  keywords: ["Full-Stack Developer", "Software Engineer", "JavaScript", "TypeScript", "Next.js", "React"],
  authors: [{ name: "Tajudeen Muktar" }],
  openGraph: {
    title: "Tajudeen Muktar - Full-Stack Software Engineer",
    description: "Professional portfolio showcasing modern web development projects and technical expertise.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
