import { ReactNode } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


export interface IToast {
  type?:'success'|'error',
  msg:ReactNode
}

type State = {
  desc?:IToast
};

type Actions = {
  setList: (desc?:IToast) => void;
};

const useToolTipStore = create<State & Actions>()(
  immer((set) => ({
    setList: (desc) => {
      set((state) => {
        state.desc = desc
      });
    },
  }))
);

export default useToolTipStore;

