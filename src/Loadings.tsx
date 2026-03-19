import L1 from "./component/loadings/L1";
import L2 from "./component/loadings/L2";

const Loadings = () => {
  return (
    <div style={{ display: "flex", gap: 16, padding: 16, flexWrap: "wrap" }}>
      <L1 />
      <L2 />
    </div>
  );
};
export default Loadings;
