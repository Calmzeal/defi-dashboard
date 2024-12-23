"use client";

import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="rounded-lg bg-red-50 p-4" role="alert">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-400" />
        <span className="ml-2 text-red-700">{message}</span>
      </div>
      {retry && (
        <button
          onClick={retry}
          className="mt-2 text-sm text-red-600 hover:text-red-500"
        >
          Try again
        </button>
      )}
    </div>
  );
}
