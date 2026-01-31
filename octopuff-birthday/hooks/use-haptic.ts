import { vibrate } from "@/lib/utils";

export function useHaptic() {
  const light = () => vibrate(10);
  const medium = () => vibrate(50);
  const heavy = () => vibrate(200);
  const pattern = (pattern: number[]) => vibrate(pattern);

  return { light, medium, heavy, pattern };
}

