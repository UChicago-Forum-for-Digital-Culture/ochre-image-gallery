"use client";

import { useCheckParams } from "@/hooks/use-check-params";
import { PER_PAGE_OPTIONS, useParams } from "@/hooks/use-params";
import { cn, getContent } from "@/lib/utils";
import type { OchreResource } from "@/types";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { useEventListener } from "usehooks-ts";
import Thumbnail from "./thumbnail";

const UnmemoizedPerPageButton = ({
  value,
}: {
  value: (typeof PER_PAGE_OPTIONS)[number];
}) => {
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
        "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full",
        {
          "from-brand-700 to-brand-800 text-brand-50": value === perPage,
        },
      )}
    >
      {value}
    </button>
  );
};

const PerPageButton = memo(UnmemoizedPerPageButton);

const UnmemoizedPageButtons = ({ maxPages }: { maxPages: number }) => {
  const [{ page }, setState] = useParams();

  return (
    <div className="grid grid-flow-col items-center justify-center gap-x-1.5">
      <button
        onClick={async () => (page > 1 ? await setState({ page: 1 }) : null)}
        aria-label="Go to the first page"
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full",
          { disabled: page === 1 },
        )}
      >
        <ChevronsLeftIcon className="-ml-0.5 h-6 w-auto" strokeWidth={2.5} />
      </button>
      <button
        onClick={async () =>
          page > 1 ? await setState({ page: page - 1 }) : null
        }
        aria-label="Go to the previous page"
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full",
          { disabled: page === 1 },
        )}
      >
        <ChevronLeftIcon className="-ml-0.5 h-6 w-auto" strokeWidth={2.5} />
      </button>
      <div className="font-sans font-bold tabular-nums tracking-[0.2px]">
        {page.toLocaleString("en-US")}
        <span className="font-semibold text-neutral-600">
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
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full",
          { disabled: page === maxPages },
        )}
      >
        <ChevronRightIcon className="-mr-0.5 h-6 w-auto" strokeWidth={2.5} />
      </button>
      <button
        onClick={async () =>
          page < maxPages ? await setState({ page: maxPages }) : null
        }
        aria-label="Go to the last page"
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full",
          { disabled: page === maxPages },
        )}
      >
        <ChevronsRightIcon className="-mr-0.5 h-6 w-auto" strokeWidth={2.5} />
      </button>
    </div>
  );
};

const PageButtons = memo(UnmemoizedPageButtons);

export default function Gallery({ data }: { data: Array<OchreResource> }) {
  const [{ page, per_page: perPage }, setState] = useParams();

  useCheckParams();

  useEventListener("keydown", (e) => {
    async function handleKeyDown() {
      if (e.key === "ArrowLeft") {
        if (e.shiftKey) {
          await setState({
            page: 1,
            per_page:
              PER_PAGE_OPTIONS[
                Math.max(
                  PER_PAGE_OPTIONS.findIndex((option) => option === perPage) -
                    1,
                  0,
                )
              ],
          });
        } else {
          if (page > 1) {
            await setState({ page: page - 1 });
          }
        }
      } else if (e.key === "ArrowRight") {
        if (e.shiftKey) {
          await setState({
            page: 1,
            per_page:
              PER_PAGE_OPTIONS[
                Math.min(
                  PER_PAGE_OPTIONS.findIndex((option) => option === perPage) +
                    1,
                  PER_PAGE_OPTIONS.length - 1,
                )
              ],
          });
        } else {
          if (page < Math.ceil(data.length / perPage)) {
            await setState({ page: page + 1 });
          }
        }
      } else if (e.key === "ArrowUp") {
        if (page > 1) {
          await setState({ page: 1 });
        }
      } else if (e.key === "ArrowDown") {
        if (page < Math.ceil(data.length / perPage)) {
          await setState({ page: Math.ceil(data.length / perPage) });
        }
      }
    }

    void handleKeyDown();
  });

  return (
    <div className="grid w-full max-w-7xl gap-2 p-4 md:gap-4">
      <div className="grid items-center gap-2 md:grid-flow-col md:justify-between md:gap-1.5">
        <div className="grid grid-flow-col items-center justify-start gap-2 md:justify-start">
          <Link
            href="/"
            className="-mt-0.5 grid grid-flow-col items-center justify-center gap-x-0.5 justify-self-start rounded-sm bg-gradient-to-b from-white to-neutral-200 py-1 pl-1.5 pr-2 font-sans font-medium tabular-nums tracking-[0.2px] text-brand-800 shadow-md hover-xs active-md active:rounded-sm"
          >
            <ArrowLeftIcon className="h-[17px] w-auto" strokeWidth={2.75} />
            Back
          </Link>
          <h1 className="text-balance font-sans text-lg font-semibold tabular-nums leading-6 tracking-[0.2px] md:text-xl">
            {data.length.toLocaleString("en-US")}
            {" items"}
            <span className="text-base text-neutral-600 md:text-lg">
              {" (showing "}
              {((page - 1) * perPage + 1).toLocaleString("en-US")}
              {"-"}
              {Math.min(data.length, page * perPage).toLocaleString("en-US")}
              {")"}
            </span>
          </h1>
        </div>
        <div className="grid items-center justify-center gap-x-2 gap-y-1.5 md:grid-flow-col">
          <div className="grid grid-flow-col items-center justify-center gap-x-1.5">
            <div className="font-sans font-medium tracking-[0.2px]">
              Items per page:
            </div>
            <div className="grid grid-flow-col items-center justify-center gap-x-1">
              {PER_PAGE_OPTIONS.map((option) => (
                <PerPageButton key={option} value={option} />
              ))}
            </div>
          </div>
          <div className="mx-0.5 h-[calc(100%-0.125rem)] w-[2px] rounded-sm bg-neutral-400/80" />
          <PageButtons maxPages={Math.ceil(data.length / perPage)} />
        </div>
      </div>
      <div className="mt-1.5 flex flex-row flex-wrap justify-center gap-4 md:mt-0 xl:justify-start">
        {data.slice((page - 1) * perPage, page * perPage).map((item) => (
          <Thumbnail
            key={item.uuid}
            uuid={item.uuid}
            title={getContent(item.identification.label)}
          />
        ))}
      </div>
    </div>
  );
}
