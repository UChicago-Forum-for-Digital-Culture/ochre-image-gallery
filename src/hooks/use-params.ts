"use client";

import { parseAsInteger, parseAsNumberLiteral, useQueryStates } from "nuqs";

export const DEFAULT_PER_PAGE = 12;
export const PER_PAGE_OPTIONS = [12, 24, 48] as const;

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
