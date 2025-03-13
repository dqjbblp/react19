import { Link } from "react-router-dom";
import SelfRouter2 from "./Router2";

const App2 = () => {
  return (
    <div>
      <div>我是入口2</div>
      <Link to="/home2">home</Link>
      <SelfRouter2 />
    </div>
  );
};

export default App2;
