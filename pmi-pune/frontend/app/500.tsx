import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Error500() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">500</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Server Error</h2>
          <p className="text-gray-600 mb-8">
            We&apos;re experiencing some technical difficulties. Please try again later.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Refresh Page
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

