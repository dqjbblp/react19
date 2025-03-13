import { useEffect, useRef, useState } from "react";

const CanvasEle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const mousePosition = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, [canvasRef]);

  const init = () => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth - 32;
    canvasRef.current.height = 800;
  };

  useEffect(() => {
    init();
  }, []);

  const getRandom = (max: number, min: number) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  class Circle {
    r: number;
    x: number;
    y: number;
    xv: number;
    yv: number;
    lastTime: number | null;
    constructor() {
      this.r = 3;
      this.x = getRandom(this.r, Number(canvasRef?.current?.width) - this.r);
      this.y = getRandom(this.r, Number(canvasRef?.current?.height) - this.r);
      this.xv = getRandom(-50, 50);
      this.yv = getRandom(-50, 50);
      this.lastTime = null;
    }
    draw() {
      if (!ctx) return;

      if (this.lastTime) {
        const duration = (Date.now() - this.lastTime) / 1000;

        const xDis = this.xv * duration;
        const yDis = this.yv * duration;

        let newX = this.x + xDis;
        let newY = this.y + yDis;

        if (newX > Number(canvasRef.current?.width) - this.r / 2) {
          newX = Number(canvasRef.current?.width) - this.r / 2;
          this.xv = -this.xv;
        } else if (newX < 0) {
          this.xv = -this.xv;
        }

        if (newY > Number(canvasRef.current?.height) - this.r / 2) {
          newY = Number(canvasRef.current?.height) - this.r / 2;
          this.yv = -this.yv;
        } else if (newY < 0) {
          this.yv = -this.yv;
        }

        this.x += xDis;
        this.y += yDis;
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); // 200 200 意思是圆心的位置为：在（200，200）的位置，半径为100，的半圆
      ctx.fillStyle = "#000";
      ctx.fill();
      this.lastTime = Date.now();
    }
  }

  class Graph {
    points: Circle[];
    max: number;
    constructor() {
      this.points = new Array(40).fill(0).map(() => new Circle());
      this.max = 250;
    }

    draw() {
      if (!canvasRef.current || !ctx) return;
      requestAnimationFrame(() => {
        this.draw();
      });

      const { x: mouseX, y: mouseY } = mousePosition.current;

      ctx?.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
      for (let i = 0; i <= this.points.length - 1; i++) {
        const p1 = this.points[i];
        p1.draw();

        if (mouseX !== 0 || mouseY !== 0) {
          const d = Math.sqrt((p1.x - mouseX) ** 2 + (p1.y - mouseY) ** 2);
          if (d <= this.max) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.closePath();
            ctx.strokeStyle = `rgba(238,8,8,${1 - d / this.max})`;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j <= this.points.length - 1; j++) {
          const p2 = this.points[j];
          if (!ctx) return;

          const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

          if (d > this.max) {
            continue;
          }
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.closePath();
          ctx.strokeStyle = `rgba(0,0,0,${1 - d / this.max})`;
          ctx.stroke();
        }
      }
    }
  }

  const p = new Graph();
  p.draw();

  const move = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!canvasRef.current) return;
    const x = Math.max(
      0,
      e.clientX - canvasRef.current.getBoundingClientRect().x
    );
    const y = Math.max(
      0,
      e.clientY - canvasRef.current.getBoundingClientRect().y
    );

    mousePosition.current = {
      x,
      y,
    };
  };

  return (
    <div>
      <canvas
        onMouseMove={move}
        onMouseOut={() => {
          mousePosition.current = { x: 0, y: 0 };
        }}
        ref={canvasRef}
        className={"bg-white"}
      ></canvas>
    </div>
  );
};

export default CanvasEle;
