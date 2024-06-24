import Gallery from "@/components/gallery";
import { getContent } from "@/lib/utils";
import type { OchreTreeResponse } from "@/types";
import { TriangleAlertIcon } from "lucide-react";
import type { Metadata } from "next";

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

  return {
    title: getContent(data.ochre.tree.identification.label.content),
  };
}

export default async function Page({ params }: { params: { uuid: string } }) {
  const response = await fetch(
    `https://ochre.lib.uchicago.edu/ochre?uuid=${encodeURIComponent(params.uuid)}&format=json`,
  );
  const data = (await response.json()) as OchreTreeResponse;

  if (!data.ochre.tree.items.resource) {
    return (
      <div className="absolute bottom-0 left-0 right-0 top-0 grid content-center justify-items-center gap-1.5 text-center font-sans text-xl font-semibold text-black md:mt-20">
        <TriangleAlertIcon className="h-14 w-auto" />
        Something went wrong, please try again later.
      </div>
    );
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-5 p-4">
      <Gallery data={data.ochre.tree.items.resource} />
    </main>
  );
}
