import React, { useRef, useState } from "react";

const DragContainer = () => {
  const [dataList] = useState([1, 2, 3, 4, 5, 6]);
  const [droppedItems, setDroppedItems] = useState<number[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(
    null
  );

  const start = (e: React.DragEvent<HTMLDivElement>, item: number) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  const over = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.getData("text/plain")) {
      const item = JSON.parse(e.dataTransfer.getData("text/plain"));
      setDroppedItems([...droppedItems, item]);
    }
  };

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = "move";
    const target = e.target as HTMLDivElement;
    setTargetElement(target);
    target.classList.add("bg-blue-300", "opacity-50");
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (
      e.target === targetElement ||
      e.target === containerRef.current ||
      !containerRef.current ||
      !targetElement
    )
      return;

    const children = Array.from(containerRef.current.children); // 使用 children 而不是 childNodes
    const currentIndex = children.indexOf(targetElement);
    const targetIndex = children.indexOf(e.target as HTMLDivElement);

    if (currentIndex < targetIndex) {
      containerRef.current.insertBefore(
        targetElement,
        (e.target as HTMLDivElement).nextElementSibling
      );
    } else {
      containerRef.current.insertBefore(
        targetElement,
        e.target as HTMLDivElement
      );
    }
  };

  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.classList.remove("bg-blue-300", "opacity-50");

    e.preventDefault();
    if (
      e.target === targetElement ||
      e.target === containerRef.current ||
      !containerRef.current ||
      !targetElement
    )
      return;

    const children = Array.from(containerRef.current.children); // 使用 children 而不是 childNodes
    const currentIndex = children.indexOf(targetElement);
    const targetIndex = children.indexOf(e.target as HTMLDivElement);

    if (currentIndex < targetIndex) {
      containerRef.current.insertBefore(
        targetElement,
        (e.target as HTMLDivElement).nextElementSibling
      );
    } else {
      containerRef.current.insertBefore(
        targetElement,
        e.target as HTMLDivElement
      );
    }
  };

  return (
    <div className="mx-auto flex gap-6">
      <div className="w-40 h-80 border border-amber-500 p-2 rounded-xl flex flex-col gap-2">
        {dataList.map((i) => (
          <div
            draggable
            onDragStart={(e) => start(e, i)}
            className="bg-red-800 text-center"
            key={i}
          >
            {i}
          </div>
        ))}
      </div>
      <div
        ref={containerRef}
        className="w-60 h-100 border border-amber-500 p-2 rounded-xl flex flex-col gap-4 overflow-y-auto"
        onDragOver={over}
        onDrop={drop}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
      >
        {droppedItems.map((item, index) => (
          <div
            onDragEnter={dragEnter}
            draggable
            key={index}
            className="bg-pink-500 w-full h-10"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragContainer;
