import Gallery from "@/components/gallery";
import { getContent } from "@/lib/utils";
import type { OchreTreeResponse } from "@/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { uuid: string };
}): Promise<Metadata> {
  const response = await fetch(
    `https://ochre.lib.uchicago.edu/ochre?uuid=${encodeURIComponent(params.uuid)}&format=json`,
  );
  const data = (await response.json()) as OchreTreeResponse;

  const title = getContent(data.ochre?.tree?.identification?.label?.content);
  if (!title) {
    notFound();
  }

  return {
    title: title,
  };
}

export default async function Page({ params }: { params: { uuid: string } }) {
  const response = await fetch(
    `https://ochre.lib.uchicago.edu/ochre?uuid=${encodeURIComponent(params.uuid)}&format=json`,
  );
  const data = (await response.json()) as OchreTreeResponse;

  if (!data?.ochre?.tree?.items?.resource) {
    notFound();
  }

  return <Gallery data={data.ochre.tree.items.resource} />;
}
