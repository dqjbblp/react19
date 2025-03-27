import { ReactNode } from "react";
import { createRoot } from "react-dom/client";

function renderToBody(element:ReactNode) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(element);

  function unmount() {
    root.unmount();
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
  return unmount;
}

export default renderToBody
