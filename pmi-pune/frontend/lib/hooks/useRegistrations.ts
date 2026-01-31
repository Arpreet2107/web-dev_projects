import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export interface Registration {
  id: string;
  eventSlug: string;
  eventTitle: string;
  fullName: string;
  email: string;
  phone?: string;
  paymentStatus: string;
  status: string;
  createdAt: string;
}

export function useMyRegistrations() {
  const { data: session } = useSession();
  
  return useQuery({
    queryKey: ["registrations", "my"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/registrations/my-registrations`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch registrations");
      const data = await res.json();
      return data.data as Registration[];
    },
    enabled: !!session,
  });
}

export function useCreateRegistration() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      eventSlug: string;
      eventTitle: string;
      fullName: string;
      email: string;
      phone?: string;
    }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create registration");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });
}

