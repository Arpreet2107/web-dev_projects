import { useQuery } from "@tanstack/react-query";

export interface Event {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    description: string;
    startDateTime: string;
    endDateTime?: string;
    venue: string;
    venueAddress?: string;
    venueMapLink?: string;
    registrationFee: number;
    maxAttendees: number;
    availableSeats: number;
    pduCredits: number;
    isActive: boolean;
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    gallery?: {
      data?: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
  };
}

async function fetchEvents(filters?: {
  isActive?: boolean;
  startDateTime?: string;
  pduCredits?: boolean;
  free?: boolean;
}) {
  let url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/events?populate=featuredImage,gallery`;
  
  if (filters?.isActive !== undefined) {
    url += `&filters[isActive][$eq]=${filters.isActive}`;
  }
  if (filters?.startDateTime) {
    url += `&filters[startDateTime][$gte]=${filters.startDateTime}`;
  }
  if (filters?.pduCredits) {
    url += `&filters[pduCredits][$gt]=0`;
  }
  if (filters?.free) {
    url += `&filters[registrationFee][$eq]=0`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  return data.data || [];
}

export function useEvents(filters?: Parameters<typeof fetchEvents>[0]) {
  return useQuery({
    queryKey: ["events", filters],
    queryFn: () => fetchEvents(filters),
  });
}

export async function fetchEventBySlug(slug: string): Promise<Event | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/events?filters[slug][$eq]=${slug}&populate=featuredImage,gallery`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.data?.[0] || null;
}

export function useEvent(slug: string) {
  return useQuery({
    queryKey: ["event", slug],
    queryFn: () => fetchEventBySlug(slug),
    enabled: !!slug,
  });
}

