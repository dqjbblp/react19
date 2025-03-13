import { useCallback, useEffect, useRef, useState } from "react";

const Swiper = () => {
  const [renderList] = useState(["1", "2", "3"]);

  const [current, setCurrent] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const init = () => {
    if (!ref.current) return;

    const firstEle = ref.current.firstElementChild?.cloneNode(true);
    const lastEle = ref.current.lastElementChild?.cloneNode(
      true
    ) as HTMLDivElement;

    if (!firstEle || !lastEle) return;
    ref.current.appendChild(firstEle);
    ref.current.insertBefore(lastEle, ref.current.firstElementChild);
    lastEle.style.marginLeft = "-100%";
  };

  useEffect(() => {
    init();
  }, []);

  const leftOrRight = useCallback(
    (type: "prev" | "next") => {
      if (!ref.current) return;
      if (type === "prev") {
        if (current !== 0) {
          moveTo(current - 1);
        } else {
          ref.current.style.transition = "none";
          ref.current.style.transform = `translateX(-${
            100 * renderList.length
          }%)`;
          requestAnimationFrame(() => {
            moveTo(renderList.length - 1);
          });
        }
      } else {
        if (current !== renderList.length - 1) {
          moveTo(current + 1);
        } else {
          ref.current.style.transition = "none";
          ref.current.style.transform = `translateX(${100}%)`;
          requestAnimationFrame(() => {
            moveTo(0);
          });
        }
      }
    },
    [current, renderList.length]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      requestAnimationFrame(() => {
        leftOrRight("next");
      });
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [current, leftOrRight]);

  const moveTo = (index: number) => {
    if (!ref.current) return;
    setCurrent(index);
    ref.current.style.transform = `translateX(-${100 * index}%)`;
    ref.current.style.transition = "transform 0.5s";
  };

  return (
    <div
      className={"w-100 h-40 border outline mx-auto relative overflow-hidden"}
    >
      <div ref={ref} className={"w-full h-full flex relative"}>
        {renderList.map((it, index) => {
          return (
            <div
              className={"w-full h-full"}
              style={{
                flex: "0 0 100%",
                backgroundColor:
                  Number(it) === 1
                    ? "#e3356a"
                    : index === 2
                    ? "#a65978"
                    : "#a99321",
              }}
              key={index}
            >
              {it}
            </div>
          );
        })}
      </div>

      <div
        onClick={() => leftOrRight("prev")}
        className={
          "w-10 flex items-center justify-center rounded-full h-10 border border-red-950 absolute left-1 z-10 top-1/2 -translate-y-1/2 cursor-pointer"
        }
      >
        {"<"}
      </div>
      <div
        onClick={() => leftOrRight("next")}
        className={
          "w-10 flex items-center justify-center rounded-full h-10 border border-red-950 absolute right-1 z-10 top-1/2 -translate-y-1/2 cursor-pointer"
        }
      >
        {">"}
      </div>

      <div
        className={
          "absolute bottom-2 z-10 flex gap-2 -translate-x-1/2 left-1/2"
        }
      >
        {renderList.map((_, index) => {
          return (
            <div
              onClick={() => moveTo(index)}
              className={"w-2 h-2 border border-white rounded-full"}
              key={index}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Swiper;
