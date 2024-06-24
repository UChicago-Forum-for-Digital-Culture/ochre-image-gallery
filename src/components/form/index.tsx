"use client";

import { handleUuidRoute } from "@/actions";
import FormButton from "@/components/form-button";
import { useEffect } from "react";
import { useFormState as useActionState } from "react-dom";
import { toast } from "sonner";

const initialState = {
  message: "",
};

export default function Form() {
  const [state, formAction] = useActionState(handleUuidRoute, initialState);

  useEffect(() => {
    if (state?.message) {
      toast(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="-mt-4 grid h-full content-center justify-center gap-1.5 sm:gap-2"
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
        className="mx-auto h-12 w-[calc(100dvw-1rem)] rounded-sm bg-gradient-to-b from-neutral-100 to-neutral-200 p-2 transition-hover focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-brand-100 focus:brightness-hover sm:h-14 sm:w-[calc(100dvw-4rem)]"
        placeholder="Example: 9c4da06b-f15e-40af-a747-0933eaf3587e"
      />
      <FormButton />
    </form>
  );
}
