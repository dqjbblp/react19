import { Suspense, use, useEffect, useState } from "react";

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <Suspense fallback={<div>asyncing...</div>}>
        <Person />
      </Suspense>
      <FakseAsync />
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
