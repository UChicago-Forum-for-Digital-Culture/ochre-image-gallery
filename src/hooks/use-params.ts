"use client";

import { parseAsInteger, useQueryStates } from "nuqs";

export function useParams() {
  return useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      ["per_page"]: parseAsInteger.withDefault(10),
    },
    { history: "push" },
  );
}
