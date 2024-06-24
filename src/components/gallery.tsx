"use client";

import { useParams } from "@/hooks/use-params";
import { cn, getContent } from "@/lib/utils";
import type { OchreResource } from "@/types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { memo } from "react";
import Thumbnail from "./thumbnail";

const DEFAULT_PER_PAGE = 10;
const PER_PAGE_OPTIONS = [10, 20, 40];

const UnmemoizedPerPageButton = ({ value }: { value: number }) => {
  const [{ ["per_page"]: perPage }, setState] = useParams();

  async function handleClick() {
    if (perPage === value) {
      return;
    }

    await setState({
      page: null,
      ["per_page"]: value === DEFAULT_PER_PAGE ? null : value,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      key={`results-per-page-${value}`}
      onClick={handleClick}
      className={cn(
        "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-brand-50 to-brand-100 font-sans font-medium tabular-nums text-brand-700 shadow-sm hover-sm active-md hover:rounded-full active:rounded-full",
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
        onClick={async () => await setState({ page: null })}
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-brand-50 to-brand-100 font-sans font-medium tabular-nums text-brand-700 shadow-sm hover-sm active-md hover:rounded-full active:rounded-full",
          { disabled: page === 1 },
        )}
      >
        <ChevronsLeftIcon className="-ml-0.5 h-6 w-auto" strokeWidth={2.5} />
      </button>
      <button
        onClick={async () =>
          await setState({ page: page - 1 === 1 ? null : page - 1 })
        }
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-brand-50 to-brand-100 font-sans font-medium tabular-nums text-brand-700 shadow-sm hover-sm active-md hover:rounded-full active:rounded-full",
          { disabled: page === 1 },
        )}
      >
        <ChevronLeftIcon className="-ml-0.5 h-6 w-auto" strokeWidth={2.5} />
      </button>
      <div className="font-sans font-bold tabular-nums text-black">
        {page.toLocaleString("en-US")}
        <span className="font-semibold text-neutral-600">
          {"/"}
          {maxPages.toLocaleString("en-US")}
        </span>
      </div>
      <button
        onClick={async () => await setState({ page: page + 1 })}
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-brand-50 to-brand-100 font-sans font-medium tabular-nums text-brand-700 shadow-sm hover-sm active-md hover:rounded-full active:rounded-full",
          { disabled: page === maxPages },
        )}
      >
        <ChevronRightIcon className="-mr-0.5 h-6 w-auto" strokeWidth={2.5} />
      </button>
      <button
        onClick={async () => await setState({ page: maxPages })}
        className={cn(
          "grid h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-brand-50 to-brand-100 font-sans font-medium tabular-nums text-brand-700 shadow-sm hover-sm active-md hover:rounded-full active:rounded-full",
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

  return (
    <div className="grid gap-2">
      <div className="grid grid-flow-col items-center justify-between gap-x-1.5 px-1.5">
        <div className="font-sans text-xl font-semibold tabular-nums text-black">
          {data.length.toLocaleString("en-US")}
          {" results"}
          <span className="text-lg text-gray-500">
            {" (showing "}
            {((page - 1) * perPage + 1).toLocaleString("en-US")}
            {"-"}
            {Math.min(data.length, page * perPage).toLocaleString("en-US")}
            {")"}
          </span>
        </div>
        <div className="grid grid-flow-col items-center justify-center gap-x-2">
          <div className="grid grid-flow-col items-center justify-center gap-x-1.5">
            <div className="font-sans font-semibold text-black">
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
      <div className="flex flex-row flex-wrap justify-start gap-4">
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
