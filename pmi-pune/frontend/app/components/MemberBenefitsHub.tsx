"use client";

import { useState } from "react";
import { Users, BookOpen, Heart, ChevronDown, ChevronUp } from "lucide-react";

const benefits = [
  {
    id: "connect",
    title: "Connect",
    icon: Users,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    description: "Build meaningful relationships with fellow project management professionals in Pune's vibrant community.",
    details: [
      "Monthly chapter meetings and networking events",
      "Industry-specific special interest groups",
      "Mentorship programs connecting experienced and aspiring PMs",
      "Regional conferences and symposiums",
      "Online community forums and discussion groups"
    ]
  },
  {
    id: "develop",
    title: "Develop",
    icon: BookOpen,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    description: "Enhance your skills and knowledge through continuous learning opportunities and professional development.",
    details: [
      "PDU-eligible workshops and seminars",
      "Certification preparation courses",
      "Leadership and soft skills training",
      "Industry best practices sessions",
      "Access to PMI global resources and publications"
    ]
  },
  {
    id: "give-back",
    title: "Give Back",
    icon: Heart,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
    description: "Contribute to the community and make a positive impact through volunteer opportunities and social initiatives.",
    details: [
      "Volunteer opportunities in chapter leadership",
      "Community outreach programs",
      "Student mentorship and education initiatives",
      "Industry partnerships and collaborations",
      "Knowledge sharing and content creation"
    ]
  }
];

export default function MemberBenefitsHub() {
  const [activeBenefit, setActiveBenefit] = useState<string | null>(null);

  const toggleBenefit = (id: string) => {
    setActiveBenefit(activeBenefit === id ? null : id);
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Member Benefits Hub
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the transformative benefits of joining PMI Pune-Deccan Chapter
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleBenefit(benefit.id)}
                className="w-full p-8 text-left flex items-center gap-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      {benefit.title}
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${benefit.color} text-white`}>
                      Step {index + 1}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    {benefit.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {activeBenefit === benefit.id ? (
                    <ChevronUp className="w-6 h-6 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
              </button>

              {activeBenefit === benefit.id && (
                <div className={`px-8 pb-8 ${benefit.bgColor} border-t border-primary-100 dark:border-primary-800`}>
                  <div className="pt-6">
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      What you&apos;ll get:
                    </h4>
                    <ul className="space-y-3">
                      {benefit.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit.color} mt-2 flex-shrink-0`}></div>
                          <span className="text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to start your journey?
          </p>
          <a
            href="/membership"
            className="inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Join PMI Pune-Deccan Today
          </a>
        </div>
      </div>
    </section>
  );
}