import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";

const Flip = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const refList = useRef<HTMLDivElement[]>([]);

  const [init2, setInit2] = useState({
    flex: 0,
    HTML: 0,
    Css3: 0,
    React: 0,
    Vue: 0,
    vite: 0,
  });

  const [list, setList] = useState([
    "flex",
    "HTML",
    "Css3",
    "React",
    "Vue",
    "vite",
  ]);

  const inter = useIntersection(containerRef as React.RefObject<HTMLElement>, {
    threshold: 1,
  });

  const createDiffSortList = (arr: string[]) => {
    const shuffled = [...arr];
    const n = shuffled.length;

    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  const changeList = () => {
    const newList = createDiffSortList(list);
    setList(newList);

    const valueList = Object.values(init2);
    const newObj = newList
      .map((item, index) => {
        return {
          [item]: valueList[index],
        };
      })
      .reduce((acc, obj) => {
        return { ...acc, ...obj }; // 合并对象
      }, {}) as typeof init2;

    refList.current.forEach((it) => {
      const key = it.innerHTML as keyof typeof init2;
      const diff = init2[key] - newObj[key];
      it.style.transform = `translateY(${diff}px)`;
      raf(() => {
        it.style.transition = "transform 1s";
        it.style.removeProperty("transform");
      });
    });
  };

  const getLocation = (el: Element) => {
    return el.getBoundingClientRect().top;
  };

  const raf = (callback: FrameRequestCallback) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(callback);
    });
  };

  useEffect(() => {
    if (Number(inter?.intersectionRatio) >= 1) {
      setInit2(
        refList.current
          .map((item) => {
            return {
              [item.innerHTML]: getLocation(item),
            };
          })
          .reduce((acc, obj) => {
            return { ...acc, ...obj }; // 合并对象
          }, {}) as typeof init2
      );
    }
  }, [refList, inter?.intersectionRatio]);

  return (
    <div
      ref={containerRef}
      className={"flex flex-col items-center justify-center gap-2"}
    >
      <button
        onClick={changeList}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        change list
      </button>

      {list.map((item, index) => {
        return (
          <div
            ref={(el) => {
              refList.current[index] = el as HTMLInputElement;
            }}
            id="change"
            className={
              "bg-green-500 w-40 h-10 rounded-2xl flex items-center justify-center"
            }
            key={item}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Flip;
