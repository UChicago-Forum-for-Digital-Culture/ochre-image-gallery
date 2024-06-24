import { cn } from "@/lib/utils";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "./loading/spinner";

export default function FormButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        "mt-1 grid w-full grid-flow-col gap-2 rounded-sm bg-gradient-to-b from-brand-700 to-brand-800 py-2.5 pl-2.5 pr-2 font-sans font-semibold tracking-[0.3px] text-brand-50 shadow-md hover-xs active-lg active:rounded-sm",
        { "pointer-events-none select-none": pending },
      )}
    >
      {pending ?
        <div className="grid items-center justify-center">
          <LoadingSpinner isDark={true} className="h-6 w-auto" />
        </div>
      : <>
          <div className="col-start-1 col-end-2 row-start-1 row-end-2 self-center justify-self-center">
            View gallery
          </div>
          <SquareArrowOutUpRightIcon
            className="col-start-1 col-end-2 row-start-1 row-end-2 h-[18px] w-auto self-center justify-self-end"
            strokeWidth={2.75}
          />
        </>
      }
    </button>
  );
}
