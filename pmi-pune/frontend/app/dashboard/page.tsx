"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useDashboard, useUserProfile } from "@/lib/hooks/useUser";
import { useMyRegistrations } from "@/lib/hooks/useRegistrations";
import { usePduLog, usePduTotal, useLogPdu } from "@/lib/hooks/usePdu";
import { useUpdateProfile } from "@/lib/hooks/useUser";
import { Calendar, Award, FileText, User, Plus, TrendingUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

const pduSchema = z.object({
  date: z.string(),
  activity: z.string().min(1),
  credits: z.number().int().positive(),
  category: z.string().optional(),
});

const profileSchema = z.object({
  name: z.string().min(1),
  pmiNumber: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  bio: z.string().optional(),
});

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "events" | "pdu" | "profile">("overview");
  const { data: dashboardData, isLoading: dashboardLoading } = useDashboard();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: registrations, isLoading: registrationsLoading } = useMyRegistrations();
  const { data: pduLog, isLoading: pduLogLoading } = usePduLog();
  const { data: pduTotal } = usePduTotal();
  const logPdu = useLogPdu();
  const updateProfile = useUpdateProfile();

  const {
    register: registerPdu,
    handleSubmit: handleSubmitPdu,
    formState: { errors: pduErrors },
    reset: resetPdu,
  } = useForm({
    resolver: zodResolver(pduSchema),
  });

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    values: profile ? {
      name: profile.name || "",
      pmiNumber: profile.profile?.pmiNumber || "",
      company: profile.profile?.company || "",
      jobTitle: profile.profile?.jobTitle || "",
      bio: profile.profile?.bio || "",
    } : undefined,
  });

  const onPduSubmit = async (data: any) => {
    try {
      await logPdu.mutateAsync(data);
      resetPdu();
      alert("PDU logged successfully!");
    } catch (error) {
      alert("Failed to log PDU");
    }
  };

  const onProfileSubmit = async (data: any) => {
    try {
      await updateProfile.mutateAsync(data);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "events", label: "My Events", icon: Calendar },
              { id: "pdu", label: "PDU Tracker", icon: Award },
              { id: "profile", label: "Profile", icon: User },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {dashboardLoading ? (
              <div className="text-center py-12">Loading...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Upcoming Events</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">
                          {dashboardData?.upcomingRegistrations?.length || 0}
                        </p>
                      </div>
                      <Calendar className="w-12 h-12 text-blue-600" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total PDU Credits</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">
                          {pduTotal?.total || 0}
                        </p>
                      </div>
                      <Award className="w-12 h-12 text-blue-600" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Resources Downloaded</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">
                          {dashboardData?.recentResources?.length || 0}
                        </p>
                      </div>
                      <FileText className="w-12 h-12 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Events</h2>
                  {dashboardData?.upcomingRegistrations?.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardData.upcomingRegistrations.map((reg: any) => (
                        <div key={reg.id} className="border-b border-gray-200 pb-4 last:border-0">
                          <h3 className="font-semibold text-gray-800">{reg.eventTitle}</h3>
                          <p className="text-sm text-gray-600">
                            Registered on {format(new Date(reg.createdAt), "MMM dd, yyyy")}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No upcoming events</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div>
            {registrationsLoading ? (
              <div className="text-center py-12">Loading...</div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {registrations?.map((reg) => (
                      <tr key={reg.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{reg.eventTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(reg.createdAt), "MMM dd, yyyy")}
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
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!registrations || registrations.length === 0 && (
                  <div className="text-center py-12 text-gray-600">No registrations yet</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* PDU Tab */}
        {activeTab === "pdu" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">PDU Summary</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Total Credits</p>
                  <p className="text-3xl font-bold text-blue-600">{pduTotal?.total || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600">From Events</p>
                  <p className="text-2xl font-semibold text-gray-800">{pduTotal?.eventTotal || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600">Manual Log</p>
                  <p className="text-2xl font-semibold text-gray-800">{pduTotal?.manualTotal || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Log PDU</h2>
              <form onSubmit={handleSubmitPdu(onPduSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    {...registerPdu("date")}
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {pduErrors.date && pduErrors.date.message && (
                    <p className="text-sm text-red-600 mt-1">{String(pduErrors.date.message)}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
                  <input
                    {...registerPdu("activity")}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {pduErrors.activity && pduErrors.activity.message && (
                    <p className="text-sm text-red-600 mt-1">{String(pduErrors.activity.message)}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                  <input
                    {...registerPdu("credits", { valueAsNumber: true })}
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {pduErrors.credits && pduErrors.credits.message && (
                    <p className="text-sm text-red-600 mt-1">{String(pduErrors.credits.message)}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Log PDU
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">PDU History</h2>
              {pduLogLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : pduLog && pduLog.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pduLog.map((log) => (
                        <tr key={log.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {format(new Date(log.date), "MMM dd, yyyy")}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{log.activity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.credits}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.category || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">No PDU entries yet</p>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
            {profileLoading ? (
              <div className="text-center py-12">Loading...</div>
            ) : (
              <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    {...registerProfile("name")}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {profileErrors.name && profileErrors.name.message && (
                    <p className="text-sm text-red-600 mt-1">{String(profileErrors.name.message)}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PMI Number</label>
                  <input
                    {...registerProfile("pmiNumber")}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      {...registerProfile("company")}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                      {...registerProfile("jobTitle")}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    {...registerProfile("bio")}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                >
                  Update Profile
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

