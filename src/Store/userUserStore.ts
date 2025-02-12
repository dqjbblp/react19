import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  userName: string;
};

type Actions = {
  setName: (name: string) => void;
};

const userNameStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      userName: "hy",
      setName: (name) => {
        set((state) => {
          state.userName = name;
        });
      },
    })),
    {
      name: "x-store-wallet",
    }
  )
);

export default userNameStore;

