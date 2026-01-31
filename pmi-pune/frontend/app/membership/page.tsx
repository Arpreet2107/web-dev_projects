"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, DollarSign, Users, Award, BookOpen, AlertCircle } from "lucide-react";

const membershipFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  pmiNumber: z.string().min(1, "PMI number is required"),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  membershipType: z.enum(["new", "renewal"], {
    required_error: "Please select membership type",
  }),
});

type MembershipFormData = z.infer<typeof membershipFormSchema>;

export default function MembershipPage() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MembershipFormData>({
    resolver: zodResolver(membershipFormSchema),
  });

  const onSubmit = async (data: MembershipFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/membership/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError("Failed to submit application. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-gray-800">Membership</h1>
            <p className="text-xl text-gray-600">
              Join PMI Pune-Deccan India Chapter and unlock exclusive benefits
            </p>
          </div>

          {/* Membership Benefits - Enhanced */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Membership Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Professional Networking",
                  description: "Connect with 500+ project management professionals and build lasting relationships.",
                  color: "blue",
                },
                {
                  icon: BookOpen,
                  title: "Educational Events",
                  description: "Access workshops, seminars, and training sessions led by industry experts.",
                  color: "green",
                },
                {
                  icon: Award,
                  title: "Certification Support",
                  description: "Get guidance for PMP, CAPM, and other certifications with study groups.",
                  color: "purple",
                },
                {
                  icon: BookOpen,
                  title: "Resource Library",
                  description: "Access templates, whitepapers, guides, and valuable project management resources.",
                  color: "orange",
                },
                {
                  icon: Users,
                  title: "Leadership Opportunities",
                  description: "Volunteer for chapter leadership roles and develop your leadership skills.",
                  color: "indigo",
                },
                {
                  icon: Award,
                  title: "PDU Tracking",
                  description: "Track and manage your Professional Development Units (PDUs) in one place.",
                  color: "pink",
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition"
                >
                  <div className={`bg-${benefit.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                    <benefit.icon className={`w-8 h-8 text-${benefit.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Membership Fees */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-16">
            <div className="flex items-start gap-4 mb-6">
              <DollarSign className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Membership Fees</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">New Membership</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-2">₹2,500</p>
                    <p className="text-gray-600 text-sm">Annual membership fee for new members</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Renewal</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-2">₹2,000</p>
                    <p className="text-gray-600 text-sm">Annual renewal fee for existing members</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  * Note: You must be a PMI Global member first. Chapter membership is in addition to PMI Global membership.
                </p>
              </div>
            </div>
          </section>

          {/* How to Join */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">How to Become a Member</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Step 1: Join PMI Global</h3>
                <p className="text-gray-600 mb-4">
                  First, become a member of PMI Global at{" "}
                  <a href="https://www.pmi.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    pmi.org
                  </a>
                  . This is a prerequisite for chapter membership.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Step 2: Complete Application</h3>
                <p className="text-gray-600 mb-4">
                  Fill out the membership application form below with your details and PMI Global membership number.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Step 3: Payment</h3>
                <p className="text-gray-600 mb-4">
                  Complete the payment for annual membership fees. We accept online payments via Razorpay.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Step 4: Welcome!</h3>
                <p className="text-gray-600 mb-4">
                  Once approved, you&apos;ll receive a welcome email with access to member-only resources and events.
                </p>
              </div>
            </div>
          </section>

          {/* Application Form */}
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center max-w-2xl mx-auto">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-green-800">Application Submitted!</h2>
              <p className="text-green-700 mb-4">
                Thank you for your interest in joining PMI Pune-Deccan Chapter. We&apos;ve received your application
                and will review it shortly. You&apos;ll receive a confirmation email with next steps.
              </p>
            </div>
          ) : (
            <section className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Membership Application</h2>
                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Apply Now
                  </button>
                )}
              </div>

              {showForm && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Membership Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center gap-2 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          {...register("membershipType")}
                          type="radio"
                          value="new"
                          className="w-4 h-4 text-blue-600"
                        />
                        <span>New Membership</span>
                      </label>
                      <label className="flex items-center gap-2 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          {...register("membershipType")}
                          type="radio"
                          value="renewal"
                          className="w-4 h-4 text-blue-600"
                        />
                        <span>Renewal</span>
                      </label>
                    </div>
                    {errors.membershipType && (
                      <p className="text-sm text-red-600 mt-1">{errors.membershipType.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("fullName")}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PMI Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("pmiNumber")}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.pmiNumber && (
                        <p className="text-sm text-red-600 mt-1">{errors.pmiNumber.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        {...register("company")}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <input
                        {...register("jobTitle")}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-800">
                      <AlertCircle className="w-5 h-5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </section>
          )}

          {/* CTA Section */}
          <section className="mt-16 bg-blue-600 text-white rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Questions About Membership?</h2>
            <p className="text-xl mb-8 opacity-95">
              Our team is here to help you with any questions about joining or renewing your membership.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              Contact Us
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
