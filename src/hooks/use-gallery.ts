import type { OchreResultGalleryResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams as useNavigationParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "./use-params";

async function fetchGalleryItems(uuid: string, page: number, perPage: number) {
  const response = await fetch(
    `https://ochre.lib.uchicago.edu/ochre?xquery=(for $q in input()/ochre[@uuid='${uuid}'] return <gallery maxLength='{$q/metadata/item/@maxLength}'> {$q/tree/items/resource[position() >= ${(page - 1) * perPage + 1} and position() < ${page * perPage + 1}]} </gallery>)&format=json`,
  );

  if (!response.ok) {
    throw new Error("Error fetching gallery items, please try again.");
  }

  const data = (await response.json()) as OchreResultGalleryResponse;

  return {
    gallery:
      data.result.gallery.resource ?
        Array.isArray(data.result.gallery.resource) ?
          data.result.gallery.resource
        : [data.result.gallery.resource]
      : [],
    maxLength: data.result.gallery.maxLength,
  };
}

export function useGallery() {
  const params = useNavigationParams();
  const uuid = params.uuid as string;

  const [{ page, per_page: perPage }, setState] = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["gallery", uuid, page, perPage],
    queryFn: () => fetchGalleryItems(uuid, page, perPage),
  });

  const [maxLength, setMaxLength] = useState<number | null>(null);

  useEffect(() => {
    async function handleMaxLength() {
      if (data?.maxLength == null) {
        return;
      }

      if (data.maxLength !== maxLength) {
        setMaxLength(data.maxLength);
      }

      if (data.maxLength && data.gallery.length === 0) {
        await setState({ page: 1 });
      }
    }

    void handleMaxLength();
  }, [maxLength, data?.maxLength, data?.gallery.length, setState]);

  return {
    items: data?.gallery ?? [],
    maxLength: maxLength,
    isLoading,
    error,
  };
}
