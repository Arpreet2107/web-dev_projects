import { useState, useEffect } from "react";
import { getCountdown, type CountdownTime } from "@/lib/countdown";

export function useCountdown(
  targetDate: string,
  timezone: string = "Asia/Kolkata",
  onComplete?: () => void
): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>(() =>
    getCountdown(targetDate, timezone)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown = getCountdown(targetDate, timezone);
      setCountdown(newCountdown);

      if (newCountdown.isPast && onComplete && !countdown.isPast) {
        onComplete();
      }
    }, 10); // Update every 10ms for milliseconds precision

    return () => clearInterval(interval);
  }, [targetDate, timezone, onComplete, countdown.isPast]);

  return countdown;
}

