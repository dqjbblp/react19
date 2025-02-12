/**
 * useTransition 会标记一个低优先加载，
 * 正常来说：点击Slow选项卡，会导致：卡顿，并且点击其他两个选项卡也会卡顿，显得没效果
 */
import { memo, useState, useTransition } from "react";

const TransItion = () => {
  const [tab, setTab] = useState("Home");
  const [isPending, startTransition] = useTransition(); // 第一个返回值是：是否加载完毕；第二个是：标记哪些是低优先级的函数

  const changeTab = (name: string) => {
    // 这样标记之后，就是会使：点击其它的选项卡不卡顿
    if (name === "Slow") {
      startTransition(() => {
        setTab(name);
      });
    } else {
      setTab(name);
    }
  };

  return (
    <div>
      <h3 className={"flex justify-center bg-bg2"}>
        react 18 的 Transition 与 19 的 actions 教学
      </h3>

      <div>
        <h4>useTransition</h4>
        <div className={"w-[400px] border"}>
          <div className={"flex gap-10"}>
            <button
              onClick={() => changeTab("Home")}
              className={"flex-1 text-center"}
            >
              Home
            </button>
            <button
              onClick={() => changeTab("Slow")}
              className={"flex-1 text-center"}
            >
              {isPending ? "loading..." : "Slow"}
            </button>
            <button
              onClick={() => changeTab("About")}
              className={"flex-1 text-center"}
            >
              About
            </button>
          </div>
        </div>
        {tab === "Home" ? (
          <HomeTab />
        ) : tab === "Slow" ? (
          <SlowTab />
        ) : (
          <About />
        )}
      </div>
    </div>
  );
};

export default TransItion;

const HomeTab = () => {
  return <div>Home Tab</div>;
};

const SlowTab = memo(() => {
  const items = [];
  for (let i = 0; i <= 100; i++) {
    items.push(i);
  }
  return (
    <div>
      <div>Slow Tab</div>
      <ul>
        {items.map((item) => {
          return <SlowItem index={item} key={item} />;
        })}
      </ul>
    </div>
  );
});
const SlowItem = ({ index }: { index: number }) => {
  const startTime = performance.now();
  while (performance.now() - startTime < 10) {
    /* empty */
  }
  return <li>slow item:{index}</li>;
};

const About = () => {
  return <div>About</div>;
};
