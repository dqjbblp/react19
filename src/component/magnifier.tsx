import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import suCai from "../assets/sucai.mp4";

interface MagnifierProps {
  magnification?: number; // 放大倍数
  size?: number; // 放大镜大小
  borderColor?: string; // 边框颜色
  borderWidth?: number; // 边框宽度
  shadowColor?: string; // 阴影颜色
  shadowBlur?: number; // 阴影模糊度
}

const Magnifier: React.FC<MagnifierProps> = ({
  magnification = 2.5,
  size = 200,
  borderColor = "#ff6b6b",
  borderWidth = 3,
  shadowColor = "rgba(0, 0, 0, 0.3)",
  shadowBlur = 10,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magnifierRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  const [isVisible, setIsVisible] = useState(false);
  const [videoBounds, setVideoBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  // 创建离屏canvas用于视频帧捕获
  const offscreenCanvas = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    return canvas;
  }, [size]);

  const offscreenCtx = useMemo(() => {
    return offscreenCanvas.getContext("2d")!;
  }, [offscreenCanvas]);

  // 更新视频边界信息
  const updateVideoBounds = useCallback(() => {
    if (videoRef.current) {
      const rect = videoRef.current.getBoundingClientRect();
      setVideoBounds({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  // 鼠标进入事件
  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  // 鼠标离开事件
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // 鼠标移动事件 - 优化版本
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLVideoElement>) => {
      if (!videoRef.current || !offscreenCtx) return;

      const { clientX, clientY } = e;

      // 直接更新ref，避免状态更新导致的卡顿
      mousePositionRef.current = { x: clientX, y: clientY };

      // 使用requestAnimationFrame优化性能，减少重复调用
      if (animationFrameRef.current) {
        return; // 如果已经有动画帧在运行，直接返回
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        if (!videoRef.current || !offscreenCtx) return;

        const { x: mouseX, y: mouseY } = mousePositionRef.current;

        // 计算源视频区域
        const sourceX =
          (mouseX - videoBounds.left) *
          (videoRef.current.videoWidth / videoBounds.width);
        const sourceY =
          (mouseY - videoBounds.top) *
          (videoRef.current.videoHeight / videoBounds.height);

        // 计算源区域大小（考虑放大倍数）
        const sourceSize = size / magnification;

        // 清除canvas
        offscreenCtx.clearRect(0, 0, size, size);

        // 绘制放大的视频区域
        offscreenCtx.drawImage(
          videoRef.current,
          sourceX - sourceSize / 2,
          sourceY - sourceSize / 2,
          sourceSize,
          sourceSize,
          0,
          0,
          size,
          size
        );

        // 更新显示canvas
        if (canvasRef.current) {
          const displayCtx = canvasRef.current.getContext("2d");
          if (displayCtx) {
            displayCtx.clearRect(0, 0, size, size);
            displayCtx.drawImage(offscreenCanvas, 0, 0);
          }
        }

        // 更新放大镜位置 - 居中于鼠标
        if (magnifierRef.current) {
          magnifierRef.current.style.left = `${mouseX - videoBounds.left}px`;
          magnifierRef.current.style.top = `${mouseY - videoBounds.top}px`;
        }

        // 重置动画帧引用
        animationFrameRef.current = undefined;
      });
    },
    [videoBounds, size, magnification, offscreenCtx]
  );

  // 初始化和清理
  useEffect(() => {
    updateVideoBounds();

    const handleResize = () => {
      updateVideoBounds();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateVideoBounds]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          视频放大镜
        </h2>
        <p className="text-center text-gray-600 mb-6">
          将鼠标悬停在视频上查看放大效果
        </p>

        <div className="relative bg-white rounded-lg overflow-hidden shadow-xl">
          <video
            ref={videoRef}
            src={suCai}
            controls
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-auto cursor-crosshair"
            style={{ minHeight: "300px" }}
          />

          {/* 放大镜 - 使用绝对定位，居中于鼠标 */}
          {isVisible && (
            <div
              ref={magnifierRef}
              className="absolute pointer-events-none z-50"
              style={{
                width: size,
                height: size,
                border: `${borderWidth}px solid ${borderColor}`,
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: `0 0 ${shadowBlur}px ${shadowColor}`,
                transform: "translate(-50%, -50%)", // 确保居中
                transition: "none", // 移除过渡动画以避免卡顿
              }}
            >
              <canvas
                ref={canvasRef}
                width={size}
                height={size}
                className="w-full h-full"
                style={{
                  borderRadius: "50%",
                }}
              />
            </div>
          )}
        </div>

        {/* 配置信息 */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            放大倍数: {magnification}x | 放大镜大小: {size}px
          </p>
        </div>
      </div>
    </div>
  );
};

export default Magnifier;

// 使用示例：
//
// // 基础用法
// <Magnifier />
//
// // 自定义配置
// <Magnifier
//   magnification={3.0}
//   size={250}
//   borderColor="#ff6b6b"
//   borderWidth={4}
//   shadowColor="rgba(255, 107, 107, 0.4)"
//   shadowBlur={12}
// />
//
// // 高倍放大镜
// <Magnifier
//   magnification={5.0}
//   size={300}
//   borderColor="#2ed573"
//   borderWidth={5}
// />
