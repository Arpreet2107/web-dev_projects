"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Award, BookOpen, Users, TrendingUp } from "lucide-react";

const certifications = [
  {
    id: "pmp",
    title: "Project Management Professional (PMP)",
    description: "Globally recognized certification demonstrating project management expertise and competence.",
    benefits: ["Industry Recognition", "Career Advancement", "60 PDUs/Year"],
    icon: Award,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    id: "capm",
    title: "Certified Associate in Project Management (CAPM)",
    description: "Entry-level certification for those new to project management or with limited experience.",
    benefits: ["Foundation Knowledge", "Career Starter", "23 PDUs/Year"],
    icon: BookOpen,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    id: "pfmp",
    title: "Portfolio Management Professional (PfMP)",
    description: "Advanced certification for strategic portfolio management and organizational alignment.",
    benefits: ["Strategic Leadership", "Executive Level", "60 PDUs/Year"],
    icon: TrendingUp,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    id: "pgmp",
    title: "Program Management Professional (PgMP)",
    description: "Specialized certification for program managers overseeing multiple related projects.",
    benefits: ["Program Expertise", "Complex Projects", "60 PDUs/Year"],
    icon: Users,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
];

export default function FeaturedCertificationShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certifications.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % certifications.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Featured Certifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover PMI certifications that can transform your career and validate your project management expertise.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {certifications.map((cert) => (
                <div key={cert.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">
                    {/* Content Side */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${cert.color} text-white mb-6`}>
                        <cert.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                        {cert.title}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {cert.description}
                      </p>
                      <div className="space-y-3 mb-8">
                        {cert.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span className="text-foreground font-medium">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={`/certifications/${cert.id}`}
                        className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg group"
                      >
                        Learn More
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Visual Side */}
                    <div className={`p-8 md:p-12 flex items-center justify-center ${cert.bgColor}`}>
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${cert.color} text-white mb-6 shadow-2xl`}>
                          <cert.icon className="w-16 h-16" />
                        </div>
                        <h4 className="text-2xl font-display font-bold text-foreground mb-2">
                          {cert.title.split(' ').pop()}
                        </h4>
                        <p className="text-muted-foreground">Certification</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
              aria-label="Previous certification"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
              aria-label="Next certification"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary-600 scale-125"
                    : "bg-primary-200 dark:bg-primary-700 hover:bg-primary-300 dark:hover:bg-primary-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}