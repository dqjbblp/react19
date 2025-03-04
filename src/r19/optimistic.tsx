import { startTransition, useOptimistic, useState } from "react";
import NewOpt from "../component/newOpt";

const Optimistic = () => {
  const [tasks, setTasks] = useState<string[]>(["1", "2"]);

  /**
   * 两个参数：
   * 参数1：原来的数据；可以理解为：之前返回的整个结果
   * 参数2：新的数据，意思是：你要去增加、删除的某一个数据
   * 必须要用返回值
   */
  const updateFn = (prevList: string[], newTask: string) => {
    return [...prevList, newTask];
  };

  /**
   * optTasks：是调接口成功之后，应该得到的数据（是虚拟数据），注意 ：这里不一定接口调用完，如果接口调用失败，会回滚到真实数据（tasks）
   * setOptTasks：是更新虚拟值的函数
   */
  const [optTasks, setOptTasks] = useOptimistic(tasks, updateFn);
  /**
   * tasks：是真实值，如果接口失败，会将虚拟值的渲染取消，转而使用该真实值
   * upDateFn：是底层修改虚拟值的函数，但是我们调用的是：setOptTasks
   */

  const addTask = (taskName: string) => {
    startTransition(async () => {
      setOptTasks(taskName);
      try {
        const res = await fakeApi(taskName);
        console.log("fake result:", res);
        setTasks((prev) => [...prev, taskName]); // 只有在接口成功之后，才去更新实际的值
      } catch (err) {
        const error = err as string;
        console.log(error);
      }
    });
  };

  return (
    <div>
      <h3 className={"text-red-600"}>Optimistic--帮助乐观的更新用户界面</h3>

      <ul>
        {optTasks.length > 0 ? (
          optTasks.map((item, index) => {
            return <li key={index}>{item}</li>;
          })
        ) : (
          <div>列表为空..</div>
        )}
      </ul>
      <button onClick={() => addTask(new Date().toString())}>添加任务</button>
      <hr />
      <NewOpt />
    </div>
  );
};

export default Optimistic;

const fakeApi = (task: string) => {
  return new Promise((res, rev) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        res(`任务${task}添加成功`);
      } else {
        rev(`任务${task}添加失败`);
      }
    }, 1000);
  });
};
