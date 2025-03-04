import { useActionState, useOptimistic } from "react";

const NewActionStatePlus = () => {
  const fn = async (prevList: string[], newName: FormData) => {
    const name = newName.get("name") as string;
    setOptState(name);
    try {
      const res = await fakeApi(name);
      return [...prevList, res];
    } catch (error) {
      const err = error as string;
      window.alert(`${err}添加失败`);
      return prevList;
    }
  };

  const [state, formAction, isPending] = useActionState(fn, []);

  const [optState, setOptState] = useOptimistic(state, (prev, newP: string) => {
    return [...prev, newP];
  });

  return (
    <div className={"w-[400px] m-4"}>
      <form className="mb-4 flex gap-2 justify-center" action={formAction}>
        <input name="name" className="border" />
        <button>{isPending ? "loading..." : "提交"}</button>
      </form>
      <div className={"border border-pink-600 rounded-2xl min-h-[200px]"}>
        {optState.map((item) => {
          return <div key={item}>{item}</div>;
        })}
      </div>
    </div>
  );
};

export default NewActionStatePlus;

const fakeApi = (name: string): Promise<string> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        return res(name);
      } else {
        return rej(name);
      }
    }, 1000);
  });
};
