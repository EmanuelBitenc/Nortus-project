"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DonutChartProps {
  series: number[];
  labels: string[];
  colors: string[];
}

export default function DonutChart({
  series,
  labels,
  colors,
}: DonutChartProps) {
  const options: ApexOptions = {
    chart: {
      type: "donut",
      background: "transparent",
    },
    labels: labels,
    colors: colors,
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 600,
              color: "#fff",
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 700,
              color: "#fff",
              offsetY: 5,
              formatter: (val: string) => {
                return `${parseFloat(val).toFixed(0)}%`;
              },
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "14px",
              fontWeight: 600,
              color: "#94a3b8",
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce(
                  (a: number, b: number) => a + b,
                  0
                );
                return `${total.toFixed(0)}%`;
              },
            },
          },
        },
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#1e293b"],
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val: number) => `${val.toFixed(2)}%`,
      },
    },
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Chart options={options} series={series} type="donut" width="100%" />
    </div>
  );
}
