import Gallery from "@/components/gallery";
import ItemsHeader from "@/components/gallery/items-header";
import PageButtons from "@/components/gallery/page-buttons";
import PerPageButton from "@/components/gallery/per-page-button";
import { PER_PAGE_OPTIONS } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  return (
    <div className="grid w-full max-w-7xl gap-2 p-4 md:gap-2.5">
      <div className="grid gap-2 md:grid-flow-col md:justify-between md:gap-1.5 md:pl-2">
        <ItemsHeader />
        <div className="grid content-end justify-center gap-x-2 gap-y-1.5 pb-1 md:grid-flow-col">
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
          <PageButtons />
        </div>
      </div>
      <Gallery />
    </div>
  );
}
