"use client";

import { useParams } from "@/hooks/use-params";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { useMemo } from "react";

export default function PageButtons({ itemsLength }: { itemsLength: number }) {
  const [{ page, per_page: perPage }, setState] = useParams();

  const maxPages = useMemo(
    () => Math.ceil(itemsLength / perPage),
    [itemsLength, perPage],
  );

  return (
    <div className="grid grid-flow-col items-center justify-center gap-x-1.5">
      <button
        onClick={async () => (page > 1 ? await setState({ page: 1 }) : null)}
        aria-label="Go to the first page"
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full dark:from-neutral-500 dark:to-neutral-600 dark:text-white",
          { disabled: page === 1 },
        )}
      >
        <ChevronsLeftIcon className="-ml-0.5 h-6 w-auto" strokeWidth={2.25} />
      </button>
      <button
        onClick={async () =>
          page > 1 ? await setState({ page: page - 1 }) : null
        }
        aria-label="Go to the previous page"
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full dark:from-neutral-500 dark:to-neutral-600 dark:text-white",
          { disabled: page === 1 },
        )}
      >
        <ChevronLeftIcon className="-ml-0.5 h-6 w-auto" strokeWidth={2.25} />
      </button>
      <div className="font-sans font-bold tabular-nums tracking-[0.2px]">
        {page.toLocaleString("en-US")}
        <span className="font-semibold text-neutral-600 dark:text-neutral-300/75">
          {"/"}
          {maxPages.toLocaleString("en-US")}
        </span>
      </div>
      <button
        onClick={async () =>
          page < maxPages ? await setState({ page: page + 1 }) : null
        }
        aria-label="Go to the next page"
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full dark:from-neutral-500 dark:to-neutral-600 dark:text-white",
          { disabled: page === maxPages },
        )}
      >
        <ChevronRightIcon className="-mr-0.5 h-6 w-auto" strokeWidth={2.25} />
      </button>
      <button
        onClick={async () =>
          page < maxPages ? await setState({ page: maxPages }) : null
        }
        aria-label="Go to the last page"
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full dark:from-neutral-500 dark:to-neutral-600 dark:text-white",
          { disabled: page === maxPages },
        )}
      >
        <ChevronsRightIcon className="-mr-0.5 h-6 w-auto" strokeWidth={2.25} />
      </button>
    </div>
  );
}
