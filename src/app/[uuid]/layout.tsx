import Footer from "@/components/footer";
import Header from "@/components/header";
import { getContent } from "@/lib/utils";
import type { OchreResultMetadataResponse } from "@/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { uuid: string };
}): Promise<Metadata> {
  const response = await fetch(
    `https://ochre.lib.uchicago.edu/ochre?xquery=for $q in input()/ochre[@uuid='${params.uuid}'] return $q/metadata&format=json`,
  );
  const data = (await response.json()) as OchreResultMetadataResponse;

  const title = getContent(data.result.metadata.item.label.content);
  if (!title) {
    // it is annoying to deal with the redirect in development
    if (process.env.NODE_ENV === "production") {
      notFound();
    }
  }

  return {
    title: title,
  };
}

export default function UuidLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid w-full grid-rows-[auto_1fr_auto] items-start">
      <Header />
      <div className="col-start-1 col-end-2 row-start-2 row-end-3 grid w-[100dvw] justify-items-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}
