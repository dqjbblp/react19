import axios from "axios";
import { useActionState, useState, startTransition, useEffect } from "react";

const MyUseActionState = () => {
  const [name, setName] = useState("");

  /*
   *  第一个参数是上次函数（接口）返回的结果
   *  第二个参数是这次调用要传递的参数
   *  必须要有返回值,返回值会自动更新到state中
   */
  const fn = async (prevValue: string, nowValue: string) => {
    console.log("上次返回的结果:", prevValue, "本次提交的是：", nowValue);

    try {
      const res = await updateName(nowValue);
      return res.data.title;
    } catch (err) {
      const error = err as Error;
      return error.message;
    }
  };

  /**
   * 数组中：
   * state：第一次是初始值，之后就是fn的返回值，换句话可以理解为：接口的返回值
   * formAction：是可以给 按钮 或者 初始进入 时，直接调用的函数，但是必须在startTransition中使用，（startTransition类似于useTransition的数组中的第二个值）
   * isPending：就是可以理解为接口是否在请求中
   */
  const [state, formAction, isPending] = useActionState(fn, "init value");
  /**
   *  括号中：
   *  第一个参数 fn：就是一个函数（可以是异步函数），简而言之就是你要去操作数据库的函数，但是想要实现操作数据库不是直接调用fn，而是去调用：formAction
   *  第二个参数 init value：是state的初始值
   */

  // 这样操作就可以实现：在进入页面时调用接口函数
  useEffect(() => {
    startTransition(() => {
      formAction(new Date().toString());
    });
  }, [formAction]);

  return (
    <div>
      <div className={"mb-5"}>r19:useActionState</div>
      <div className={"flex gap-10 items-center"}>
        <input
          className={"border"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          disabled={isPending}
          onClick={() => {
            startTransition(() => {
              if (name.length <= 0) return;
              formAction(name);
            });
          }}
        >
          提交
        </button>
        {isPending ? "loading...useActionState" : state}
      </div>
    </div>
  );
};

export default MyUseActionState;

const updateName = (name: string) => {
  return axios({
    method: "post",
    url: "http://jsonplaceholder.typicode.com/posts",
    data: {
      title: name,
    },
  });
};

/**
 * 总结：
 * 使用useActionState的好处是：可以省略 定义接口返回值 和 接口调用中的pening状态 的useState；
 *
 * 不太方便的是：
 *
 * 1.点击按钮的触发的函数a，和 实际上去操作数据库的增删改查函数b，不是同一个。例如：上面的formAction是按钮点击触发的函数，和实际上操作数据库的函数 fn 不是同一个。
 * 可以这么理解：b函数是底层函数，但是我们要直接调用的是函数a，当我们执行a函数时，react会帮我们去执行b
 *
 * 2.记住函数a必须在startTransition中调用
 */
