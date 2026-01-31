import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  image?: string;
  strapiUserId?: number;
  profile?: any;
}

async function fetchUserProfile(): Promise<UserProfile> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/user/profile`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  const data = await res.json();
  return data.data;
}

export function useUserProfile() {
  const { data: session } = useSession();
  
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: fetchUserProfile,
    enabled: !!session,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<UserProfile>) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
}

export function useDashboard() {
  const { data: session } = useSession();
  
  return useQuery({
    queryKey: ["user", "dashboard"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/user/dashboard`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch dashboard");
      const data = await res.json();
      return data.data;
    },
    enabled: !!session,
  });
}

