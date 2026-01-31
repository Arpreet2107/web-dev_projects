"use client";

import { useQuery } from "@tanstack/react-query";
import { TableSkeleton } from "@/components/LoadingSkeleton";

async function fetchUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/users?pagination[limit]=100`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data || [];
}

export default function AdminUsersPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: fetchUsers,
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-gray-800">User Directory</h1>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PMI Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.map((user: any) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.username || user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.pmiNumber || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.company || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.jobTitle || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!users || users.length === 0) && (
            <div className="text-center py-12 text-gray-600">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}

