import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Award, BookOpen, Users, CheckCircle, ArrowRight } from "lucide-react";

export default function CertificationsPage() {
  const certifications = [
    {
      name: "PMP",
      fullName: "Project Management Professional",
      description: "The most recognized project management certification globally, validating your ability to manage projects effectively.",
      benefits: [
        "Higher earning potential",
        "Global recognition",
        "Career advancement",
        "Professional credibility",
      ],
      examDetails: {
        duration: "230 minutes",
        questions: "180 questions",
        format: "Multiple choice",
        prerequisites: "4-year degree + 3 years experience OR High school + 5 years experience",
      },
      color: "blue",
    },
    {
      name: "CAPM",
      fullName: "Certified Associate in Project Management",
      description: "Entry-level certification for project managers, perfect for those starting their project management career.",
      benefits: [
        "Foundation knowledge",
        "Career entry point",
        "PMI recognition",
        "Learning path to PMP",
      ],
      examDetails: {
        duration: "180 minutes",
        questions: "150 questions",
        format: "Multiple choice",
        prerequisites: "High school diploma + 23 hours of project management education",
      },
      color: "green",
    },
    {
      name: "PMI-ACP",
      fullName: "PMI Agile Certified Practitioner",
      description: "Validates your knowledge of agile principles and practices across various agile methodologies.",
      benefits: [
        "Agile expertise",
        "Modern methodology",
        "Team collaboration",
        "Flexible approach",
      ],
      examDetails: {
        duration: "180 minutes",
        questions: "120 questions",
        format: "Multiple choice",
        prerequisites: "2,000 hours of general project experience + 1,500 hours of agile experience",
      },
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-gray-800">PMI Certifications</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advance your career with globally recognized project management certifications.
              Get expert guidance and support from PMI Pune-Deccan Chapter.
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className={`bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-${cert.color}-600 hover:shadow-xl transition`}
              >
                <div className={`bg-${cert.color}-600 text-white p-6`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-8 h-8" />
                    <div>
                      <h2 className="text-2xl font-bold">{cert.name}</h2>
                      <p className="text-sm opacity-90">{cert.fullName}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{cert.description}</p>
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Key Benefits:</h3>
                    <ul className="space-y-1">
                      {cert.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Exam Details:</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Duration:</span> {cert.examDetails.duration}</p>
                      <p><span className="font-medium">Questions:</span> {cert.examDetails.questions}</p>
                      <p><span className="font-medium">Format:</span> {cert.examDetails.format}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Training Partners Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-12">
            <div className="flex items-start gap-4">
              <BookOpen className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Training Partners</h2>
                <p className="text-gray-700 mb-4">
                  We partner with leading training providers in Pune to offer comprehensive certification
                  preparation courses. Our partners provide:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Expert instructors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Comprehensive study materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Practice exams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Exam application support</span>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Contact for Training Info
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Study Groups Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Study Groups</h2>
                <p className="text-gray-700 mb-4">
                  Join our certification study groups to connect with fellow candidates, share resources,
                  and prepare together for your PMI certification exam.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-gray-800">PMP Study Group</h3>
                    <p className="text-sm text-gray-600">
                      Weekly sessions covering PMBOK Guide, practice questions, and exam strategies.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-gray-800">CAPM Study Group</h3>
                    <p className="text-sm text-gray-600">
                      Foundation concepts, terminology, and exam preparation for entry-level certification.
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mt-4"
                >
                  Join a Study Group
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Certified?</h2>
            <p className="text-xl mb-6 opacity-90">
              Start your certification journey today with support from PMI Pune-Deccan Chapter.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/membership"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Become a Member
              </Link>
              <Link
                href="/events"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                View Certification Events
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

