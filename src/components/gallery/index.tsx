"use client";

import { useCheckParams } from "@/hooks/use-check-params";
import { useGallery } from "@/hooks/use-gallery";
import { useParams } from "@/hooks/use-params";
import { getContent, PER_PAGE_OPTIONS } from "@/lib/utils";
import { useEventListener } from "usehooks-ts";
import LoadingSpinner from "../loading/spinner";
import Thumbnail from "./thumbnail";

export default function Gallery() {
  const { items, maxLength, isLoading, error } = useGallery();

  const [{ page, per_page: perPage }, setState] = useParams();

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
      <div className="absolute bottom-0 left-0 right-0 top-0 grid content-center justify-items-center gap-1.5 px-2 md:mt-20">
        <LoadingSpinner className="text-neutral-400/50 dark:fill-neutral-50 dark:text-neutral-300/30" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-1.5 flex flex-row flex-wrap justify-center gap-4 md:mt-0 xl:justify-start">
      {items.map((item) => (
        <Thumbnail
          key={item.uuid}
          uuid={item.uuid}
          title={getContent(item.identification.label)}
          content={`${item?.image?.htmlImgSrcPrefix}${getContent(item?.image?.content)}`}
        />
      ))}
    </div>
  );
}
