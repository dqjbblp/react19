import { useState } from "react";

const StepCircle = () => {
  const [per, setPer] = useState(0);

  const [cirPer, setCirPer] = useState(0);

  // 增加进度的函数
  const increasePer = () => {
    // 确保进度不超过100%
    if (per >= 100) return;
    setPer((prev) => prev + 10);
  };

  // 重置进度的函数
  const resetPer = () => {
    setPer(0);
  };

  const increaseCirPer = () => {
    if (cirPer >= 360) return;
    setCirPer((prev) => prev + 36);
  };

  const resetCirPer = () => {
    setCirPer(0);
  };

  return (
    <div>
      <div className="h-4 w-full bg-gray-200 rounded-full relative overflow-hidden">
        <div
          className={`h-full bg-blue-600 rounded-full absolute left-0 transition-all duration-500`}
          style={{ width: `${per}%` }}
        />
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={increasePer}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          增加10%
        </button>
        <button
          onClick={resetPer}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          重置
        </button>
      </div>

      <div
        className={
          "w-20 h-20 mt-10 relative flex justify-center items-center rounded-full border-4 border-amber-400"
        }
      >
        <div
          className="h-20 w-20 absolute bg-translate rounded-full border-4 border-black transition-all duration-500"
          style={{
            clipPath: `inset(0 40px ${
              cirPer <= 180 ? "0px" : ((cirPer - 180) / 180) * 80 + "px"
            } 0)`,
          }}
        ></div>
        <div
          className="h-20 w-20 absolute bg-translate rounded-full border-4 border-black transition-all duration-500"
          style={{
            clipPath: `inset(${
              cirPer > 180 ? "80px" : (cirPer / 180) * 80 + "px"
            } 0 0 40px)`,
          }}
        ></div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={increaseCirPer}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          增加10%
        </button>
        <button
          onClick={resetCirPer}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          重置--{cirPer}
        </button>
      </div>
    </div>
  );
};

export default StepCircle;
