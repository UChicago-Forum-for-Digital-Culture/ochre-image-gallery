import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsNumberLiteral,
} from "nuqs/server";
import { DEFAULT_PER_PAGE, PER_PAGE_OPTIONS } from "./utils";

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  per_page:
    parseAsNumberLiteral(PER_PAGE_OPTIONS).withDefault(DEFAULT_PER_PAGE),
});
