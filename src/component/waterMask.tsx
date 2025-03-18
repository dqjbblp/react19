import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const WaterMask = () => {
  const parent = useRef<HTMLDivElement>(null);

  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  const generateBase64Image = () => {
    // 创建一个 canvas 元素
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // 设置 canvas 的宽度和高度
    canvas.width = 200; // 根据文本长度和字体大小调整
    canvas.height = 150; // 根据字体大小调整

    // 设置字体样式
    if (!ctx) return;
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.translate(centerX, centerY); // 将坐标原点移到画布中心
    ctx.rotate((-30 * Math.PI) / 180); // 旋转45度（角度转弧度）
    ctx.translate(-centerX, -centerY); // 将坐标原点移回原位置

    ctx.fillText("盗版必究", 100, 75); // 在画布上绘制文本
    return canvas.toDataURL("image/png");
  };

  const reset = useCallback(() => {
    setDiv((prev) => {
      if (prev) {
        prev.remove();
        return null;
      } else {
        const res = generateBase64Image();
        const newDiv = document.createElement("div");

        newDiv.style.position = "absolute";
        newDiv.style.backgroundImage = `url(${res})`;
        newDiv.style.backgroundSize = `200px 200px`;
        newDiv.style.backgroundRepeat = "repeat";
        newDiv.style.zIndex = "9999";
        newDiv.style.pointerEvents = "none";
        newDiv.style.inset = "0";
        if (parent.current) parent.current.appendChild(newDiv);
        return newDiv;
      }
    });
  }, []);
  useEffect(() => {
    reset();
  }, [reset]);

  const ob = useMemo(() => {
    return new MutationObserver((record) => {
      for (const item of record) {
        for (const node of item.removedNodes) {
          if (node === div) {
            setDiv(null);
            reset();
            return;
          }
        }

        if (item.target === div) {
          setDiv(null);
          reset();
        }
      }
    });
  }, [div, reset]);

  useEffect(() => {
    if (!parent.current) return;
    ob.observe(parent.current, {
      childList: true,
      subtree: true,
      attributes: true,
    });
    return () => {
      ob.disconnect();
    };
  }, [ob]);

  return (
    <div className={"relative h-100 overflow-hidden w-100"} ref={parent}>
      <div>123</div>
    </div>
  );
};

export default WaterMask;
