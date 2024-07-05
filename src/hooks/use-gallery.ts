import { getContent } from "@/lib/utils";
import { useGalleryStore } from "@/providers/gallery-store-provider";
import type { OchreResultGalleryResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams as useNavigationParams } from "next/navigation";
import { useParams } from "./use-params";

async function fetchGalleryItems(
  uuid: string,
  page: number,
  perPage: number,
  setProjectName: (projectName: string) => void,
  setItemName: (itemName: string) => void,
  setMaxLength: (maxLength: number | null) => void,
) {
  const response = await fetch(
    `https://ochre.lib.uchicago.edu/ochre?xquery=(for $q in input()/ochre[@uuid='${uuid}'] return <gallery maxLength='{$q/metadata/item/@maxLength}'> {$q/metadata/project} {$q/metadata/item} {$q/tree/items/resource[position() >= ${(page - 1) * perPage + 1} and position() < ${page * perPage + 1}]} </gallery>)&format=json`,
  );

  if (!response.ok) {
    throw new Error("Error fetching gallery items, please try again.");
  }

  const data = (await response.json()) as OchreResultGalleryResponse;

  const project =
    Array.isArray(data.result.gallery.project.identification.label.content) ?
      getContent(
        data.result.gallery.project.identification.label.content.find(
          (item) => typeof item === "object" && item.lang === "eng",
        ) ?? "",
      )
    : getContent(data.result.gallery.project.identification.label.content);
  const title =
    Array.isArray(data.result.gallery.item.label.content) ?
      getContent(
        data.result.gallery.item.label.content.find(
          (item) => typeof item === "object" && item.lang === "eng",
        ) ?? "",
      )
    : getContent(data.result.gallery.item.label.content);
  const gallery =
    data.result.gallery.resource ?
      Array.isArray(data.result.gallery.resource) ?
        data.result.gallery.resource
      : [data.result.gallery.resource]
    : [];
  const maxLength = data.result.gallery.maxLength;

  setProjectName(project);
  setItemName(title);
  setMaxLength(maxLength);

  return {
    gallery,
  };
}

export function useGallery() {
  const setProjectName = useGalleryStore((state) => state.setProjectName);
  const setItemName = useGalleryStore((state) => state.setItemName);
  const setMaxLength = useGalleryStore((state) => state.setMaxLength);

  const params = useNavigationParams();
  const uuid = params.uuid as string;

  const [{ page, per_page: perPage }] = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["gallery", uuid, page, perPage],
    queryFn: () =>
      fetchGalleryItems(
        uuid,
        page,
        perPage,
        setProjectName,
        setItemName,
        setMaxLength,
      ),
  });

  return {
    items: data?.gallery ?? [],
    isLoading,
    error,
  };
}
