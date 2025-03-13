import { useDeferredValue, useEffect, useState } from "react";
import useToolTipStore, { IToast } from "../Store/useToolTipStore";

const ToolTip = () => {
  const { desc, setList } = useToolTipStore();
  const [toasts, setToasts] = useState<IToast[]>([]);
  const toastsDeffer = useDeferredValue(toasts);

  useEffect(() => {
    if (!desc) return;
    if (
      toasts[toasts.length - 1]?.msg === desc?.msg &&
      toasts[toasts.length - 1].type === desc.type
    )
      return;
    setToasts((prev) => [...prev, desc]);
    setList(undefined);
    setTimeout(() => {
      setToasts((prev) => {
        const newList = prev.slice(1);
        return newList;
      });
    }, 2000);

    return () => {};
  }, [desc, toasts, setList]);

  return (
    <div
      className={
        "fixed left-1/2 -translate-x-1/2 w-fit top-20 flex flex-col gap-2 transform transition-all duration-500"
      }
    >
      {toastsDeffer.map((item, index) => {
        return (
          <div
            className={`w-25 h-10 flex items-center justify-center rounded text-white ${
              item.type === "success" ? "bg-green-600" : "bg-red-500"
            }`}
            key={index}
          >
            {item.msg}
          </div>
        );
      })}
    </div>
  );
};

export default ToolTip;
