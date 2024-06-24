"use server";

import { isValidUUID } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function handleUuidRoute(prevState: unknown, formData: FormData) {
  const uuid = formData.get("uuid") as string;
  if (uuid) {
    if (!isValidUUID(uuid)) {
      return {
        message:
          "The UUID value you have entered is not valid, please try again.",
      };
    }

    redirect(`/${uuid}`);
  }
}
