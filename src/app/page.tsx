import Form from "@/components/form";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  const headerStore = headers();
  const userAgent = headerStore.get("user-agent") ?? "";

  const { isMobile } = getSelectorsByUserAgent(userAgent) as {
    isMobile: boolean;
  };

  return (
    <main className="absolute bottom-0 left-0 right-0 top-0 mx-auto max-w-prose p-2">
      <Form isMobile={isMobile} />
    </main>
  );
}
