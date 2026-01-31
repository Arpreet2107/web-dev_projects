"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Users, CheckCircle, AlertCircle } from "lucide-react";

const volunteerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  pmiNumber: z.string().optional(),
  areasOfInterest: z.array(z.string()).min(1, "Select at least one area"),
  experience: z.string().min(1, "Please describe your experience"),
  availability: z.string().min(1, "Please describe your availability"),
  motivation: z.string().min(1, "Please tell us why you want to volunteer"),
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

export default function VolunteerPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
  });

  const areasOfInterest = watch("areasOfInterest") || [];

  const toggleArea = (area: string) => {
    const current = areasOfInterest;
    if (current.includes(area)) {
      setValue("areasOfInterest", current.filter((a) => a !== area));
    } else {
      setValue("areasOfInterest", [...current, area]);
    }
  };

  const onSubmit = async (data: VolunteerFormData) => {
    try {
      // TODO: Send to backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact/volunteer`, {
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

  const volunteerAreas = [
    "Event Planning & Management",
    "Membership & Recruitment",
    "Marketing & Communications",
    "Education & Training",
    "Technology & Web",
    "Finance & Administration",
    "Community Outreach",
    "Certification Support",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Become a Volunteer</h1>
            <p className="text-xl text-gray-600">
              Join our team of dedicated volunteers and help shape the future of project management in Pune
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-green-800">Thank You!</h2>
              <p className="text-green-700 mb-4">
                We&apos;ve received your volunteer application. Our team will review it and get back to you soon.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PMI Number (Optional)
                    </label>
                    <input
                      {...register("pmiNumber")}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Interest <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {volunteerAreas.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => toggleArea(area)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition ${
                          areasOfInterest.includes(area)
                            ? "border-blue-600 bg-blue-50 text-blue-800"
                            : "border-gray-300 bg-white text-gray-700 hover:border-blue-300"
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                  {errors.areasOfInterest && (
                    <p className="text-sm text-red-600 mt-1">{errors.areasOfInterest.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relevant Experience <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("experience")}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your relevant experience in project management or volunteer work"
                  />
                  {errors.experience && (
                    <p className="text-sm text-red-600 mt-1">{errors.experience.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("availability")}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="How many hours per week can you commit? What days/times work best for you?"
                  />
                  {errors.availability && (
                    <p className="text-sm text-red-600 mt-1">{errors.availability.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to volunteer? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("motivation")}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us what motivates you to volunteer with PMI Pune-Deccan Chapter"
                  />
                  {errors.motivation && (
                    <p className="text-sm text-red-600 mt-1">{errors.motivation.message}</p>
                  )}
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
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </div>
          )}

          <div className="mt-12 bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Volunteer Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Leadership development opportunities",
                "Networking with industry professionals",
                "PDU credits for volunteer work",
                "Recognition and appreciation",
                "Skill development in various areas",
                "Contribution to the PM community",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

