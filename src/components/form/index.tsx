"use client";

import { handleUuidRoute } from "@/actions";
import FormButton from "@/components/form-button";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export default function Form() {
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

  return (
    <form
      action={execute}
      className="-mt-4 grid h-full w-full content-center gap-1.5 sm:gap-2"
    >
      <div className="px-4 text-center font-sans text-base font-semibold leading-6 sm:px-2 sm:text-start sm:text-xl sm:font-medium">
        Enter an OCHRE UUID to view as a gallery:
      </div>
      <input
        name="uuid"
        type="text"
        enterKeyHint="enter"
        autoCapitalize="false"
        autoCorrect="false"
        autoFocus={true}
        className="h-12 w-full rounded-sm bg-gradient-to-b from-neutral-100 to-neutral-200 p-2 transition-hover focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-brand-100 focus:brightness-hover sm:h-14"
        placeholder="Example: 9c4da06b-f15e-40af-a747-0933eaf3587e"
      />
      <FormButton />
    </form>
  );
}
