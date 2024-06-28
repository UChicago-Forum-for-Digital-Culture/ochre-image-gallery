"use client";

import { useCheckParams } from "@/hooks/use-check-params";
import { useParams } from "@/hooks/use-params";
import { getContent, PER_PAGE_OPTIONS } from "@/lib/utils";
import type { OchreResource } from "@/types";
import { useMemo } from "react";
import { useEventListener } from "usehooks-ts";
import Thumbnail from "./thumbnail";

export default function Gallery({ items }: { items: Array<OchreResource> }) {
  const [{ page, per_page: perPage }, setState] = useParams();

  useCheckParams();

  const itemsToDisplay = useMemo(
    () => items.slice((page - 1) * perPage, page * perPage),
    [items, page, perPage],
  );

  useEventListener("keydown", (e) => {
    async function handleKeyDown() {
      if (document.activeElement?.tagName === "INPUT") {
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
          if (page < Math.ceil(items.length / perPage)) {
            await setState({ page: page + 1 });
          }
        }
      } else if (e.key === "ArrowUp") {
        if (page > 1) {
          await setState({ page: 1 });
        }
      } else if (e.key === "ArrowDown") {
        if (page < Math.ceil(items.length / perPage)) {
          await setState({ page: Math.ceil(items.length / perPage) });
        }
      }
    }

    void handleKeyDown();
  });

  return (
    <div className="mt-1.5 flex flex-row flex-wrap justify-center gap-4 md:mt-0 xl:justify-start">
      {itemsToDisplay.map((item) => (
        <Thumbnail
          key={item.uuid}
          uuid={item.uuid}
          title={getContent(item.identification.label)}
        />
      ))}
    </div>
  );
}
