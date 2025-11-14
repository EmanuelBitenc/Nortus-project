"use client";

import { KpisTrend } from "@/services/dashboard.service";
import ChartComponent from "./Chart";

interface ConversionChartProps {
  kpisTrend: KpisTrend;
}

export default function ConversionChart({ kpisTrend }: ConversionChartProps) {
  const series = [
    {
      name: kpisTrend.conversionTrend.name,
      data: kpisTrend.conversionTrend.data,
    },
  ];

  return (
    <ChartComponent
      series={series}
      categories={kpisTrend.labels}
      title="Conversão"
      color="#43D2CB"
      yAxisFormat="percentage"
    />
  );
}
