import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface StatisticsCardsProps {
  tickets?: number;
  rating?: string;
  timeToAssign?: string;
  timeToRespond?: string;
  timeToClose?: string;
}

const StatisticsCards = ({
  tickets = 1,
  rating = "0/5",
  timeToAssign = "0 hours",
  timeToRespond = "0 hours",
  timeToClose = "0 hours",
}: StatisticsCardsProps) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card className="bg-white hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Tickets</p>
            <h3 className="text-3xl font-bold text-gray-900">{tickets}</h3>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpIcon className="h-4 w-4 text-green-500" />
              <p className="text-sm font-medium text-green-600">
                +0% since last period
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Rating</p>
            <h3 className="text-3xl font-bold text-gray-900">{rating}</h3>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpIcon className="h-4 w-4 text-green-500" />
              <p className="text-sm font-medium text-gray-500">No change</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Time to Assign
            </p>
            <h3 className="text-3xl font-bold text-gray-900">{timeToAssign}</h3>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownIcon className="h-4 w-4 text-green-500" />
              <p className="text-sm font-medium text-gray-500">
                -0% from last period
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Time to Respond
            </p>
            <h3 className="text-3xl font-bold text-gray-900">
              {timeToRespond}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownIcon className="h-4 w-4 text-green-500" />
              <p className="text-sm font-medium text-gray-500">
                -0% from last period
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Time to Close
            </p>
            <h3 className="text-3xl font-bold text-gray-900">{timeToClose}</h3>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownIcon className="h-4 w-4 text-green-500" />
              <p className="text-sm font-medium text-gray-500">
                -0% from last period
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCards;
