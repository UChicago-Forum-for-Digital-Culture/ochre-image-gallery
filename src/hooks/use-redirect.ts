import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function useRedirect() {
  const router = useRouter();

  const hasRedirected = useRef(false);

  useEffect(() => {
    // it is annoying to deal with the redirect in development
    if (process.env.NODE_ENV === "development") {
      return;
    }

    let timeout: NodeJS.Timeout | null = null;
    if (!hasRedirected.current) {
      toast.dismiss();
      toast("Redirecting you to the homepage...");
      timeout = setTimeout(() => router.push("/"), 3000);
      hasRedirected.current = true;
    }

    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [router]);
}
