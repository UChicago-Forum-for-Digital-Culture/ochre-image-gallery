import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function useRedirect() {
  const router = useRouter();

  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!hasRedirected.current) {
      toast("Redirecting you to the homepage...");
      setTimeout(() => router.push("/"), 3000);
      hasRedirected.current = true;
    }
  }, [router]);
}
