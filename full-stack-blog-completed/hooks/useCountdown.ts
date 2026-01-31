import { useState, useEffect, useCallback } from "react";
import { formatTime, getAsiaKolkataDate } from "@/lib/utils";

const COUNTDOWN_DATE = process.env.NEXT_PUBLIC_COUNTDOWN_DATE || "2024-12-10T00:00:00";

export function useCountdown(onReachZero?: () => void) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [hasReachedZero, setHasReachedZero] = useState(false);

  const calculateTimeRemaining = useCallback(() => {
    const now = getAsiaKolkataDate(new Date());
    const targetDate = new Date(COUNTDOWN_DATE);
    targetDate.setHours(0, 0, 0, 0);

    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      if (!hasReachedZero) {
        setHasReachedZero(true);
        onReachZero?.();
      }
      return 0;
    }

    return diff;
  }, [hasReachedZero, onReachZero]);

  useEffect(() => {
    setTimeRemaining(calculateTimeRemaining());

    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 10); // Update every 10ms for milliseconds precision

    return () => clearInterval(interval);
  }, [calculateTimeRemaining]);

  const time = formatTime(timeRemaining);
  const isExpired = hasReachedZero || timeRemaining === 0;

  return {
    time,
    timeRemaining,
    isExpired,
    hasReachedZero,
  };
}

