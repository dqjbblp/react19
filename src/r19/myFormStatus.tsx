import { useFormStatus } from "react-dom";

const MyFormStatus = () => {
  const realFun = async () => {
    try {
      await fakeApi();
    } catch (err) {
      const error = err as string;
      console.log(error);
    }
  };

  return (
    <form action={realFun}>
      <input className={"border"} name="message" />
      <Btn />
    </form>
  );
};

export default MyFormStatus;

const Btn = () => {
  const { pending, data } = useFormStatus();
  console.log(data?.get("message"));

  return <button type="submit">{pending ? "提交中.." : "提交"}</button>;
};

const fakeApi = async () => {
  await new Promise((res, rev) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        res("成功");
      } else {
        rev("失败");
      }
    }, 1000);
  });
};
