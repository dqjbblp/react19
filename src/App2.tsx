import { Link } from "react-router-dom";
import SelfRouter2 from "./Router2";

const App2 = () => {
  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>我是入口2</div>
      <Link to="/home2">home</Link>
      <SelfRouter2 />

      <div style={{ flex: 1, background: "red" }} />

      <div style={{ padding: "20px 0", background: "green" }} />
    </div>
  );
};

export default App2;
