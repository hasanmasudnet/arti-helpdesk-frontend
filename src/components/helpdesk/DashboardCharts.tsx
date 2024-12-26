import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DashboardChartsProps {
  ticketsByStage?: { stage: string; count: number }[];
  topTeams?: { team: string; tickets: number }[];
  topAssignees?: { agent: string; tickets: number }[];
}

const DashboardCharts = ({
  ticketsByStage = [{ stage: "Customer Care", count: 1 }],
  topTeams = [{ team: "Customer Care", tickets: 1 }],
  topAssignees = [{ agent: "sahadat Hossain", tickets: 1 }],
}: DashboardChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card hover:shadow-md transition-shadow">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-semibold text-foreground">
            Tickets by Stage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-end gap-4 pt-8">
            {ticketsByStage.map((item) => (
              <div
                key={item.stage}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full bg-blue-500/90 hover:bg-blue-600 transition-colors rounded-t"
                  style={{
                    height: `${(item.count / Math.max(...ticketsByStage.map((i) => i.count))) * 200}px`,
                  }}
                />
                <span className="text-sm text-muted-foreground font-medium">
                  {item.stage}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="bg-card hover:shadow-md transition-shadow">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-semibold text-foreground">
              Top Teams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-foreground">
                    Team
                  </TableHead>
                  <TableHead className="text-right font-semibold text-foreground">
                    Tickets
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topTeams.map((team) => (
                  <TableRow key={team.team}>
                    <TableCell className="font-medium text-foreground">
                      {team.team}
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {team.tickets}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-md transition-shadow">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-semibold text-foreground">
              Top Assignees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-foreground">
                    Agent
                  </TableHead>
                  <TableHead className="text-right font-semibold text-foreground">
                    Tickets
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topAssignees.map((agent) => (
                  <TableRow key={agent.agent}>
                    <TableCell className="font-medium text-foreground">
                      {agent.agent}
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {agent.tickets}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCharts;
