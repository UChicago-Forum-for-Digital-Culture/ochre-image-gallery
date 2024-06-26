"use client";

import { handleUuidRoute } from "@/actions";
import FormButton from "@/components/form-button";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import Link from "next/link";
import { useRef } from "react";

import { toast } from "sonner";

export default function Form({ isMobile }: { isMobile: boolean }) {
  const { execute } = useAction(handleUuidRoute, {
    onSuccess: () => {
      toast.dismiss();
    },
    onError: ({ error }) => {
      const validationErrors = error?.validationErrors?.fieldErrors?.uuid;
      if (Array.isArray(validationErrors) && validationErrors.length > 0) {
        const error = validationErrors
          .map((error) =>
            error === "Required" ? "Please enter a UUID value." : error,
          )
          .join(" ");

        toast(error);
      }
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        action={execute}
        className="-mt-4 grid h-full w-full content-center gap-1.5 sm:gap-2"
      >
        <div className="mb-0.5 text-center font-sans text-base font-semibold leading-6 sm:px-[7px] sm:text-start sm:text-xl sm:font-medium">
          Enter an OCHRE UUID to view as a gallery:
        </div>
        <input
          ref={inputRef}
          name="uuid"
          type="text"
          enterKeyHint="enter"
          autoCapitalize="false"
          autoCorrect="false"
          autoFocus={!isMobile}
          className="h-12 w-full rounded-sm bg-gradient-to-b from-white to-neutral-100 p-2 transition-all focus:from-white focus:to-white focus:outline-none focus:ring-2 focus:ring-brand-600 sm:h-14"
          placeholder="Example: 9c4da06b-f15e-40af-a747-0933eaf3587e"
        />
        <FormButton />
        <Link
          href="/9c4da06b-f15e-40af-a747-0933eaf3587e"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 grid w-full grid-flow-col gap-2 rounded-sm bg-gradient-to-b from-neutral-50 to-neutral-300 py-2.5 pl-2.5 pr-2 font-sans font-semibold tracking-[0.3px] text-brand-800 shadow-md hover-xs active-md hover:scale-[1.01] active:scale-[0.99] active:rounded-sm"
        >
          <div className="col-start-1 col-end-2 row-start-1 row-end-2 self-center justify-self-center">
            View example
          </div>
          <SquareArrowOutUpRightIcon
            className="col-start-1 col-end-2 row-start-1 row-end-2 h-[18px] w-auto self-center justify-self-end"
            strokeWidth={2.75}
          />
        </Link>
      </form>
    </>
  );
}
