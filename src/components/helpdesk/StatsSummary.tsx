import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface StatCard {
  title: string;
  count: number;
  trend: number;
  color: string;
}

interface StatsSummaryProps {
  stats?: StatCard[];
}

const defaultStats: StatCard[] = [
  {
    title: "Open Tickets",
    count: 24,
    trend: 12,
    color: "text-blue-600",
  },
  {
    title: "Pending Tickets",
    count: 15,
    trend: -5,
    color: "text-yellow-600",
  },
  {
    title: "Resolved Tickets",
    count: 128,
    trend: 0,
    color: "text-green-600",
  },
];

const StatsSummary = ({ stats = defaultStats }: StatsSummaryProps) => {
  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    if (trend < 0) return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getTrendText = (trend: number) => {
    const absValue = Math.abs(trend);
    if (trend === 0) return "No change";
    return `${trend > 0 ? "+" : "-"}${absValue}% from last period`;
  };

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <h3 className={`text-2xl font-bold mt-2 ${stat.color}`}>
                    {stat.count}
                  </h3>
                </div>
                {getTrendIcon(stat.trend)}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {getTrendText(stat.trend)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsSummary;
