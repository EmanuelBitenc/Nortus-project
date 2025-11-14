"use client";

import { KpisTrend } from "@/services/dashboard.service";
import ChartComponent from "./Chart";

interface RetentionChartProps {
  kpisTrend: KpisTrend;
}

export default function RetentionChart({ kpisTrend }: RetentionChartProps) {
  const series = [
    {
      name: kpisTrend.retentionTrend.name,
      data: kpisTrend.retentionTrend.data,
    },
  ];

  return (
    <ChartComponent
      series={series}
      categories={kpisTrend.labels}
      title="Retenção"
      color="#43D2CB"
      yAxisFormat="percentage"
    />
  );
}
