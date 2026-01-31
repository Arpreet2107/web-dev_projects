"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RazorpayCheckout from "@/components/payment/RazorpayCheckout";
import Image from "next/image";
import { useEvent } from "@/lib/hooks/useEvents";
import { MapPin, Calendar, DollarSign, Users, Award } from "lucide-react";
import { format } from "date-fns";

interface Event {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    excerpt: string;
    startDateTime: string;
    endDateTime?: string;
    venue: string;
    venueAddress?: string;
    registrationFee?: number;
    maxAttendees?: number;
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export default function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: event, isLoading } = useEvent(params.slug);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
            <p className="text-gray-600">The event you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {event.attributes.featuredImage?.data && (
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${event.attributes.featuredImage.data.attributes.url}`}
                alt={event.attributes.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            {event.attributes.title}
          </h1>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Date & Time</p>
                  <p className="text-gray-700">
                    {format(new Date(event.attributes.startDateTime), "EEEE, MMMM dd, yyyy")}
                  </p>
                  <p className="text-gray-700">
                    {format(new Date(event.attributes.startDateTime), "h:mm a")}
                    {event.attributes.endDateTime && (
                      <> - {format(new Date(event.attributes.endDateTime), "h:mm a")}</>
                    )}
                  </p>
                </div>
              </div>
              {event.attributes.venue && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Venue</p>
                    <p className="text-gray-700">{event.attributes.venue}</p>
                    {event.attributes.venueAddress && (
                      <p className="text-gray-600 text-sm mt-1">{event.attributes.venueAddress}</p>
                    )}
                    {event.attributes.venueMapLink && (
                      <a
                        href={event.attributes.venueMapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                      >
                        View on Map →
                      </a>
                    )}
                  </div>
                </div>
              )}
              {event.attributes.registrationFee !== undefined && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Registration Fee</p>
                    <p className="text-gray-700">
                      ₹{event.attributes.registrationFee.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
              {event.attributes.pduCredits > 0 && (
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">PDU Credits</p>
                    <p className="text-gray-700">{event.attributes.pduCredits} credits</p>
                  </div>
                </div>
              )}
              {event.attributes.maxAttendees && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Available Seats</p>
                    <p className="text-gray-700">
                      {event.attributes.availableSeats || 0} / {event.attributes.maxAttendees}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="prose max-w-none mb-12">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: event.attributes.description }}
            />
          </div>
          {event.attributes.venueMapLink && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Location</h3>
              <iframe
                src={event.attributes.venueMapLink}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          )}
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Register for this Event</h2>
            {registrationSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-800 font-semibold text-lg mb-2">Registration Successful!</p>
                <p className="text-green-700">We&apos;ll send you a confirmation email shortly.</p>
              </div>
            ) : (
              <>
                {registrationError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-800">
                    {registrationError}
                  </div>
                )}
                <RazorpayCheckout
                  eventSlug={event.attributes.slug}
                  eventTitle={event.attributes.title}
                  registrationFee={event.attributes.registrationFee || 0}
                  onSuccess={() => {
                    setRegistrationSuccess(true);
                    setRegistrationError(null);
                  }}
                  onError={(error) => {
                    setRegistrationError(error);
                    setRegistrationSuccess(false);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

