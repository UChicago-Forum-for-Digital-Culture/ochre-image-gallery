import { createStore } from "zustand/vanilla";

export type GalleryState = {
  projectName: string;
  itemName: string;
  maxLength: number | null;
};

export type GalleryActions = {
  setProjectName: (projectName: string) => void;
  setItemName: (itemName: string) => void;
  setMaxLength: (maxLength: number | null) => void;
};

export type GalleryStore = GalleryState & GalleryActions;

export const defaultInitState: GalleryState = {
  projectName: "",
  itemName: "",
  maxLength: null,
};

export const createGalleryStore = (
  initState: GalleryState = defaultInitState,
) => {
  return createStore<GalleryStore>()((set) => ({
    ...initState,
    setProjectName: (projectName: string) =>
      set((state) => {
        if (state.projectName === projectName) {
          return state;
        }

        return { projectName: projectName };
      }),
    setItemName: (itemName: string) =>
      set((state) => {
        if (state.itemName === itemName) {
          return state;
        }

        return { itemName: itemName };
      }),
    setMaxLength: (maxLength: number | null) =>
      set((state) => {
        if (state.maxLength === maxLength) {
          return state;
        }

        return { maxLength: maxLength };
      }),
  }));
};
