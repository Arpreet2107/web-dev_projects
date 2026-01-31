import { useEffect, useState } from "react";

export type DevicePerformance = "high" | "medium" | "low";

export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>("medium");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check hardware concurrency
    const cores = navigator.hardwareConcurrency || 4;

    // Check memory (if available)
    const memory = (navigator as any).deviceMemory || 4;

    // Check connection (if available)
    const connection = (navigator as any).connection;
    const effectiveType = connection?.effectiveType || "4g";

    let score = 0;

    // CPU cores
    if (cores >= 8) score += 2;
    else if (cores >= 4) score += 1;

    // Memory
    if (memory >= 8) score += 2;
    else if (memory >= 4) score += 1;

    // Connection
    if (effectiveType === "4g") score += 1;

    // Determine performance level
    let perf: DevicePerformance = "low";
    if (score >= 4) perf = "high";
    else if (score >= 2) perf = "medium";

    setPerformance(perf);
  }, []);

  return performance;
}

