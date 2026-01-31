"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Download, Filter } from "lucide-react";
import { ResourceCardSkeleton } from "@/components/LoadingSkeleton";
import Image from "next/image";

interface Resource {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    excerpt: string;
    resourceType: string;
    category: string;
    file?: {
      data?: {
        attributes: {
          url: string;
          name: string;
        };
      };
    };
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

async function fetchResources() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/resources?populate=file,featuredImage`
  );
  if (!res.ok) throw new Error("Failed to fetch resources");
  const data = await res.json();
  return data.data || [];
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
  });

  const filteredResources = resources?.filter((resource: Resource) => {
    const matchesSearch =
      resource.attributes.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.attributes.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || resource.attributes.resourceType === typeFilter;
    const matchesCategory = categoryFilter === "all" || resource.attributes.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleDownload = async (resource: Resource) => {
    if (resource.attributes.file?.data) {
      const fileUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${resource.attributes.file.data.attributes.url}`;
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Resource Library</h1>
          <p className="text-lg text-gray-600 mb-8">
            Access templates, whitepapers, case studies, and guides to enhance your project management skills.
          </p>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Types</option>
                  <option value="Template">Template</option>
                  <option value="Whitepaper">Whitepaper</option>
                  <option value="Case Study">Case Study</option>
                  <option value="Guide">Guide</option>
                </select>
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Categories</option>
                  <option value="Agile">Agile</option>
                  <option value="Risk">Risk</option>
                  <option value="PMP">PMP</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ResourceCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredResources && filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource: Resource) => (
                <div
                  key={resource.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  {resource.attributes.featuredImage?.data && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${resource.attributes.featuredImage.data.attributes.url}`}
                        alt={resource.attributes.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mr-2">
                        {resource.attributes.resourceType}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {resource.attributes.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">{resource.attributes.title}</h2>
                    <div
                      className="text-gray-600 mb-4 line-clamp-3 text-sm"
                      dangerouslySetInnerHTML={{ __html: resource.attributes.excerpt || resource.attributes.description }}
                    />
                    {resource.attributes.file?.data && (
                      <button
                        onClick={() => handleDownload(resource)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">No resources found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
