"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  attributes: {
    name: string;
    role: string;
    bio: string;
    avatar?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/members?sort=displayOrder:asc&populate=avatar&pagination[limit]=6`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export default function LocalImpactSpotlight() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTestimonials().then((data) => {
      setTestimonials(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Local Impact Spotlight
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from our community members about how PMI Pune-Deccan has transformed their careers
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-100 to-primary-100 dark:from-secondary-900 dark:to-primary-900 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {currentTestimonial.attributes.avatar?.data ? (
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-primary-100 dark:ring-primary-800">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${currentTestimonial.attributes.avatar.data.attributes.url}`}
                        alt={currentTestimonial.attributes.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center ring-4 ring-primary-100 dark:ring-primary-800">
                      <span className="text-2xl md:text-3xl font-bold text-white">
                        {currentTestimonial.attributes.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <Quote className="w-8 h-8 text-primary-300 dark:text-primary-600 mb-4 mx-auto md:mx-0" />

                  <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-secondary-400 text-secondary-400" />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-foreground mb-6 italic leading-relaxed">
                    &ldquo;{currentTestimonial.attributes.bio}&rdquo;
                  </blockquote>

                  <div>
                    <h4 className="text-xl font-display font-bold text-foreground">
                      {currentTestimonial.attributes.name}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {currentTestimonial.attributes.role}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      PMI Pune-Deccan Member
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-primary-100 dark:border-primary-800">
                <button
                  onClick={prevTestimonial}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-primary-600 w-8"
                          : "bg-primary-200 dark:bg-primary-700"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Next testimonial"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}