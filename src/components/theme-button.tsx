"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeButton({
  hasMargin = false,
  className,
}: {
  hasMargin?: boolean;
  className?: string;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent={true}>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger
              className={cn(
                "transition-hover hover:opacity-100 active:opacity-100",
                className,
              )}
            >
              <DropdownMenuLabel>
                {theme === "system" ?
                  <MonitorIcon className="h-[22px] w-auto" strokeWidth={2.25} />
                : theme === "dark" ?
                  <MoonIcon className="h-[22px] w-auto" strokeWidth={2.25} />
                : <SunIcon className="h-[22px] w-auto" strokeWidth={2.25} />}
              </DropdownMenuLabel>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right">Change theme</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent
        className={cn("mr-4", { "mt-1": hasMargin })}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "grid grid-flow-col items-center justify-start gap-x-1.5",
            {
              "pointer-events-none scale-[0.975] bg-gradient-to-b from-white to-neutral-200 shadow-inset-sm brightness-active dark:from-neutral-700 dark:to-neutral-800":
                theme === "system",
            },
          )}
        >
          <MonitorIcon className="-mb-px h-4 w-auto" strokeWidth={2.25} />
          System theme
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "grid grid-flow-col items-center justify-start gap-x-1.5",
            {
              "pointer-events-none scale-[0.975] bg-gradient-to-b from-white to-neutral-200 shadow-inset-sm brightness-active dark:from-neutral-700 dark:to-neutral-800":
                theme === "dark",
            },
          )}
        >
          <MoonIcon className="h-4 w-auto" strokeWidth={2.25} />
          Dark theme
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "grid grid-flow-col items-center justify-start gap-x-1.5",
            {
              "pointer-events-none scale-[0.975] bg-gradient-to-b from-white to-neutral-200 shadow-inset-sm brightness-active dark:from-neutral-700 dark:to-neutral-800":
                theme === "light",
            },
          )}
        >
          <SunIcon className="h-4 w-auto" strokeWidth={2.25} />
          Light theme
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
