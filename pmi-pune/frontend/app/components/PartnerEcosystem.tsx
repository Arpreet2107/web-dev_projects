"use client";

import Image from "next/image";

interface Partner {
  id: number;
  attributes: {
    name: string;
    logo?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    websiteUrl?: string;
  };
}

async function getPartners(): Promise<Partner[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/partners?filters[isActive][$eq]=true&populate=logo`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
}

export default async function PartnerEcosystem() {
  const partners = await getPartners();

  if (partners.length === 0) {
    return null;
  }

  // Duplicate partners for seamless marquee effect
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-primary-100 dark:border-primary-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            Partner Ecosystem
          </h2>
          <p className="text-muted-foreground">
            Proud to collaborate with leading organizations in Pune
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300"
              >
                {partner.attributes.logo?.data ? (
                  <a
                    href={partner.attributes.websiteUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative h-16 w-32 md:h-20 md:w-40">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${partner.attributes.logo.data.attributes.url}`}
                        alt={partner.attributes.name}
                        fill
                        className="object-contain hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </a>
                ) : (
                  <div className="h-16 w-32 md:h-20 md:w-40 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground text-center px-2">
                      {partner.attributes.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Custom marquee animation */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            animation: marquee 30s linear infinite;
          }

          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}