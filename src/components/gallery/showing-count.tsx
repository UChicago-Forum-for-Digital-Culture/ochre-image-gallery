"use client";

import { useParams } from "@/hooks/use-params";

export default function ShowingCount({ itemsLength }: { itemsLength: number }) {
  const [{ page, per_page: perPage }] = useParams();

  return (
    <span className="text-base text-neutral-600 dark:text-neutral-300/75 md:text-lg">
      {" (showing "}
      {((page - 1) * perPage + 1).toLocaleString("en-US")}
      {"-"}
      {Math.min(itemsLength, page * perPage).toLocaleString("en-US")}
      {")"}
    </span>
  );
}
