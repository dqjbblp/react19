import axios, { CancelToken } from "axios";
import { type CancelTokenSource } from "axios";
import { useActionState, useState, startTransition, useEffect, useRef } from "react";

const MyUseActionState = () => {
  const [name, setName] = useState("");
  // 创建 cancelToken 源的引用，用于取消请求
  const cancelTokenSourceRef = useRef<CancelTokenSource | null>(null);

  /*
   *  第一个参数是上次函数（接口）返回的结果
   *  第二个参数是这次调用要传递的参数
   *  必须要有返回值,返回值会自动更新到state中
   */
  const fn = async (prevValue: string, nowValue: string) => {
    console.log("上次返回的结果:", prevValue, "本次提交的是：", nowValue);

    // 如果有未完成的请求，先取消
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel("请求已被取消：新请求触发或组件卸载");
    }

    // 创建新的 cancelToken 源
    cancelTokenSourceRef.current = axios.CancelToken.source();

    try {
      const res = await updateName(nowValue, cancelTokenSourceRef.current.token);
      return res.data.title;
    } catch (err) {
      // 区分取消请求的错误和其他错误
      if (axios.isCancel(err)) {
        console.log("请求被取消:", err);
        return "请求已取消";
      }
      const error = err as Error;
      return error.message;
    }
  };

  const [state, formAction, isPending] = useActionState<string, string>(
    fn,
    "init value"
  );

  // 组件卸载时取消未完成的请求
  useEffect(() => {
    return () => {
      if (cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel("组件卸载，取消请求");
      }
    };
  }, []);

  // 页面初始化调用
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
          // disabled={isPending}
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

// 新增 cancelToken 参数，用于取消请求
const updateName = (name: string, cancelToken: CancelToken) => {
  return axios({
    method: "post",
    url: "http://jsonplaceholder.typicode.com/posts",
    data: {
      title: name,
    },
    // 添加 cancelToken 配置
    cancelToken: cancelToken,
  });
};