import React from "react";
import StatisticsCards from "./helpdesk/StatisticsCards";
import DashboardCharts from "./helpdesk/DashboardCharts";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8 space-y-8">
        <StatisticsCards
          tickets={156}
          rating="4.5/5"
          timeToAssign="2.4 hours"
          timeToRespond="1.8 hours"
          timeToClose="24 hours"
        />

        <DashboardCharts
          ticketsByStage={[
            { stage: "New", count: 45 },
            { stage: "In Progress", count: 32 },
            { stage: "Pending", count: 18 },
            { stage: "Resolved", count: 61 },
          ]}
          topTeams={[
            { team: "Customer Support", tickets: 78 },
            { team: "Technical Support", tickets: 45 },
            { team: "Billing Support", tickets: 33 },
          ]}
          topAssignees={[
            { agent: "John Smith", tickets: 42 },
            { agent: "Sarah Johnson", tickets: 38 },
            { agent: "Mike Wilson", tickets: 31 },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
