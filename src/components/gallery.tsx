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
import Thumbnail from "./thumbnail";

const UnmemoizedPerPageButton = ({
  value,
}: {
  value: (typeof PER_PAGE_OPTIONS)[number];
}) => {
  const [{ ["per_page"]: perPage }, setState] = useParams();

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
      key={`results-per-page-${value}`}
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
        onClick={async () => await setState({ page: 1 })}
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full",
          { disabled: page === 1 },
        )}
      >
        <ChevronsLeftIcon className="-ml-0.5 h-6 w-auto" strokeWidth={2.5} />
      </button>
      <button
        onClick={async () => await setState({ page: page - 1 })}
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
        onClick={async () => await setState({ page: page + 1 })}
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-white to-neutral-200 font-sans font-medium tabular-nums text-brand-700 shadow-md hover-sm active-md hover:rounded-full active:rounded-full",
          { disabled: page === maxPages },
        )}
      >
        <ChevronRightIcon className="-mr-0.5 h-6 w-auto" strokeWidth={2.5} />
      </button>
      <button
        onClick={async () => await setState({ page: maxPages })}
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
  const [{ page, ["per_page"]: perPage }] = useParams();

  useCheckParams();

  return (
    <div className="grid gap-2">
      <div className="grid items-center gap-2 md:grid-flow-col md:justify-between md:gap-1.5">
        <div className="grid grid-flow-col items-center justify-start gap-2 md:justify-start">
          <Link
            href="/"
            className="-mt-0.5 grid grid-flow-col items-center justify-center gap-x-0.5 justify-self-start rounded-sm bg-gradient-to-b from-white to-neutral-200 px-2 py-1 font-sans font-medium tabular-nums tracking-[0.2px] text-brand-800 shadow-md hover-xs active-md active:rounded-sm"
          >
            <ArrowLeftIcon className="h-[17px] w-auto" strokeWidth={2.75} />
            Back
          </Link>
          <div className="text-balance font-sans text-lg font-semibold tabular-nums leading-6 tracking-[0.2px] md:text-xl">
            {data.length.toLocaleString("en-US")}
            {" results"}
            <span className="text-base text-neutral-500 md:text-lg">
              {" (showing "}
              {((page - 1) * perPage + 1).toLocaleString("en-US")}
              {"-"}
              {Math.min(data.length, page * perPage).toLocaleString("en-US")}
              {")"}
            </span>
          </div>
        </div>
        <div className="grid items-center justify-center gap-x-2 gap-y-1.5 md:grid-flow-col">
          <div className="grid grid-flow-col items-center justify-center gap-x-1.5">
            <div className="font-sans font-medium tracking-[0.2px]">
              Results per page:
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
      <div className="mt-1.5 flex flex-row flex-wrap justify-center gap-4 md:mt-0 md:justify-start">
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
