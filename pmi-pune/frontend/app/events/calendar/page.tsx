"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

interface Event {
  id: number;
  attributes: {
    title: string;
    slug: string;
    startDateTime: string;
    venue: string;
    registrationFee: number;
  };
}

async function fetchEvents() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/events?filters[isActive][$eq]=true&populate=*`
  );
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  return data.data || [];
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events-calendar"],
    queryFn: fetchEvents,
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date: Date) => {
    return events.filter((event: Event) => {
      const eventDate = new Date(event.attributes.startDateTime);
      return isSameDay(eventDate, date);
    });
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Event Calendar</h1>
            <Link
              href="/events"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              List View →
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-12">Loading calendar...</div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-blue-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                    className="p-2 hover:bg-blue-700 rounded transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h2 className="text-2xl font-bold">
                    {format(currentDate, "MMMM yyyy")}
                  </h2>
                  <button
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                    className="p-2 hover:bg-blue-700 rounded transition"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {daysInMonth.map((day, idx) => {
                    const dayEvents = getEventsForDate(day);
                    const isToday = isSameDay(day, new Date());
                    const isCurrentMonth = isSameMonth(day, currentDate);

                    return (
                      <div
                        key={idx}
                        className={`min-h-24 p-2 border rounded-lg ${
                          isCurrentMonth ? "bg-white" : "bg-gray-50"
                        } ${isToday ? "ring-2 ring-blue-500" : ""}`}
                      >
                        <div
                          className={`text-sm font-semibold mb-1 ${
                            isToday ? "text-blue-600" : "text-gray-700"
                          }`}
                        >
                          {format(day, "d")}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event: Event) => (
                            <Link
                              key={event.id}
                              href={`/events/${event.attributes.slug}`}
                              className="block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded truncate hover:bg-blue-200 transition"
                            >
                              {event.attributes.title}
                            </Link>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Events List */}
              <div className="border-t p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Upcoming Events</h3>
                <div className="space-y-4">
                  {events
                    .filter((event: Event) => new Date(event.attributes.startDateTime) >= new Date())
                    .slice(0, 5)
                    .map((event: Event) => (
                      <Link
                        key={event.id}
                        href={`/events/${event.attributes.slug}`}
                        className="block p-4 border rounded-lg hover:bg-gray-50 transition"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                            <CalendarIcon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">{event.attributes.title}</h4>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {format(new Date(event.attributes.startDateTime), "MMM dd, yyyy h:mm a")}
                              </span>
                              {event.attributes.venue && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {event.attributes.venue}
                                </span>
                              )}
                            </div>
                          </div>
                          {event.attributes.registrationFee > 0 ? (
                            <div className="text-blue-600 font-semibold">
                              ₹{event.attributes.registrationFee}
                            </div>
                          ) : (
                            <div className="text-green-600 font-semibold">Free</div>
                          )}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

