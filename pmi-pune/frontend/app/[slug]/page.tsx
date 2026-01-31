import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

interface Page {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: any[];
  };
}

async function getPage(slug: string): Promise<Page | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/strapi/pages?filters[slug][$eq]=${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

function renderContent(content: any[]) {
  return content.map((block, index) => {
    switch (block.__component) {
      case "default.rich-text":
        return (
          <div
            key={index}
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: block.body }}
          />
        );
      case "default.image":
        if (!block.file?.url) return null;
        return (
          <div key={index} className="my-6">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${block.file.url}`}
                alt={block.alt || ""}
                fill
                sizes="100vw"
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        );
      case "default.cta":
        return (
          <div key={index} className="my-6">
            <a
              href={block.url}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {block.label}
            </a>
          </div>
        );
      default:
        return null;
    }
  });
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">{page.attributes.title}</h1>
          <div className="bg-white p-8 rounded-lg shadow-md">
            {renderContent(page.attributes.content || [])}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

