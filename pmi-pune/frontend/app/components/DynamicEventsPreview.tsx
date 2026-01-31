import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

interface Event {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    startDateTime: string;
    venue: string;
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

async function getUpcomingEvents(): Promise<Event[]> {
  try {
    const now = new Date().toISOString();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/events?filters[isActive][$eq]=true&filters[startDateTime][$gte]=${now}&sort=startDateTime:asc&pagination[limit]=3&populate=featuredImage`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default async function DynamicEventsPreview() {
  const events = await getUpcomingEvents();

  if (events.length === 0) {
    return (
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground mb-8">
            No upcoming events at this time. Check back soon!
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-muted-foreground">
              Join our next chapter meetings and workshops
            </p>
          </div>
          <Link
            href="/events"
            className="hidden md:inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg group"
          >
            View Full Calendar
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Visual Calendar Strip */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 overflow-x-auto pb-4">
            {events.map((event, index) => {
              const date = new Date(event.attributes.startDateTime);
              const isToday = new Date().toDateString() === date.toDateString();

              return (
                <div
                  key={event.id}
                  className={`flex-shrink-0 text-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                    index === 0
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-950 shadow-lg scale-105"
                      : "border-primary-200 dark:border-primary-800 hover:border-primary-300 dark:hover:border-primary-700"
                  }`}
                >
                  <div className="text-2xl font-display font-bold text-foreground">
                    {date.toLocaleDateString("en-US", { month: "short" })}
                  </div>
                  <div className={`text-3xl font-bold ${isToday ? "text-primary-600" : "text-foreground"}`}>
                    {date.getDate()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const date = new Date(event.attributes.startDateTime);

            return (
              <div
                key={event.id}
                className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {event.attributes.featuredImage?.data && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${event.attributes.featuredImage.data.attributes.url}`}
                      alt={event.attributes.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {event.attributes.title}
                  </h3>

                  {event.attributes.venue && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{event.attributes.venue}</span>
                    </div>
                  )}

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {event.attributes.excerpt}
                  </p>

                  <Link
                    href={`/events/${event.attributes.slug}`}
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden text-center mt-12">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            View Full Calendar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}