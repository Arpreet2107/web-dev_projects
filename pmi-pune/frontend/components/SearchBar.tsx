"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SearchResult {
  type: "event" | "resource" | "page";
  title: string;
  slug: string;
  description?: string;
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const [eventsRes, resourcesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/events?filters[title][$containsi]=${query}&populate=*`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/resources?filters[title][$containsi]=${query}&populate=*`),
        ]);

        const eventsData = await eventsRes.json();
        const resourcesData = await resourcesRes.json();

        const searchResults: SearchResult[] = [
          ...(eventsData.data || []).map((event: any) => ({
            type: "event" as const,
            title: event.attributes.title,
            slug: event.attributes.slug,
            description: event.attributes.excerpt,
          })),
          ...(resourcesData.data || []).map((resource: any) => ({
            type: "resource" as const,
            title: resource.attributes.title,
            slug: resource.attributes.slug,
            description: resource.attributes.excerpt,
          })),
        ];

        setResults(searchResults.slice(0, 8));
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setQuery("");
    if (result.type === "event") {
      router.push(`/events/${result.slug}`);
    } else if (result.type === "resource") {
      router.push(`/resources#${result.slug}`);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search events, resources..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full md:w-64 pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute top-full mt-2 w-full md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-600">Searching...</div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {result.type === "event" && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                      {result.type === "resource" && (
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{result.title}</p>
                      {result.description && (
                        <p className="text-sm text-gray-600 line-clamp-1">{result.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1 capitalize">{result.type}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-600">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

