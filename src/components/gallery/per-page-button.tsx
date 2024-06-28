"use client";

import { useParams } from "@/hooks/use-params";
import { cn, type PER_PAGE_OPTIONS } from "@/lib/utils";

export default function PerPageButton({
  value,
}: {
  value: (typeof PER_PAGE_OPTIONS)[number];
}) {
  const [{ per_page: perPage }, setState] = useParams();

  async function handleClick() {
    if (perPage === value) {
      return;
    }

    await setState({
      page: 1,
      per_page: value,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      key={`items-per-page-${value}`}
      onClick={handleClick}
      className={cn(
        "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full dark:from-neutral-500 dark:to-neutral-600 dark:text-white",
        {
          "from-brand-700 to-brand-800 text-brand-50 dark:from-brand-700 dark:to-brand-800":
            value === perPage,
        },
      )}
    >
      {value}
    </button>
  );
}
