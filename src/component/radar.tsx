import { useEffect, useRef, useState } from "react";

const Radar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, [canvasRef]);

  const init = () => {
    if (!canvasRef.current) return;
    canvasRef.current.width = 500;
    canvasRef.current.height = 500;
  };

  useEffect(() => {
    init();
  }, []);

  const [fake, setFake] = useState({
    颜值: 4,
    身高: 4.5,
    身材: 3.5,
    财富: 4,
    脾气: 3,
  });

  /**
   * 计算二维坐标中点 c 的位置
   * @param {number[]} a - 点 a 的二维坐标 [x1, y1]
   * @param {number[]} b - 点 b 的二维坐标 [x2, y2]
   * @param {number} percentage - 点 c 占总长度的百分比（0 到 100）
   * @returns {number[]} 点 c 的二维坐标 [x, y]
   */
  const calculatePointC = (
    a: [number, number],
    b: [number, number],
    percentage: number
  ): [number, number] => {
    const [x1, y1] = a;
    const [x2, y2] = b;

    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const x = x1 + (percentage / 100) * deltaX;
    const y = y1 + (percentage / 100) * deltaY;

    return [x, y];
  };

  const draw5 = () => {
    const lineArr: { x?: number; y?: number }[] = [];
    const rAngle = (Math.PI * 2) / 5;
    const rCenter = 250;
    const curR = 160;

    const key = Object.keys(fake);
    const value = Object.values(fake);

    if (!ctx) return;

    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();

    for (let i = 0; i < 5; i++) {
      lineArr[i] = {};
      lineArr[i].y = rCenter - curR * Math.cos(rAngle * i);
      lineArr[i].x = rCenter - curR * Math.sin(rAngle * i);

      ctx.fillStyle = "#000";
      const width = ctx.measureText(key[i]).width + 10;
      ctx.fillText(
        key[i],
        Number(lineArr[i].x) < 250
          ? Number(lineArr[i].x) - width
          : Number(lineArr[i].x) + 10,
        Number(lineArr[i].y)
      );
      ctx.lineTo(Number(lineArr[i].x), Number(lineArr[i].y));
    }
    ctx.closePath();
    ctx.strokeStyle = "#000";
    ctx.stroke();

    ctx.beginPath();
    lineArr.forEach((item) => {
      ctx.moveTo(250, 250);
      ctx.lineTo(Number(item.x), Number(item.y));
      ctx.strokeStyle = "#e55987";
    });
    ctx.stroke();

    const valuePoint = lineArr.map((item, index) => {
      const percent = value[index] / 5;

      const res = calculatePointC(
        [250, 250],
        [Number(item.x), Number(item.y)],
        percent * 100
      );

      return {
        x: res[0],
        y: res[1],
      };
    });

    ctx.beginPath();
    for (let i = 0; i <= valuePoint.length - 1; i++) {
      ctx.lineTo(valuePoint[i].x, valuePoint[i].y);
      ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
    }
    ctx.strokeStyle = "green";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  };

  draw5();

  return (
    <div className={"mx-auto"}>
      <canvas ref={canvasRef} className={"bg-white"} />
      <button
        onClick={() => {
          setFake((prev) => {
            return {
              ...prev,
              脾气: Math.random() * 5,
            };
          });
        }}
      >
        修改脾气
      </button>
    </div>
  );
};

export default Radar;
