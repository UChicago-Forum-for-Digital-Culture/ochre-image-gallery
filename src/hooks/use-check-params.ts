import { useEffect, useRef } from "react";
import { PER_PAGE_OPTIONS, useParams } from "./use-params";

export function useCheckParams() {
  const [{ page, per_page: perPage }, setState] = useParams();

  const hasChecked = useRef(false);

  useEffect(() => {
    async function handleIncorrectParams() {
      if (page < 1) {
        await setState({ page: 1 });
      }

      if (!PER_PAGE_OPTIONS.includes(perPage)) {
        await setState({ per_page: PER_PAGE_OPTIONS[0] });
      }
    }

    if (!hasChecked.current) {
      void handleIncorrectParams();
    }
  }, [page, perPage, setState]);
}
