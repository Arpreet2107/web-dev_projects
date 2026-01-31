import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">About PMI Pune-Deccan</h1>
          <div className="prose max-w-none text-gray-700">
            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-lg mb-4">
                The PMI Pune-Deccan India Chapter is dedicated to advancing the practice,
                science, and profession of project management in Pune and surrounding regions. We
                strive to create a vibrant community where project management professionals can
                connect, learn, and grow together.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">Who We Are</h2>
              <p className="text-lg mb-4">
                As a local chapter of the Project Management Institute (PMI), we bring together
                project managers, program managers, portfolio managers, and other professionals
                interested in project management. Our chapter serves the Pune-Deccan region,
                providing local networking opportunities, educational events, and professional
                development resources.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">What We Do</h2>
              <ul className="list-disc list-inside space-y-3 text-lg">
                <li>Organize monthly chapter meetings and networking events</li>
                <li>Conduct workshops and training sessions on project management topics</li>
                <li>Support members pursuing PMP and other certifications</li>
                <li>Provide access to project management resources and templates</li>
                <li>Facilitate knowledge sharing among members</li>
                <li>Engage with the local business community to promote project management</li>
              </ul>
            </section>

            <section className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get Involved</h2>
              <p className="text-gray-700 mb-4">
                Whether you&apos;re an experienced project manager or just starting your journey,
                there&apos;s a place for you in our chapter. Join us at our next event or reach
                out to learn more about membership opportunities.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

