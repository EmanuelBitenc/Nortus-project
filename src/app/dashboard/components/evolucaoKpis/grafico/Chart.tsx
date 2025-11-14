"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartComponentProps {
  series: ApexAxisChartSeries;
  categories: string[];
  title: string;
  color: string;
  yAxisFormat?: "currency" | "percentage" | "number";
}

export default function ChartComponent({
  series,
  categories,
  title,
  color,
  yAxisFormat = "number",
}: ChartComponentProps) {
  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: true,
      },
      background: "transparent",
      fontFamily: "inherit",
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: [color],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 1,
        gradientToColors: [color],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#94a3b8",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94a3b8",
          fontSize: "12px",
        },
        formatter: (value: number) => {
          if (yAxisFormat === "currency") {
            return `R$ ${(value / 1000).toFixed(0)}k`;
          } else if (yAxisFormat === "percentage") {
            return `${value.toFixed(1)}%`;
          }
          return value.toFixed(0);
        },
      },
    },
    grid: {
      borderColor: "#334155",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 10,
        bottom: 0,
        left: 10,
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value: number) => {
          if (yAxisFormat === "currency") {
            return `R$ ${value.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          } else if (yAxisFormat === "percentage") {
            return `${value.toFixed(2)}%`;
          }
          return value.toFixed(2);
        },
      },
    },
    markers: {
      size: 0,
      hover: {
        size: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="w-full h-full">
      <Chart options={options} series={series} type="area" height="100%" />
    </div>
  );
}
