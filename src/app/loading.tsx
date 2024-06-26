"use client";

import LoadingSpinner from "@/components/loading/spinner";

export default function Loading() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 grid content-center justify-items-center gap-1.5 md:mt-20">
      <LoadingSpinner />
    </div>
  );
}
