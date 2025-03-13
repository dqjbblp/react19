import { Suspense, use, useEffect, useState } from "react";
import useToolTipStore from "./Store/useToolTipStore";

const Home = () => {
  const { setList } = useToolTipStore();

  return (
    <div>
      <p>Home</p>
      <Suspense fallback={<div>asyncing...</div>}>
        <Person />
      </Suspense>
      <FakseAsync />

      <button onClick={() => setList({ msg: "成功啦～", type: "success" })}>
        成功的提示
      </button>
      <button onClick={() => setList({ msg: "失败了☹️", type: "error" })}>
        失败的提示
      </button>
    </div>
  );
};

export default Home;

const getPerson = (): Promise<{ name: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: new Date().toString() });
    }, 1000);
  });
};
const personPromise = getPerson();

const Person = () => {
  // use Api 接受传入一个 Promise 作为参数
  const person = use(personPromise);
  return <div>userName: {person.name}</div>;
};

const FakseAsync = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(456);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return <div>{value <= 0 ? "loading..." : value}</div>;
};
