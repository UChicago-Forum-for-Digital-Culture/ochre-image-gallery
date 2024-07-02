"use client";

import { useGallery } from "@/hooks/use-gallery";
import { useParams } from "@/hooks/use-params";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import LoadingSpinner from "../loading/spinner";

export default function PageButtons() {
  const { maxLength } = useGallery();

  const [{ page, per_page: perPage }, setState] = useParams();

  return (
    <div
      className={cn(
        "grid grid-flow-col items-center justify-center gap-x-1.5",
        { disabled: maxLength === null },
      )}
    >
      <button
        onClick={async () => await setState({ page: 1 })}
        aria-label="Go to the first page"
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full dark:from-neutral-500 dark:to-neutral-600 dark:text-white",
          { disabled: page === 1 },
        )}
      >
        <ChevronsLeftIcon className="-ml-0.5 h-6 w-auto" strokeWidth={2.25} />
      </button>
      <button
        onClick={async () => await setState({ page: page - 1 })}
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
        <span className="inline-grid grid-flow-col items-center justify-center gap-x-0.5 font-semibold text-neutral-600 dark:text-neutral-300/75">
          {"/"}
          {maxLength ?
            Math.ceil(maxLength / perPage)?.toLocaleString("en-US")
          : <div>
              <LoadingSpinner className="h-3.5 w-3.5 text-neutral-400/50 dark:fill-neutral-50 dark:text-neutral-300/30" />
            </div>
          }
        </span>
      </div>
      <button
        onClick={async () => await setState({ page: page + 1 })}
        aria-label="Go to the next page"
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full dark:from-neutral-500 dark:to-neutral-600 dark:text-white",
          { disabled: page === Math.ceil((maxLength ?? 0) / perPage) },
        )}
      >
        <ChevronRightIcon className="-mr-0.5 h-6 w-auto" strokeWidth={2.25} />
      </button>
      <button
        onClick={async () =>
          await setState({ page: Math.ceil((maxLength ?? 0) / perPage) })
        }
        aria-label="Go to the last page"
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full dark:from-neutral-500 dark:to-neutral-600 dark:text-white",
          { disabled: page === Math.ceil((maxLength ?? 0) / perPage) },
        )}
      >
        <ChevronsRightIcon className="-mr-0.5 h-6 w-auto" strokeWidth={2.25} />
      </button>
    </div>
  );
}
