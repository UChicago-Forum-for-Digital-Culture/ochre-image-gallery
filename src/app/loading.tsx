"use client";

import LoadingSpinner from "@/components/loading/spinner";

export default function Loading() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 grid content-center justify-items-center gap-1.5 px-2 md:mt-20">
      <LoadingSpinner className="dark:fill-neutral-50 dark:text-neutral-300/30" />
    </div>
  );
}
