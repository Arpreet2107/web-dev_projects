"use client";

import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import { EventCardSkeleton } from "@/components/LoadingSkeleton";

async function fetchEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/events?populate=featuredImage&sort=startDateTime:desc`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  return data.data || [];
}

export default function AdminEventsPage() {
  const { data: events, isLoading } = useQuery({
    queryKey: ["admin", "events"],
    queryFn: fetchEvents,
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Events Management</h1>
        <a
          href="http://localhost:1337/admin/content-manager/collection-types/api::event.event"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <ExternalLink className="w-5 h-5" />
          Edit in Strapi
        </a>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events?.map((event: any) => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{event.attributes.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(event.attributes.startDateTime).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        event.attributes.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {event.attributes.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.attributes.availableSeats || 0} / {event.attributes.maxAttendees || "∞"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <Link
                        href={`/events/${event.attributes.slug}`}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                      <Link
                        href={`/admin/registrations/${event.id}`}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Registrations
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!events || events.length === 0) && (
            <div className="text-center py-12 text-gray-600">No events found</div>
          )}
        </div>
      )}
    </div>
  );
}

