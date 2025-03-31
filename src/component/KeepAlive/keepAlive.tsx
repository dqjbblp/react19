import {
  ReactElement,
  ReactPortal,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CardA from "./cardA";
import CardB from "./cardB";
import { createPortal } from "react-dom";

const KeepAlive = () => {
  const [tab, setTab] = useState("A");

  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <div>
        <button
          onClick={() => setTab("A")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          A
        </button>
        <button
          onClick={() => setTab("B")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          B
        </button>
      </div>
      <div className={"father"}>
        <Catch currentTab={tab}>
          <CardA key={"A"} />
          <CardB key={"B"} />
        </Catch>
      </div>
    </div>
  );
};

export default KeepAlive;

const Catch = ({
  children,
  currentTab,
}: {
  children: ReactElement[];
  currentTab: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [obj, setObj] = useState<{ [key: string]: ReactPortal }>({});
  const [obj2, setObj2] = useState<{ [key: string]: HTMLDivElement }>({});

  useEffect(() => {
    children.forEach((i) => {
      if (ref.current) {
        const divEle = document.createElement("div");
        const portal = createPortal(i, divEle);
        setObj((prev) => {
          return {
            ...prev,
            [i.key as string]: portal,
          };
        });
        setObj2((prev) => {
          return {
            ...prev,
            [i.key as string]: divEle,
          };
        });
      }
    });
  }, []);

  const portalList = useMemo(() => {
    return Object.values(obj);
  }, [obj]);

  useEffect(() => {
    if (ref.current && obj2[currentTab]) {
      ref.current.appendChild(obj2[currentTab]);
    }
    return () => {
      try {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref?.current?.removeChild(obj2[currentTab]);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        /*empty */
      }
    };
  }, [currentTab, obj2]);

  return (
    <>
      <div className={"ref"} ref={ref} />
      {portalList}
    </>
  );
};
