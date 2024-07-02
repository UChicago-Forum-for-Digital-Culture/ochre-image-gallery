"use client";

import { useRedirect } from "@/hooks/use-redirect";

export default function NotFoundPage() {
  useRedirect();

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 grid content-center justify-items-center gap-1.5 px-2 text-center font-sans text-xl font-semibold md:-mt-40">
      <div className="-mt-4 text-5xl font-bold">404</div>
      <div>Page not found.</div>
    </div>
  );
}
