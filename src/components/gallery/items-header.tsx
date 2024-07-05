"use client";

import { useParams } from "@/hooks/use-params";
import { useGalleryStore } from "@/providers/gallery-store-provider";
import { memo } from "react";

const ItemsHeader = () => {
  const [{ page, per_page: perPage }] = useParams();

  const projectName = useGalleryStore((state) => state.projectName);
  const itemName = useGalleryStore((state) => state.itemName);
  const maxLength = useGalleryStore((state) => state.maxLength);

  if (!maxLength) {
    return <div className="md:h-[58px]" />;
  }

  return (
    <h1 className="grid items-center justify-center gap-2 self-center text-balance text-center font-sans leading-6 md:justify-start md:gap-0.5 md:text-start">
      <div className="text-lg font-semibold tracking-[0.2px] md:text-xl">
        {itemName}
        {" - "}
        {projectName}
      </div>
      <div>
        <span className="text-lg font-medium tabular-nums text-neutral-600 dark:text-neutral-300/75">
          {maxLength.toLocaleString("en-US")}
          {` item${maxLength > 1 ? "s" : ""}`}
        </span>
        <span className="text-lg font-medium tabular-nums text-neutral-600 dark:text-neutral-300/75 md:text-lg">
          {" (showing "}
          {((page - 1) * perPage + 1).toLocaleString("en-US")}
          {"-"}
          {Math.min(maxLength, page * perPage).toLocaleString("en-US")}
          {")"}
        </span>
      </div>
    </h1>
  );
};

export default memo(ItemsHeader);
