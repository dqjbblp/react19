import { useEffect, useMemo, useRef, useState } from "react";

const FakeList = () => {
  const refC = useRef<HTMLDivElement>(null);
  const refL = useRef<HTMLDivElement>(null);

  const [array, setArray] = useState<number[]>(
    Array.from({ length: 10 }, (_, index) => index)
  );

  const high = 32;

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [renderList, setRenderList] = useState<number[]>([]);
  const [scroll, setScroll] = useState<{
    height: string;
    transform: string;
  }>({
    height: "0px",
    transform: "",
  });

  const containerHigh = useMemo(() => {
    if (refC.current) {
      return refC.current.offsetHeight;
    } else {
      return 0;
    }
  }, []);

  const maxCount = useMemo(() => {
    return Math.ceil(containerHigh / high) + 1;
  }, [containerHigh]);

  const addData = () => {
    setArray((prev) => {
      return [...prev, prev[prev.length - 1] + 1];
    });
  };

  useEffect(() => {
    setEnd(() => {
      if (start + maxCount > array.length) {
        addData();
      }
      return Math.min(start + maxCount, array.length);
    });
  }, [maxCount, start, array]);

  useEffect(() => {
    setRenderList(() => {
      return array.slice(start, end);
    });
  }, [start, end, array]);

  useEffect(() => {
    const hight = `${array.length * high - high * start}px`;
    const transform = `translate3d(0,${start * high}px,0)`;

    setScroll(() => {
      return {
        height: hight,
        transform,
      };
    });
  }, [array, start]);

  const handleScroll = () => {
    if (refC.current) {
      const { scrollTop } = refC.current;
      setStart(() => {
        return Math.floor(scrollTop / high);
      });
    }
  };

  return (
    <div
      className={
        "mx-auto h-100 w-60 border-2 border-dashed rounded-xl border-green-600 p-2"
      }
    >
      <div
        onScroll={handleScroll}
        ref={refC}
        className={"w-full h-full overflow-auto"}
      >
        <div
          ref={refL}
          style={{ height: scroll.height, transform: scroll.transform }}
          className={"flex flex-col"}
        >
          {renderList.map((i) => {
            return (
              <div style={{ height: high }} key={i}>
                {i}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FakeList;
