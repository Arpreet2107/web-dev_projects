"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  eventSlug: string;
  eventTitle: string;
  registrationFee: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function RazorpayCheckout({
  eventSlug,
  eventTitle,
  registrationFee,
  onSuccess,
  onError,
}: RazorpayCheckoutProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!session?.user) {
      onError("Please login to register for events");
      return;
    }

    if (!razorpayLoaded || !window.Razorpay) {
      onError("Payment gateway not loaded. Please refresh the page.");
      return;
    }

    setIsLoading(true);

    try {
      // Create order
      const orderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/registrations/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            eventSlug,
            eventTitle,
            fullName: session.user.name || session.user.email || "",
            email: session.user.email || "",
          }),
        }
      );

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const orderData = await orderResponse.json();

      // Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: orderData.data.amount * 100, // Convert to paise
        currency: "INR",
        name: "PMI Pune-Deccan Chapter",
        description: `Registration for ${eventTitle}`,
        order_id: orderData.data.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/registrations/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            if (verifyResponse.ok) {
              onSuccess();
            } else {
              onError("Payment verification failed");
            }
          } catch (error) {
            onError("Error verifying payment");
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: session.user.name || "",
          email: session.user.email || "",
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      onError(error.message || "Failed to initiate payment");
      setIsLoading(false);
    }
  };

  if (registrationFee === 0) {
    return (
      <button
        onClick={async () => {
          if (!session?.user) {
            onError("Please login to register");
            return;
          }
          setIsLoading(true);
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/registrations`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  eventSlug,
                  eventTitle,
                  fullName: session.user.name || session.user.email || "",
                  email: session.user.email || "",
                }),
              }
            );
            if (response.ok) {
              onSuccess();
            } else {
              onError("Registration failed");
            }
          } catch (error) {
            onError("Registration failed");
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isLoading ? "Registering..." : "Register for Free"}
      </button>
    );
  }

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading || !razorpayLoaded}
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </>
      ) : (
        `Pay ₹${registrationFee.toFixed(2)} to Register`
      )}
    </button>
  );
}

