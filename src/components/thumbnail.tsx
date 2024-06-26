"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLinkIcon, TriangleAlertIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import LoadingSpinner from "./loading/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const GalleryThumbnail = ({ uuid, title }: { uuid: string; title: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <TooltipProvider disableHoverableContent={true}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href={`https://ochre.lib.uchicago.edu/ochre?uuid=${encodeURIComponent(uuid)}&load`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "grid w-[300px] overflow-hidden rounded-sm bg-gradient-to-b from-white to-neutral-100 font-sans font-medium text-neutral-800 shadow-sm",
              { "pointer-events-none": isLoading || isError },
              {
                "hover-xs active-md active:rounded-sm": !isLoading && !isError,
              },
            )}
          >
            <div className="grid h-[200px] w-[300px] items-center justify-center">
              <AnimatePresence>
                {isError ?
                  <motion.div
                    key={`error-message-${uuid}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="pointer-events-none z-10 col-start-1 col-end-2 row-start-1 row-end-2 grid select-none items-center justify-items-center gap-1 text-center tracking-[0.2px]"
                  >
                    <TriangleAlertIcon className="h-10 w-auto" />
                    Error loading image
                  </motion.div>
                : null}
              </AnimatePresence>
              <AnimatePresence>
                {isLoading ?
                  <motion.div
                    key={`loading-spinner-${uuid}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="pointer-events-none z-10 col-start-1 col-end-2 row-start-1 row-end-2 grid select-none items-center justify-center"
                  >
                    <LoadingSpinner />
                  </motion.div>
                : null}
              </AnimatePresence>
              <div className="col-start-1 col-end-2 row-start-1 row-end-2 grid items-center justify-center">
                <Image
                  src={`https://ochre.lib.uchicago.edu/ochre?uuid=${encodeURIComponent(uuid)}&preview`}
                  alt={title}
                  height={0}
                  width={0}
                  priority={true}
                  sizes="100vw"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setIsError(true);
                  }}
                  className="h-[200px] w-[300px] object-contain object-center transition-all"
                />
              </div>
            </div>
            <div className="py-1 text-center tracking-[0.2px]">{title}</div>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="grid grid-flow-col items-center justify-center gap-1.5 pr-2">
          View image in full quality
          <ExternalLinkIcon className="-mt-0.5 h-4 w-auto" strokeWidth={2.75} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default memo(GalleryThumbnail);
