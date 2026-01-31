"use client";

import { ExternalLink, FileText, Calendar, Users, Image } from "lucide-react";

export default function AdminContentPage() {
  const strapiBaseUrl = "http://localhost:1337/admin";

  const contentLinks = [
    {
      title: "Events",
      description: "Manage chapter events and activities",
      icon: Calendar,
      url: `${strapiBaseUrl}/content-manager/collection-types/api::event.event`,
    },
    {
      title: "Resources",
      description: "Manage templates, whitepapers, and guides",
      icon: FileText,
      url: `${strapiBaseUrl}/content-manager/collection-types/api::resource.resource`,
    },
    {
      title: "Members",
      description: "Manage member profiles and testimonials",
      icon: Users,
      url: `${strapiBaseUrl}/content-manager/collection-types/api::member.member`,
    },
    {
      title: "Partners",
      description: "Manage partner logos and information",
      icon: Image,
      url: `${strapiBaseUrl}/content-manager/collection-types/api::partner.partner`,
    },
    {
      title: "Pages",
      description: "Manage dynamic pages",
      icon: FileText,
      url: `${strapiBaseUrl}/content-manager/collection-types/api::page.page`,
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Content Management</h1>
      <p className="text-gray-600 mb-8">
        Click on any content type to open it in the Strapi admin panel for editing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentLinks.map((link) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <link.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{link.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{link.description}</p>
                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                  <span>Open in Strapi</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

