"use client";

import { TriangleAlertIcon } from "lucide-react";

export default function GlobalErrorPage() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 grid content-center justify-items-center gap-1.5 text-center font-sans text-xl font-semibold text-black md:mt-20">
      <TriangleAlertIcon className="h-14 w-auto" />
      Something went wrong, please try again later.
    </div>
  );
}
