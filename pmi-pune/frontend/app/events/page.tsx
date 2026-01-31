import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Clock } from "lucide-react";

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

async function getEvents(): Promise<Event[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/events?filters[isActive][$eq]=true&sort=startDateTime:desc&populate=featuredImage`,
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

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-4xl font-bold text-gray-800">All Events</h1>
            <Link
              href="/events/calendar"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Calendar View
            </Link>
          </div>
          {events.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg mb-4">No events available at this time.</p>
              <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                Contact us to learn about upcoming events
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {event.attributes.featuredImage?.data && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${event.attributes.featuredImage.data.attributes.url}`}
                        alt={event.attributes.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 line-clamp-2">
                      {event.attributes.title}
                    </h2>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(event.attributes.startDateTime).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      {event.attributes.venue && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span className="line-clamp-1">{event.attributes.venue}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(event.attributes.startDateTime).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6 line-clamp-3 text-sm">
                      {event.attributes.excerpt}
                    </p>
                    <Link
                      href={`/events/${event.attributes.slug}`}
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      View Details & Register
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

