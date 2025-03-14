import { useState } from "react";

const ThreeD = () => {
  const [list] = useState([1, 2, 3, 4]);
  const [flipped, setFlipped] = useState(false); // 控制翻转状态

  // 切换翻转状态
  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="mx-auto w-50 group relative h-20 perspective-[10000px] transform-3d transition-transform">
      <div
        className="w-full h-full transform-3d transition-transform duration-1000"
        style={{
          transform: flipped ? "rotateX(360deg)" : "rotateX(0deg)",
        }}
        onClick={toggleFlip}
      >
        {list.map((it) => {
          return (
            <div
              className={
                "w-full h-full absolute flex items-center justify-center"
              }
              style={{
                transform:
                  it === 1
                    ? "translateZ(40px)"
                    : it === 2
                    ? "rotateX(90deg) translateZ(40px)"
                    : it === 3
                    ? "translateZ(-40px)"
                    : "rotateX(90deg) translateZ(-40px)",
                backgroundColor:
                  it === 1
                    ? "rgba(255, 0, 0, 0.5)"
                    : it === 2
                    ? "rgba(167, 154, 154, 0.5)"
                    : it === 3
                    ? "rgba(208, 255, 0, 0.5)"
                    : "rgba(0, 255, 0, 0.5)",
              }}
              key={it}
            >
              {it}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThreeD;
