"use client";

import { useEffect, useState } from "react";
import { Users, Calendar, Award, Building } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <span className="text-3xl md:text-4xl font-display font-bold text-primary-600 dark:text-primary-400">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function TrustIndicatorBar() {
  const stats = [
    {
      icon: Users,
      label: "Members",
      value: 500,
      suffix: "+",
    },
    {
      icon: Calendar,
      label: "Events/Year",
      value: 50,
      suffix: "+",
    },
    {
      icon: Award,
      label: "PDUs Offered",
      value: 1000,
      suffix: "+",
    },
    {
      icon: Building,
      label: "Certification Partners",
      value: 15,
      suffix: "+",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-y border-primary-100 dark:border-primary-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}