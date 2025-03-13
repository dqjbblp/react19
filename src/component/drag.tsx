import { useCallback, useEffect, useRef, useState } from "react";

const Drag = () => {
  const dragRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setWidth] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startP, setStartP] = useState({ x: 0, y: 0 });

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const { clientX, clientY } = e;
    setStartP({ x: clientX, y: clientY });
  };

  const dragEnd = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (!dragRef.current) return;
      const { clientX, clientY } = e;
      setPosition((prev) => {
        return {
          x: Math.max(
            0,
            Math.min(containerWidth - 100, prev.x + clientX - startP.x)
          ),
          y: Math.max(0, Math.min(298, prev.y + clientY - startP.y)),
        };
      });
    },
    [containerWidth, startP.x, startP.y]
  );

  useEffect(() => {
    setWidth(Number(containerRef.current?.clientWidth));
    const handleResize = () => {
      setWidth(Number(containerRef.current?.clientWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => console.log(e)}
      onMouseUp={(e) => console.log(e)}
      className={"w-full h-[400px] border border-dashed relative"}
    >
      <div
        ref={dragRef}
        className={"w-25 h-25 bg-amber-300 absolute transition-all"}
        style={{ top: `${position.y}px`, left: `${position.x}px` }}
        draggable
        onDragStart={dragStart}
        onDragEnd={dragEnd}
      />
    </div>
  );
};

export default Drag;
