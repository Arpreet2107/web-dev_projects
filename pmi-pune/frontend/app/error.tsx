"use client";

import { useEffect } from "react";
import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong!</h1>
          <p className="text-gray-600 mb-8">
            We encountered an unexpected error. Please try again.
          </p>
          {process.env.NODE_ENV === "development" && (
            <div className="mb-6 p-4 bg-red-50 rounded text-left text-sm text-red-800">
              <p className="font-semibold">{error.name}</p>
              <p>{error.message}</p>
            </div>
          )}
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

