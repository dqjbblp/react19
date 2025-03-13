import { useEffect, useState } from "react";

const G2048 = () => {
  const [num, setNum] = useState<string[][]>([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const initialArray = Array(4)
      .fill("")
      .map(() => Array(4).fill(""));

    // 生成两个不同的随机位置
    const positions = new Set<string>();
    while (positions.size < 2) {
      const row = Math.floor(Math.random() * 4);
      const col = Math.floor(Math.random() * 4);
      positions.add(`${row},${col}`);
    }

    // 将随机位置的值设置为 "2"
    positions.forEach((position) => {
      const [row, col] = position.split(",").map(Number);
      initialArray[row][col] = "2";
    });

    // 更新状态
    setNum(initialArray);
  };

  return (
    <div className={"flex justify-center items-center"}>
      <div
        className={
          "w-125 h-125 p-4 bg-[#756452] rounded-2xl flex flex-col gap-4"
        }
      >
        {num.map((item, index) => {
          return (
            <div className={"flex justify-between flex-1 gap-4"} key={index}>
              {item.map((item2, index2) => {
                return (
                  <div
                    className={
                      "flex flex-1 items-center justify-center bg-[#bdac97] rounded-xl text-6xl font-bold text-white"
                    }
                    key={`${index}-${index2}`}
                  >
                    {item2}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default G2048;
