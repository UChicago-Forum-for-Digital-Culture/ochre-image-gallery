import LoadingSpinner from "@/components/loading/spinner";
import { ArrowLeftIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Input from "./input";
const ThemeButton = dynamic(() => import("@/components/theme-button"), {
  ssr: false,
  loading: () => (
    <div>
      <LoadingSpinner isDark={true} className="mx-[7px] h-6 w-6" />
    </div>
  ),
});

export default function Header() {
  return (
    <header className="col-start-1 col-end-2 row-start-1 row-end-2 grid w-full bg-gradient-to-b from-brand-800 to-brand-900 shadow-sm">
      <div className="mx-auto grid w-full max-w-7xl grid-flow-col items-center justify-between self-start px-2 py-3 md:px-4">
        <div className="grid grid-flow-col items-center gap-x-3">
          <Link
            href="/"
            className="-mt-0.5 grid h-9 grid-flow-col items-center justify-center gap-x-0.5 justify-self-start rounded-sm bg-gradient-to-b from-white to-neutral-200 pl-1.5 pr-2 font-sans font-medium tabular-nums tracking-[0.2px] text-brand-800 shadow-sm hover-xs active-md active:rounded-sm dark:from-neutral-700 dark:to-neutral-800 dark:text-white"
          >
            <ArrowLeftIcon className="h-[17px] w-auto" strokeWidth={2.75} />
            Back
          </Link>
          <div className="font-sans text-lg font-semibold tracking-[0.2px] text-white md:text-xl">
            OCHRE Image Gallery
          </div>
        </div>
        <div className="hidden grid-flow-col items-center gap-x-2 min-[350px]:grid">
          <Input />
          <ThemeButton
            hasMargin={true}
            className="text-brand-100 hover:text-white active:text-white"
          />
        </div>
      </div>
    </header>
  );
}
