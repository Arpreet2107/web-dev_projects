"use client";

import { useQuery } from "@tanstack/react-query";
import { Calendar, Users, DollarSign, Award, TrendingUp, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

async function fetchAdminStats() {
  const [eventsRes, regRes, usersRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/events?pagination[limit]=100`, {
      credentials: "include",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/registrations`, {
      credentials: "include",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/users?pagination[limit]=100`, {
      credentials: "include",
    }),
  ]);

  const events = await eventsRes.json();
  const registrations = await regRes.json();
  const users = await usersRes.json();

  // Calculate revenue
  const paidRegistrations = registrations.data?.filter((r: any) => r.paymentStatus === "paid") || [];
  const revenue = paidRegistrations.reduce((sum: number, reg: any) => {
    // This would need event fee from event data - simplified for now
    return sum + 0; // TODO: Calculate actual revenue
  }, 0);

  // Prepare chart data (last 6 months)
  const chartData = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthRegistrations = registrations.data?.filter((r: any) => {
      const regDate = new Date(r.createdAt);
      return regDate.getMonth() === date.getMonth() && regDate.getFullYear() === date.getFullYear();
    }) || [];
    chartData.push({
      month: date.toLocaleDateString("en-US", { month: "short" }),
      registrations: monthRegistrations.length,
    });
  }

  return {
    totalEvents: events.data?.length || 0,
    totalRegistrations: registrations.data?.length || 0,
    activeEvents: events.data?.filter((e: any) => e.attributes?.isActive).length || 0,
    totalUsers: users.length || 0,
    revenue,
    chartData,
  };
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: fetchAdminStats,
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Events</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.totalEvents || 0}</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Events</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.activeEvents || 0}</p>
              </div>
              <Calendar className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Registrations</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.totalRegistrations || 0}</p>
              </div>
              <Users className="w-12 h-12 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">₹{stats?.revenue || 0}</p>
              </div>
              <DollarSign className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Members</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.totalUsers || 0}</p>
              </div>
              <Users className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
        </div>
      )}

      {/* Analytics Charts */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Registration Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="registrations" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Monthly Registrations
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="registrations" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="http://localhost:1337/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition text-center"
          >
            <FileText className="w-8 h-8 mx-auto mb-2 text-gray-600" />
            <p className="font-semibold">Manage Content</p>
            <p className="text-sm text-gray-600">Open Strapi Admin</p>
          </a>
          <a
            href="/admin/events"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition text-center"
          >
            <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-600" />
            <p className="font-semibold">Manage Events</p>
            <p className="text-sm text-gray-600">View all events</p>
          </a>
          <a
            href="/admin/registrations"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition text-center"
          >
            <Users className="w-8 h-8 mx-auto mb-2 text-gray-600" />
            <p className="font-semibold">View Registrations</p>
            <p className="text-sm text-gray-600">Manage registrations</p>
          </a>
        </div>
      </div>
    </div>
  );
}

