"use client";

import { KpisTrend } from "@/services/dashboard.service";
import ChartComponent from "./Chart";

interface ArpuChartProps {
  kpisTrend: KpisTrend;
}

export default function ArpuChart({ kpisTrend }: ArpuChartProps) {
  const series = [
    {
      name: kpisTrend.arpuTrend.name,
      data: kpisTrend.arpuTrend.data,
    },
  ];

  return (
    <ChartComponent
      series={series}
      categories={kpisTrend.labels}
      title="ARPU"
      color="#43D2CB"
      yAxisFormat="currency"
    />
  );
}
