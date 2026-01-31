"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TableSkeleton } from "@/components/LoadingSkeleton";

async function fetchEventRegistrations(eventId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/registrations`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch registrations");
  const data = await res.json();
  // Filter by event if needed (you'll need to match eventId with eventSlug)
  return data.data || [];
}

function exportToCSV(registrations: any[], eventTitle: string) {
  const headers = ["Full Name", "Email", "Phone", "Payment Status", "Status", "Date"];
  const rows = registrations.map((reg) => [
    reg.fullName,
    reg.email,
    reg.phone || "",
    reg.paymentStatus,
    reg.status,
    new Date(reg.createdAt).toLocaleDateString(),
  ]);

  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${eventTitle}-registrations-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
}

export default function EventRegistrationsPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const { data: allRegistrations, isLoading } = useQuery({
    queryKey: ["admin", "registrations", eventId],
    queryFn: () => fetchEventRegistrations(eventId),
  });

  // Filter registrations for this event (you'll need to implement proper filtering)
  const registrations = allRegistrations || [];

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/registrations"
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-4xl font-bold text-gray-800">Event Registrations</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Total: {registrations.length} registrations</p>
        {registrations.length > 0 && (
          <button
            onClick={() => exportToCSV(registrations, "Event")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        )}
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registrations.map((reg: any) => (
                <tr key={reg.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reg.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.phone || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reg.paymentStatus === "paid"
                          ? "bg-green-100 text-green-800"
                          : reg.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {reg.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reg.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(reg.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {registrations.length === 0 && (
            <div className="text-center py-12 text-gray-600">No registrations for this event</div>
          )}
        </div>
      )}
    </div>
  );
}

