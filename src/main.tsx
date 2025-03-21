import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import "./index.css";
import App from "./App";
import ToolTip from "./component/toolTip";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToolTip />
    <App />
  </BrowserRouter>
);
