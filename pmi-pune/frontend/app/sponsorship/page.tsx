"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Handshake, CheckCircle, AlertCircle, DollarSign, Users, Award } from "lucide-react";

const sponsorshipSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  sponsorshipLevel: z.string().min(1, "Please select a sponsorship level"),
  message: z.string().optional(),
});

type SponsorshipFormData = z.infer<typeof sponsorshipSchema>;

export default function SponsorshipPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SponsorshipFormData>({
    resolver: zodResolver(sponsorshipSchema),
  });

  const onSubmit = async (data: SponsorshipFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact/sponsorship`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError("Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const sponsorshipLevels = [
    {
      name: "Platinum",
      amount: "₹100,000+",
      benefits: [
        "Premium booth at all major events",
        "Logo on all marketing materials",
        "Speaking opportunity at annual conference",
        "10 complimentary event registrations",
        "Featured in newsletter",
      ],
    },
    {
      name: "Gold",
      amount: "₹50,000 - ₹99,999",
      benefits: [
        "Booth at major events",
        "Logo on website and select materials",
        "5 complimentary event registrations",
        "Social media mentions",
      ],
    },
    {
      name: "Silver",
      amount: "₹25,000 - ₹49,999",
      benefits: [
        "Booth at select events",
        "Logo on website",
        "3 complimentary event registrations",
      ],
    },
    {
      name: "Bronze",
      amount: "₹10,000 - ₹24,999",
      benefits: [
        "Logo on website",
        "2 complimentary event registrations",
        "Newsletter mention",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <Handshake className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Sponsorship Opportunities</h1>
            <p className="text-xl text-gray-600">
              Partner with PMI Pune-Deccan Chapter and reach 500+ project management professionals
            </p>
          </div>

          {/* Sponsorship Levels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sponsorshipLevels.map((level) => (
              <div
                key={level.name}
                className="bg-white rounded-lg shadow-lg border-t-4 border-blue-600 p-6 hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{level.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{level.amount}</p>
                <ul className="space-y-2">
                  {level.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Sponsor PMI Pune-Deccan?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2 text-gray-800">Targeted Audience</h3>
                  <p className="text-gray-600">Reach 500+ project management professionals in Pune region</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2 text-gray-800">Brand Visibility</h3>
                  <p className="text-gray-600">Increase brand awareness among decision-makers</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <DollarSign className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2 text-gray-800">ROI</h3>
                  <p className="text-gray-600">Cost-effective marketing to engaged professionals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center max-w-2xl mx-auto">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-green-800">Thank You!</h2>
              <p className="text-green-700">
                We&apos;ve received your sponsorship inquiry. Our team will contact you within 2-3 business days.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Request Sponsorship Information</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("companyName")}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-600 mt-1">{errors.companyName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("contactName")}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.contactName && (
                      <p className="text-sm text-red-600 mt-1">{errors.contactName.message}</p>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sponsorship Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("sponsorshipLevel")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a level</option>
                    {sponsorshipLevels.map((level) => (
                      <option key={level.name} value={level.name}>
                        {level.name} - {level.amount}
                      </option>
                    ))}
                  </select>
                  {errors.sponsorshipLevel && (
                    <p className="text-sm text-red-600 mt-1">{errors.sponsorshipLevel.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your company and how you'd like to partner with us"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

