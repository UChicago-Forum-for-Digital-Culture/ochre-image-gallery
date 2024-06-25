"use client";

import { useRedirect } from "@/hooks/use-redirect";
import { TriangleAlertIcon } from "lucide-react";

export default function ErrorPage() {
  useRedirect();

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 grid content-center justify-items-center gap-1.5 text-center font-sans text-xl font-semibold text-black md:mt-20">
      <TriangleAlertIcon className="-mt-4 h-14 w-auto" />
      Something went wrong, please try again later.
    </div>
  );
}
