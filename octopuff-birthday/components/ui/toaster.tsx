"use client";

import { Toaster as RadixToaster } from "@radix-ui/react-toast";

export function Toaster() {
  return (
    <RadixToaster
      position="top-right"
      className="z-[100]"
      toastOptions={{
        duration: 3000,
      }}
    />
  );
}

