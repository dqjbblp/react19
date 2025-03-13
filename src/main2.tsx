import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import "./index.css";
import App2 from "./App2";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App2 />
  </BrowserRouter>
);
