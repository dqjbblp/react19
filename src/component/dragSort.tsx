import { useMemo, useRef, useState } from "react";

const DragSort = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(
    null
  );

  const list = useMemo(() => {
    return [1, 2, 3, 4, 5];
  }, []);

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
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 允许访问 dataTransfer
    console.log(e);

    console.log(e.dataTransfer.getData("text")); // 此时可以正常访问
  };

  return (
    <div
      onDragStart={dragStart}
      onDragEnter={dragEnter}
      onDragEnd={dragEnd}
      onDrop={drop}
      ref={containerRef}
      className={"flex flex-col gap-4 items-center"}
    >
      {list.map((item) => {
        return (
          <div
            draggable
            className={`w-[200px] h-9 text-center bg-amber-700`}
            key={item}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default DragSort;
