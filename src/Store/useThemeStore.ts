import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  theme: string;
};

type Actions = {
  setTheme: (name: string) => void;
};

const useThemeStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      theme: "light",
      setTheme: (name) => {
        set((state) => {
          state.theme = name;
        });
      },
    })),
    {
      name: "use_theme",
    }
  )
);

export default useThemeStore;

