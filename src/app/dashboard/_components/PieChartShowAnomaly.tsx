"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


export const description = "A donut chart with text"

// chartData will be dynamically generated from emailCounts

const chartConfig = {
  count: {
    label: "Count",
  },
  safe: {
    label: "Safe",
    color: "#4ade80", // green
  },
  malicious: {
    label: "Malicious",
    color: "#f87171", // red
  },
} satisfies ChartConfig

export function ChartPieDonutTextAnomaly({ data }: { data?: any }) {
  const [urlCounts, setUrlCounts] = React.useState({ safe: 0, malicious: 0 });

  React.useEffect(() => {
    if (data && Array.isArray(data)) {
      const counts = data.reduce(
        (acc, curr) => {
          if (curr.conc === "Safe") acc.safe += 1;
          if (curr.conc === "Malicious") acc.malicious += 1;
          return acc;
        },
        { safe: 0, malicious: 0 }
      );
      setUrlCounts(counts);
    }
  }, [data]);

  // Prepare chart data for pie chart
  const chartData = [
    { label: "Safe", key: "safe", count: urlCounts.safe, fill: "#4ade80" },
    { label: "Malicious", key: "malicious", count: urlCounts.malicious, fill: "#f87171" },
  ];

  const totalUrls = urlCounts.safe + urlCounts.malicious;

  return (
    <Card className="flex flex-col w-1/2">
      <CardHeader className="items-center pb-0">
        <CardTitle>URLs: Safe vs Malicious</CardTitle>
        <CardDescription>Prediction Results</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
              isAnimationActive={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalUrls.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          URLs
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {`Safe: ${urlCounts.safe} | Malicious: ${urlCounts.malicious}`}
        </div>
        <div className="text-muted-foreground leading-none">
          Showing prediction counts
        </div>
      </CardFooter>
    </Card>
  );
}

export default ChartPieDonutTextAnomaly;
