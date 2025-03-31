import { useState } from "react";

const CardA = () => {
  const [a, setA] = useState(0);
  return (
    <div className={"card-a"}>
      {a}
      <button
        onClick={() => setA((e) => e + 1)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        setA
      </button>
    </div>
  );
};

export default CardA;
