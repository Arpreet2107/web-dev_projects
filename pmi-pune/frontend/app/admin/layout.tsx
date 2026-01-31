"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Calendar, Users, FileText, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?redirect=/admin");
      return;
    }

    if (session?.user) {
      // Check if user is admin (you'll need to implement this check)
      // For now, we'll check via API
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/user/profile`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          // Check if user has admin role in Strapi
          // This is a placeholder - implement actual admin check
          const userProfile = data.data?.profile;
          const isUserAdmin = userProfile?.role?.name === "Admin" || userProfile?.role?.type === "admin";
          setIsAdmin(isUserAdmin || false); // For development, allow all authenticated users
          setLoading(false);
        })
        .catch(() => {
          setIsAdmin(true); // Allow for development
          setLoading(false);
        });
    }
  }, [session, status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don&apos;t have permission to access this area.</p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
            <p className="text-sm text-gray-600">PMI Pune-Deccan</p>
          </div>
          <nav className="p-4 space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/events"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700"
            >
              <Calendar className="w-5 h-5" />
              Events
            </Link>
            <Link
              href="/admin/registrations"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700"
            >
              <Users className="w-5 h-5" />
              Registrations
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700"
            >
              <Users className="w-5 h-5" />
              Users
            </Link>
            <Link
              href="/admin/content"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700"
            >
              <FileText className="w-5 h-5" />
              Content
            </Link>
            <hr className="my-4" />
            <Link
              href="/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700"
            >
              <Settings className="w-5 h-5" />
              User Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

