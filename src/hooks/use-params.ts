"use client";

import { DEFAULT_PER_PAGE, PER_PAGE_OPTIONS } from "@/lib/utils";
import { parseAsInteger, parseAsNumberLiteral, useQueryStates } from "nuqs";

export function useParams() {
  const params = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      per_page:
        parseAsNumberLiteral(PER_PAGE_OPTIONS).withDefault(DEFAULT_PER_PAGE),
    },
    { history: "push", clearOnDefault: true },
  );

  return params;
}
