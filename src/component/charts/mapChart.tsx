/* eslint-disable @typescript-eslint/no-explicit-any */
import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import { geojson } from "../../assets/geojson";

const MapChart = () => {
  const chartRef = useRef(null);

  const [dataList, setDataList] = useState<{ name: string; value: number }[]>(
    []
  );

  useEffect(() => {
    (async () => {
      return new Promise(() => {
        setTimeout(() => {
          setDataList([
            {
              name: "广东省",
              value: 5000,
            },
            {
              name: "广西壮族自治区",
              value: 4390,
            },
            {
              name: "贵州省",
              value: 3680,
            },
            {
              name: "海南省",
              value: 2745,
            },
            {
              name: "湖南省",
              value: 3655,
            },
            {
              name: "江西省",
              value: 4372,
            },
            {
              name: "新疆维吾尔自治区",
              value: 1300,
            },
            {
              name: "西藏自治区",
              value: 965,
            },
            {
              name: "云南省",
              value: 1320,
            },
            {
              name: "湖北省",
              value: 560,
            },
            {
              name: "内蒙古自治区",
              value: 632,
            },
            {
              name: "北京市",
              value: 5000,
            },
            {
              name: "上海市",
              value: 5000,
            },
            {
              name: "黑龙江省",
              value: 3456,
            },
            {
              name: "辽宁省",
              value: 3027,
            },
            {
              name: "吉林省",
              value: 3156,
            },
            {
              name: "四川省",
              value: 4012,
            },
            {
              name: "陕西省",
              value: 2301,
            },
            {
              name: "福建省",
              value: 3956,
            },
            {
              name: "台湾省",
              value: 4568,
            },
          ]);
        }, 1000);
      });
    })();
  }, []);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    echarts.registerMap("china", geojson);

    if (dataList.length > 0) {
      myChart.hideLoading();
    } else {
      myChart.showLoading();
    }

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "item",
        formatter: (p: any) => {
          return `<div>${p.name} - ${p.data?.value || 0}</div>`;
        },
      },
      series: [
        {
          type: "map",
          map: "china",
          data: dataList,
          roam: true,
          label: {
            show: true,
          },
          scaleLimit: {
            min: 0.5,
            max: 3,
          },
        },
      ],
      visualMap: {
        left: "right",
        min: 0,
        max: 5000,
        inRange: {
          color: [
            "#313695",
            "#4575b4",
            "#74add1",
            "#abd9e9",
            "#e0f3f8",
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
            "#a50026",
          ],
        },
        text: ["High", "Low"],
        calculable: true,
      },
    };
    myChart.setOption(option);
    return () => {
      myChart.dispose();
    };
  }, [dataList]);

  return (
    <div>
      <div ref={chartRef} style={{ width: "100%", height: "600px" }} />
    </div>
  );
};

export default MapChart;
