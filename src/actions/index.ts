"use server";

import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  uuid: zfd.text(
    z.string().trim().uuid({
      message:
        "The UUID value you have entered is not valid, please try again.",
    }),
  ),
});

export const handleUuidRoute = actionClient
  .schema(schema)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  .action(async ({ parsedInput: { uuid } }) => redirect(`/${uuid.trim()}`));
