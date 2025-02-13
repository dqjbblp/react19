import axios from "axios";
import { useActionState } from "react";

const MyUseActionStatePlus = () => {
  const fn = async (prevValue: string, newValue: FormData) => {
    const fetchValue = newValue.get("name") as string;
    console.log(
      "上次返回的结果:",
      prevValue,
      "本次提交的是：",
      newValue.get("name")
    );
    try {
      const res = await updateName(fetchValue);
      return res.data.title;
    } catch (err) {
      const error = err as Error;
      return error.message;
    }
  };

  const [state, formAction, isPending] = useActionState(fn, "init value");

  return (
    <div>
      <div className={"mb-5 text-red-600"}>r19:useActionState and form</div>
      <div className={"flex gap-10 items-center"}>
        <form action={formAction}>
          <input name="name" className={"border"} />
          <button disabled={isPending} type={"submit"}>
            提交
          </button>
        </form>
        {isPending ? "loading...useActionState with form" : state}
      </div>
    </div>
  );
};

export default MyUseActionStatePlus;

const updateName = (name: string) => {
  return axios({
    method: "post",
    url: "http://jsonplaceholder.typicode.com/posts",
    data: {
      title: name,
    },
  });
};
