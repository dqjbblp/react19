import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { EChartsOption } from "echarts";

const PieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option: EChartsOption = {
      title: {
        text: "示例图表",
        link: "https://baidu.com",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: ["苹果", "香蕉", "橙子", "葡萄", "西瓜"],
      },
      yAxis: {
        type: "value",
        max: 250,
      },
      series: [
        {
          name: "销量",
          type: "bar",
          data: [100, 200, 150, 80, 90],
        },
      ],
      visualMap: {
        show: false,
        pieces: [
          {
            gt: 0,
            lte: 50,
            color: "#93CE07",
          },
          {
            gt: 50,
            lte: 100,
            color: "#FBDB0F",
          },
          {
            gt: 100,
            lte: 150,
            color: "#FC7D02",
          },
          {
            gt: 150,
            lte: 200,
            color: "#FD0100",
          },
          {
            gt: 200,
            lte: 300,
            color: "#AA069F",
          },
          {
            gt: 300,
            color: "#AC3B2A",
          },
        ],
      },
    };
    myChart.setOption(option);
    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div>
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default PieChart;
