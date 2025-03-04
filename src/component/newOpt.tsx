import { useOptimistic, useState } from "react";

interface taskItem {
  message: string;
  isOpt?: boolean;
}

const NewOpt = () => {
  const [taskList, setTaskList] = useState<taskItem[]>([]);

  const [optList, setOptList] = useOptimistic(
    taskList,
    (prev, newTask: string) => {
      return [
        ...prev,
        {
          message: newTask,
          isOpt: true,
        },
      ];
    }
  );

  const addTask = async (data: FormData) => {
    const taskName = data.get("task") as string;
    setOptList(taskName);
    try {
      const res = await fakeApi(taskName);
      setTaskList((prev) => [...prev, { message: res }]);
    } catch (err) {
      const error = err as string;
      console.log(error, "error");
    }
  };

  return (
    <div className={"m-4 w-[400px]"}>
      <form className={"mb-2 flex gap-4 justify-center"} action={addTask}>
        <input name="task" className={"border"} />
        <button type="submit">提交</button>
      </form>
      <div
        className={"border rounded-2xl border-blue-400 radius  min-h-[200px]"}
      >
        {optList.map((item, index) => {
          return (
            <div key={index}>
              {item.message}
              {item.isOpt && `(loading...)`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewOpt;

const fakeApi = (taskName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(`任务${taskName}添加成功`);
      } else {
        reject(`任务${taskName}添加失败`);
      }
    }, 1000);
  });
};
