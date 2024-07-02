"use client";

import { useGallery } from "@/hooks/use-gallery";
import { useParams } from "@/hooks/use-params";

export default function ItemsCount() {
  const { maxLength } = useGallery();

  const [{ page, per_page: perPage }] = useParams();

  if (maxLength === null) {
    return (
      <div className="text-balance font-sans text-lg font-semibold leading-6 tracking-[0.2px] md:text-xl">
        Loading items...
      </div>
    );
  }

  return (
    <div className="grid grid-flow-col items-center justify-center gap-2 md:justify-start">
      <h1 className="text-balance font-sans text-lg font-semibold tabular-nums leading-6 tracking-[0.2px] md:text-xl">
        {maxLength.toLocaleString("en-US")}
        {" items"}
        <span className="text-base text-neutral-600 dark:text-neutral-300/75 md:text-lg">
          {" (showing "}
          {((page - 1) * perPage + 1).toLocaleString("en-US")}
          {"-"}
          {Math.min(maxLength, page * perPage).toLocaleString("en-US")}
          {")"}
        </span>
      </h1>
    </div>
  );
}
