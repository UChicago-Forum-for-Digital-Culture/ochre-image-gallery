"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProgressBar
        color="#0D87D3"
        delay={300}
        shallowRouting={true}
        disableSameURL={false}
        options={{
          showSpinner: false,
          easing: "ease-in-out",
          speed: 300,
        }}
      />
    </>
  );
}
