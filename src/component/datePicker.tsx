import { useMemo, useState } from "react";

const DatePicker = () => {
  const [today, setToday] = useState(new Date());

  const getDayByMonth = (date: Date) => {
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    let list = [];
    if (month !== 2) {
      if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        list = Array.from({ length: 31 }, (_, index) => (index + 1).toString());
      } else {
        list = Array.from({ length: 30 }, (_, index) => (index + 1).toString());
      }
    } else {
      if (year % 4 === 0) {
        list = Array.from({ length: 29 }, (_, index) => (index + 1).toString());
      } else {
        list = Array.from({ length: 28 }, (_, index) => (index + 1).toString());
      }
    }
    return list;
  };

  const totalDays = useMemo(() => {
    const month = new Date(today).getMonth() + 1;
    const year = new Date(today).getFullYear();
    return Array.from(
      { length: new Date(`${year}-${month}-01`).getDay() },
      () => ""
    ).concat(getDayByMonth(today));
  }, [today]);

  const changeDate = (type: "prev" | "next") => {
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    let newDate;

    if (type === "prev") {
      if (month > 1) {
        newDate = `${year}-${month - 1}`;
      } else {
        newDate = `${year - 1}-${12}`;
      }
    } else {
      if (month < 12) {
        newDate = `${year}-${month + 1}`;
      } else {
        newDate = `${year + 1}`;
      }
    }

    setToday(new Date(newDate));
  };

  return (
    <div className={"flex flex-col justify-center items-center select-none"}>
      <div
        className={
          "w-120 h-100 border border-pink-400 rounded-3xl p-4 border-dashed flex flex-col gap-4"
        }
      >
        <div className={"flex justify-between"}>
          <div
            onClick={() => changeDate("prev")}
            className={"text-blue-400 hover:text-red-600 cursor-pointer"}
          >
            上个月
          </div>
          {today.toDateString()}
          <div
            onClick={() => changeDate("next")}
            className={"text-blue-400 hover:text-red-600 cursor-pointer"}
          >
            下个月
          </div>
        </div>

        <div className={"flex"}>
          {["日", "一", "二", "三", "四", "五", "六"].map((item) => {
            return (
              <div
                className={"flex items-center justify-center w-[63px]"}
                key={item}
              >
                {item}
              </div>
            );
          })}
        </div>

        <div className={"flex-1 flex flex-wrap"}>
          {totalDays.map((item, index) => {
            return (
              <div
                className={"flex items-center justify-center"}
                style={{
                  width: "63px",
                  color:
                    Number(item) < today.getDate()
                      ? "#cccccc"
                      : Number(item) > today.getDate()
                      ? "#000"
                      : "#ef0707",
                }}
                key={index}
              >
                {item}
              </div>
            );
          })}
        </div>

        <div
          onClick={() => setToday(new Date())}
          className={"text-center hover:text-red-600 cursor-pointer"}
        >
          回到今天
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
