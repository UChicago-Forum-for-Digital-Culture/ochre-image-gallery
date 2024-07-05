"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import { type GalleryStore, createGalleryStore } from "@/stores/gallery-store";

export type GalleryStoreApi = ReturnType<typeof createGalleryStore>;

export const GalleryStoreContext = createContext<GalleryStoreApi | undefined>(
  undefined,
);

export type GalleryStoreProviderProps = {
  children: ReactNode;
};

export const GalleryStoreProvider = ({
  children,
}: GalleryStoreProviderProps) => {
  const storeRef = useRef<GalleryStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createGalleryStore();
  }

  return (
    <GalleryStoreContext.Provider value={storeRef.current}>
      {children}
    </GalleryStoreContext.Provider>
  );
};

export const useGalleryStore = <T,>(
  selector: (store: GalleryStore) => T,
): T => {
  const galleryStoreContext = useContext(GalleryStoreContext);

  if (!galleryStoreContext) {
    throw new Error(`useGalleryStore must be used within GalleryStoreProvider`);
  }

  return useStore(galleryStoreContext, selector);
};
