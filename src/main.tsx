import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import "./index.css";
import App from "./App";
import ToolTip from "./component/toolTip";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}
  >
    <BrowserRouter>
      <ToolTip />
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
