import axios from "axios";
import { useState, useTransition } from "react";

const MyAction = () => {
  return (
    <div>
      <div className={"text-center"}>r19的Actions</div>

      <div className={"flex gap-20 mb-[40px]"}>
        <h2>18版本的常规与接口联动</h2>
        <R18FormStyle />
      </div>

      <div className={"flex gap-20"}>
        <h2>19版本的常规与接口联动</h2>
        <R19FormStyle />
      </div>
    </div>
  );
};

export default MyAction;

const R18FormStyle = () => {
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setPending(true);
    try {
      const res = await updateName(name);
      setName(res.data.id);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }
    setPending(false);
  };

  return (
    <div>
      <input
        className={"border"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button disabled={pending} type="button" onClick={handleSubmit}>
        提交
      </button>
      <h1>{pending ? "loading..." : name}</h1>
      {error && <p>{error}</p>}
    </div>
  );
};

const R19FormStyle = () => {
  const [name, setName] = useState("");
  const [isPending, startActions] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // react 19 的版本才支持在startActions 支持异步函数，actions并不是某一个技术，而是一种使用异步的思想或行为
    startActions(async () => {
      try {
        const res = await updateName(name);
        setName(res.data.id);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      }
    });
  };

  return (
    <div>
      <input
        className={"border"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button disabled={isPending} type="button" onClick={handleSubmit}>
        提交
      </button>
      <h1>{isPending ? "loading...19" : name}</h1>
      {error && <p>{error}</p>}
    </div>
  );
};

const updateName = (name: string) => {
  return axios({
    method: "post",
    url: "http://jsonplaceholder.typicode.com/posts",
    data: {
      title: name,
    },
  });
};
