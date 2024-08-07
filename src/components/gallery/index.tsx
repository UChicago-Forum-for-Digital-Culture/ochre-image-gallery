"use client";

import LoadingSpinner from "@/components/loading/spinner";
import { useCheckParams } from "@/hooks/use-check-params";
import { useGallery } from "@/hooks/use-gallery";
import { useParams } from "@/hooks/use-params";
import { getContent, PER_PAGE_OPTIONS } from "@/lib/utils";
import { useGalleryStore } from "@/providers/gallery-store-provider";
import { TriangleAlertIcon } from "lucide-react";
import { useEventListener } from "usehooks-ts";
import Thumbnail from "./thumbnail";

export default function Gallery() {
  const { items, isLoading, error } = useGallery();

  const [{ page, per_page: perPage }, setState] = useParams();

  const maxLength = useGalleryStore((state) => state.maxLength);

  useCheckParams();

  useEventListener("keydown", (e) => {
    async function handleKeyDown() {
      if (document.activeElement?.tagName === "INPUT" || !maxLength) {
        return;
      }

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
          if (page < Math.ceil(maxLength / perPage)) {
            await setState({ page: page + 1 });
          }
        }
      } else if (e.key === "ArrowUp") {
        if (page > 1) {
          await setState({ page: 1 });
        }
      } else if (e.key === "ArrowDown") {
        if (page < Math.ceil(maxLength / perPage)) {
          await setState({ page: Math.ceil(maxLength / perPage) });
        }
      }
    }

    void handleKeyDown();
  });

  if (isLoading) {
    return (
      <div className="mt-10 grid content-center justify-items-center gap-1.5 px-2 md:mt-20">
        <LoadingSpinner className="text-neutral-400/50 dark:fill-neutral-50 dark:text-neutral-300/30" />
      </div>
    );
  }

  if (error !== null || items.length === 0) {
    return (
      <div className="mt-10 grid content-center justify-items-center gap-1.5 px-2 text-center font-sans text-xl font-semibold md:mt-20">
        <TriangleAlertIcon className="-mt-4 h-14 w-auto" />
        Something went wrong, please try again later.
      </div>
    );
  }

  if (maxLength === 0) {
    return (
      <div className="mt-10 grid content-center justify-items-center gap-1.5 px-2 text-center font-sans text-xl font-semibold md:mt-20">
        No images found.
      </div>
    );
  }

  return (
    <div className="mt-1.5 flex flex-row flex-wrap justify-center gap-4 md:mt-0 xl:justify-start">
      {items.map((item) => (
        <Thumbnail
          key={item.uuid}
          uuid={item.uuid}
          title={getContent(item.identification.label)}
          content={
            item?.image?.htmlImgSrcPrefix && item?.image?.content ?
              `${item.image.htmlImgSrcPrefix}${getContent(item?.image?.content)}`
            : null
          }
        />
      ))}
    </div>
  );
}
