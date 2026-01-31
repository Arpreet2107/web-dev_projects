"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SecretSurpriseContent } from "@/components/secret-surprise-content";
import { HeartLoader } from "@/components/heart-loader";

export default function SecretPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const correctPassword =
    process.env.NEXT_PUBLIC_SECRET_PASSWORD || "octopuff2024";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (password === correctPassword) {
        setIsAuthenticated(true);
      } else {
        setError("Incorrect password. Try again, my love 💕");
        setIsLoading(false);
      }
    }, 500);
  };

  if (isAuthenticated) {
    return <SecretSurpriseContent />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-romantic p-4">
      <div className="glass rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-3xl font-romantic text-center mb-6 text-romantic-rose glow-pink">
          Secret Surprise 💎
        </h1>
        <p className="text-center mb-6 text-muted-foreground">
          Enter the special password to unlock your surprise
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-romantic-rose text-foreground"
            autoFocus
            aria-label="Password input"
          />
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-romantic-pink to-romantic-purple text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Checking..." : "Unlock Surprise"}
          </button>
        </form>
        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

