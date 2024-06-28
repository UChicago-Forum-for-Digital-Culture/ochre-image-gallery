import Gallery from "@/components/gallery";
import PageButtons from "@/components/gallery/page-buttons";
import PerPageButton from "@/components/gallery/per-page-button";
import ShowingCount from "@/components/gallery/showing-count";
import { PER_PAGE_OPTIONS } from "@/lib/utils";
import type { OchreTreeResponse } from "@/types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({ params }: { params: { uuid: string } }) {
  const response = await fetch(
    `https://ochre.lib.uchicago.edu/ochre?uuid=${encodeURIComponent(params.uuid)}&format=json`,
  );
  const data = (await response.json()) as OchreTreeResponse;

  if (!data?.ochre?.tree?.items?.resource) {
    notFound();
  }

  const items = data.ochre.tree.items.resource;

  return (
    <div className="grid w-full max-w-7xl gap-2 p-4 md:gap-4">
      <div className="grid items-center gap-2 md:grid-flow-col md:justify-between md:gap-1.5">
        <div className="grid grid-flow-col items-center justify-center gap-2 md:justify-start">
          <h1 className="text-balance font-sans text-lg font-semibold tabular-nums leading-6 tracking-[0.2px] md:text-xl">
            {items.length.toLocaleString("en-US")}
            {" items"}
            <ShowingCount itemsLength={items.length} />
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
          <PageButtons itemsLength={items.length} />
        </div>
      </div>
      <Gallery items={items} />
    </div>
  );
}
