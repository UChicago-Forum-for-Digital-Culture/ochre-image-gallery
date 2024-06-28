"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
      <ProgressBar
        color="#bd002c"
        delay={300}
        shallowRouting={true}
        disableSameURL={false}
        options={{
          showSpinner: false,
          easing: "ease-in-out",
          speed: 300,
        }}
      />
    </ThemeProvider>
  );
}
