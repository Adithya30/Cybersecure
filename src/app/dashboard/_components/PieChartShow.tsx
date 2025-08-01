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
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "@/lib/backend"
import { getDatabase } from "firebase/database"

export const description = "A donut chart with text"

// chartData will be dynamically generated from emailCounts

const chartConfig = {
  count: {
    label: "Count",
  },
  legitimate_email: {
    label: "Legitimate Email",
    color: "#4ade80", // green
  },
  phishing_url: {
    label: "Phishing URL",
    color: "#f87171", // red
  },
} satisfies ChartConfig

export function ChartPieDonutText({ data }: { data?: any }) {
  const [emailCounts, setEmailCounts] = React.useState({ legitimate_email: 0, phishing_url: 0 });

  React.useEffect(() => {
    if (data && Array.isArray(data)) {
      const counts = data.reduce(
        (acc, curr) => {
          if (curr.prediction === "legitimate_email") acc.legitimate_email += 1;
          if (curr.prediction === "phishing_url") acc.phishing_url += 1;
          return acc;
        },
        { legitimate_email: 0, phishing_url: 0 }
      );
      setEmailCounts(counts);
    }
  }, [data]);

  // Prepare chart data for pie chart
  const chartData = [
    { label: "Legitimate Email", key: "legitimate_email", count: emailCounts.legitimate_email, fill: "#4ade80" },
    { label: "Phishing URL", key: "phishing_url", count: emailCounts.phishing_url, fill: "#f87171" },
  ];

  const totalEmails = emailCounts.legitimate_email + emailCounts.phishing_url;

  return (
    <Card className="flex flex-col w-1/2" >
      <CardHeader className="items-center pb-0">
        <CardTitle>Emails: Legitimate vs Phishing</CardTitle>
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
                          {totalEmails.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Emails
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
          {`Legitimate: ${emailCounts.legitimate_email} | Phishing: ${emailCounts.phishing_url}`}
        </div>
        <div className="text-muted-foreground leading-none">
          Showing prediction counts
        </div>
      </CardFooter>
    </Card>
  );
}
