"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Download,
  Clock,
  Linkedin,
  Github,
  Twitter,
  CheckCircle,
  FileText,
  ExternalLink,
} from "lucide-react";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "tajudeen.muktar1124@gmail.com",
      href: "mailto:tajudeen.muktar1124@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+234 701 585 5558",
      href: "tel:+2347015855558",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Lagos, Nigeria",
      href: "https://maps.google.com/?q=Lagos,Nigeria",
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      href: "https://github.com/officialforloop",
      username: "@officialforloop",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/tajudeen-muktar",
      username: "tajudeen-muktar",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      label: "Twitter",
      href: "https://twitter.com/mk1124",
      username: "@mk1124",
    },
  ];

  const availability = {
    status: "Available for new opportunities",
    responseTime: "Usually responds within 24 hours",
    timezone: "WST (UTC+1)",
    preferredContact: "tajudeen.muktar1124@gmail.com",
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              I'm always interested in discussing new opportunities, innovative
              projects, or just having a chat about technology. Let's connect
              and explore how we can work together.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              {/* Availability Status */}
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-6 hover:border-accent/50 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-tech-green rounded-full animate-pulse" />
                    <Badge className="bg-tech-green/20 text-tech-green border-tech-green/30">
                      {availability.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{availability.responseTime}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{availability.timezone}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{availability.preferredContact}</span>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Contact Information */}
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-6 hover:border-accent/50 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-center space-x-3 text-muted-foreground hover:text-accent transition-colors group"
                    >
                      <div className="text-accent group-hover:scale-110 transition-transform">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          {info.label}
                        </div>
                        <div className="text-sm font-medium">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>

              {/* Social Links */}
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-6 hover:border-accent/50 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
                <div className="space-y-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-muted-foreground hover:text-accent transition-colors group"
                    >
                      <div className="text-accent group-hover:scale-110 transition-transform">
                        {social.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {social.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {social.username}
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </Card>

              {/* Resume Download */}
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-6 hover:border-accent/50 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-semibold">Resume</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Download my resume to learn more about my experience and
                    qualifications.
                  </p>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-effect"
                    onClick={() => {
                      // In a real app, this would trigger a download
                      console.log("Downloading resume...");
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-8 hover:border-accent/50 transition-all duration-300">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">
                      Send Me a Message
                    </h3>
                    <p className="text-muted-foreground">
                      Have a project in mind or want to discuss opportunities?
                      I'd love to hear from you.
                    </p>
                  </div>

                  {isSubmitted && (
                    <div className="bg-tech-green/10 border border-tech-green/30 rounded-lg p-4 flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-tech-green" />
                      <div>
                        <p className="text-tech-green font-medium">
                          Message sent successfully!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          I'll get back to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-accent/50"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-accent/50"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-accent/50"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-accent/50 resize-none"
                        placeholder="Tell me about your project or opportunity..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-effect disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="text-center pt-4">
                    <p className="text-xs text-muted-foreground">
                      By sending a message, you agree to my privacy policy and
                      terms of service.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
