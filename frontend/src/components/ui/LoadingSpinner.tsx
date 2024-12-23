"use client";

import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8" role="status">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" aria-label="Loading" />
    </div>
  );
}
