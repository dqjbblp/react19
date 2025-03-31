import { useState } from "react";

const CardB = () => {
  const [b, setB] = useState(0);
  return (
    <div>
      {b}
      <button
        onClick={() => setB((e) => e + 1)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        setB
      </button>
    </div>
  );
};

export default CardB;
