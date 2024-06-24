"use client";

import { cn } from "@/lib/utils";
import { TriangleAlertIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import LoadingSpinner from "./loading/spinner";

const GalleryThumbnail = ({ uuid, title }: { uuid: string; title: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <Link
      href={`https://ochre.lib.uchicago.edu/ochre?uuid=${encodeURIComponent(uuid)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="grid w-[300px] rounded-sm bg-gradient-to-b from-neutral-700 to-neutral-800 font-sans font-medium text-white shadow-sm hover-xs active-md active:rounded-sm"
    >
      <div className="grid h-[200px] w-[300px] items-center justify-center">
        <div
          className={cn(
            "pointer-events-none col-start-1 col-end-2 row-start-1 row-end-2 grid select-none items-center justify-items-center gap-1 text-center tracking-[0.2px] opacity-0 transition-opacity",
            { "opacity-100": isError },
          )}
        >
          <TriangleAlertIcon className="h-10 w-auto" />
          Error loading image
        </div>
        <div
          className={cn(
            "pointer-events-none col-start-1 col-end-2 row-start-1 row-end-2 grid select-none items-center justify-center opacity-100 transition-opacity",
            { "opacity-0": !isLoading },
          )}
        >
          <LoadingSpinner isDark={true} />
        </div>
        <div className="col-start-1 col-end-2 row-start-1 row-end-2 grid items-center justify-center">
          <Image
            src={`https://ochre.lib.uchicago.edu/ochre?uuid=${encodeURIComponent(uuid)}&preview`}
            alt={title}
            height={0}
            width={0}
            sizes="100vw"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setIsError(true);
            }}
            className={cn(
              "h-[200px] w-[300px] object-contain object-center opacity-0 transition-opacity",
              { "opacity-100": !isLoading && !isError },
            )}
          />
        </div>
      </div>
      <div className="py-1 text-center tracking-[0.2px]">{title}</div>
    </Link>
  );
};

export default memo(GalleryThumbnail);
