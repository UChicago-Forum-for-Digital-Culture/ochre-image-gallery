"use client";

import { useEffect } from "react";
import { useLocalStorage, useWindowSize } from "usehooks-ts";

export default function TailwindIndicator() {
  const { width, height } = useWindowSize();

  const [isVisible, setIsVisible] = useLocalStorage("tailwind-indicator", true);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.altKey) {
        setIsVisible((prevValue) => !prevValue);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, setIsVisible]);

  if (process.env.NODE_ENV === "production" || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-2 left-2 z-[99999999] flex select-none items-center space-x-2 rounded-sm bg-gradient-to-b from-neutral-700 to-neutral-900 px-2.5 py-1 font-mono text-xs font-medium text-white opacity-90 shadow-md">
      <span>w: {width.toLocaleString("en-US")}</span>
      <div className="h-4 w-[1.5px] rounded-lg bg-neutral-400" />
      <span>h: {height.toLocaleString("en-US")}</span>
      <div className="h-4 w-[1.5px] rounded-lg bg-neutral-400" />
      <span className="sm:hidden">xs</span>
      <span className="hidden sm:inline md:hidden">sm</span>
      <span className="hidden md:inline lg:hidden">md</span>
      <span className="hidden lg:inline xl:hidden">lg</span>
      <span className="hidden xl:inline 2xl:hidden">xl</span>
      <span className="hidden 2xl:inline">2xl</span>
    </div>
  );
}
