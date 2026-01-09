import type { JSX } from "react";

export default function Loader(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-pulse" />

          {/* Spinner */}
          <div
            className="
              absolute inset-0
              rounded-full
              border-4 border-transparent
              border-t-[#4640DE]
              animate-spin
            "
          />
        </div>
      </div>
    </div>
  );
}
