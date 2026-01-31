import { formatInTimeZone } from "date-fns-tz";

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  total: number;
  isPast: boolean;
}

export function getCountdown(targetDate: string, timezone: string): CountdownTime {
  const now = new Date();
  const target = new Date(targetDate);
  
  // Convert to target timezone
  const targetInTz = new Date(
    formatInTimeZone(target, timezone, "yyyy-MM-dd HH:mm:ss")
  );
  const nowInTz = new Date(
    formatInTimeZone(now, timezone, "yyyy-MM-dd HH:mm:ss")
  );

  const diff = targetInTz.getTime() - nowInTz.getTime();
  const isPast = diff <= 0;

  if (isPast) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      total: 0,
      isPast: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const milliseconds = Math.floor(diff % 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    total: diff,
    isPast: false,
  };
}

export function useCountdown(
  targetDate: string,
  timezone: string,
  callback?: () => void
): CountdownTime {
  const countdown = getCountdown(targetDate, timezone);

  if (countdown.isPast && callback) {
    callback();
  }

  return countdown;
}

