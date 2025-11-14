"use client";

import { KpisTrend } from "@/services/dashboard.service";
import ChartComponent from "./Chart";

interface ChurnChartProps {
  kpisTrend: KpisTrend;
}

export default function ChurnChart({ kpisTrend }: ChurnChartProps) {
  const series = [
    {
      nome: kpisTrend.churnTrend.name,
      data: kpisTrend.churnTrend.data,
    },
  ];

  return (
    <ChartComponent
      series={series}
      categories={kpisTrend.labels}
      title="Churn"
      color="#43D2CB"
      yAxisFormat="percentage"
    />
  );
}
