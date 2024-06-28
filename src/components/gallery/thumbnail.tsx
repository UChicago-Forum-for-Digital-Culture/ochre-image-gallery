import LoadingSpinner from "@/components/loading/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLinkIcon, TriangleAlertIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";

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
              "group grid w-[300px] overflow-hidden rounded-sm bg-gradient-to-b from-white to-neutral-100 font-sans font-medium text-neutral-800 shadow-md dark:from-neutral-900 dark:to-neutral-950 dark:text-white",
              { "pointer-events-none": isLoading || isError },
              {
                "hover-xs active-md hover:brightness-100 active:rounded-sm":
                  !isLoading && !isError,
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
                    className="pointer-events-none z-10 col-start-1 col-end-2 row-start-1 row-end-2 grid select-none items-center justify-items-center gap-1 text-center tracking-[0.2px] dark:text-white"
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
                    <LoadingSpinner className="dark:fill-neutral-50 dark:text-neutral-300/30" />
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
                  className="h-[200px] w-[300px] bg-[#ffffff] object-contain object-center transition-all dark:bg-neutral-950"
                />
              </div>
            </div>
            <div className="bg-gradient-to-b from-neutral-100 from-10% via-neutral-200 via-60% to-neutral-300 to-100% py-1 text-center tracking-[0.2px] transition-raise group-hover:brightness-hover group-active:shadow-inset-sm group-active:brightness-active dark:from-neutral-600 dark:to-neutral-700 dark:text-white">
              {title}
            </div>
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
