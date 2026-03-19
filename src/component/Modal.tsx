import React, { FC } from "react";
import { createRoot, Root } from "react-dom/client";

interface MyProps {
  msg: string;
  emit: () => void;
  confirmBtn?: boolean;
}

const Modal: FC<MyProps> = (props) => {
  return (
    <div
      className={
        "w-dvw h-dvh bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 flex items-center justify-center"
      }
    >
      <div className={"p-4 w-40 h-32 bg-white text-center"}>
        {props.msg}
        {props.confirmBtn && <div>确认</div>}
        <div onClick={props.emit}>关闭</div>
      </div>
    </div>
  );
};

const Wrapper = (Component: React.FC<MyProps>) => {
  let root: Root | null;
  let container: HTMLDivElement;

  const hide = () => {
    if (root) {
      document.body.removeChild(container);
      document.body.style.removeProperty("overflow-y");
      root.unmount();
      root = null;
    }
  };

  const show = (props: MyProps) => {
    if (!root) {
      container = document.createElement("div");
      root = createRoot(container);
      root.render(<Component {...props} />);
      document.body.style.overflowY = "hidden";
      document.body.appendChild(container);
    }
  };

  return {
    show,
    hide,
  };
};

const NewModal = Wrapper(Modal);
export default NewModal;
