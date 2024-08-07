"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider } from "next-themes";
import { GalleryStoreProvider } from "./gallery-store-provider";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GalleryStoreProvider>
        <ThemeProvider attribute="class">
          {children}
          <ProgressBar
            color="#0D87D3"
            shallowRouting={true}
            shouldCompareComplexProps={true}
            disableSameURL={false}
            options={{
              showSpinner: false,
              easing: "ease-in-out",
              speed: 300,
            }}
          />
        </ThemeProvider>
      </GalleryStoreProvider>
    </QueryClientProvider>
  );
}
