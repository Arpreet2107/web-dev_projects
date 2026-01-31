"use client";

import { useSession, signOut } from "next-auth/react";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session?.user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-gray-700 hover:text-blue-600 transition font-medium"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
      >
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-5 h-5 text-blue-600" />
          )}
        </div>
        <span className="hidden md:block font-medium">
          {session.user.name || session.user.email}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard?tab=profile"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <hr className="my-2" />
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

