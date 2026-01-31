import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export interface PduLog {
  id: string;
  date: string;
  activity: string;
  credits: number;
  category?: string;
}

export function usePduLog() {
  const { data: session } = useSession();
  
  return useQuery({
    queryKey: ["pdu", "log"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/pdu/log`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch PDU log");
      const data = await res.json();
      return data.data as PduLog[];
    },
    enabled: !!session,
  });
}

export function usePduTotal() {
  const { data: session } = useSession();
  
  return useQuery({
    queryKey: ["pdu", "total"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/pdu/total`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch PDU total");
      const data = await res.json();
      return data.data;
    },
    enabled: !!session,
  });
}

export function useLogPdu() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      date: string;
      activity: string;
      credits: number;
      category?: string;
    }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/pdu/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to log PDU");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pdu"] });
    },
  });
}

