import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Activity,
  Shield,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomerDetailsProps {
  customerId?: string;
}

const CustomerDetails = ({ customerId = "1" }: CustomerDetailsProps) => {
  const navigate = useNavigate();

  const customerData = {
    id: customerId,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    status: "active",
    type: "enterprise",
    location: "New York, USA",
    website: "www.acmecorp.com",
    joinedDate: "2023-01-15",
    lastActive: "2024-01-20",
    subscription: "Enterprise",
    billingCycle: "Annual",
    totalSpent: "$25,000",
    activeTickets: 3,
    totalTickets: 15,
    successRate: 92,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${customerId}`,
    demographics: {
      industry: "Technology",
      size: "1000+ employees",
      market: "B2B",
      region: "North America",
    },
    security: {
      lastLogin: "2024-01-20 14:30",
      ipAddress: "192.168.1.1",
      location: "New York, USA",
      twoFactorEnabled: true,
      lastPasswordChange: "2023-12-01",
    },
    engagement: {
      nps: 9,
      lastSurvey: "2024-01-15",
      productUsage: "High",
      communicationPreference: "Email",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {customerData.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                Customer ID: {customerData.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`${customerData.status === "active" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}`}
            >
              {customerData.status}
            </Badge>
            <Badge variant="secondary">{customerData.type}</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={customerData.avatar}
                    alt={customerData.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h2 className="text-lg font-semibold">{customerData.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {customerData.company}
                  </p>
                  <div className="w-full space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      <span>{customerData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{customerData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{customerData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4" />
                      <span>{customerData.website}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Member Since</span>
                  <span>{customerData.joinedDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Active</span>
                  <span>{customerData.lastActive}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subscription</span>
                  <span>{customerData.subscription}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Billing Cycle</span>
                  <span>{customerData.billingCycle}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Activity className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <div className="text-2xl font-bold">
                          {customerData.activeTickets}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Active Tickets
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Shield className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <div className="text-2xl font-bold">
                          {customerData.successRate}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Success Rate
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Wallet className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                        <div className="text-2xl font-bold">
                          {customerData.totalSpent}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Total Spent
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="demographics" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Industry
                        </p>
                        <p className="font-medium">
                          {customerData.demographics.industry}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Company Size
                        </p>
                        <p className="font-medium">
                          {customerData.demographics.size}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Market</p>
                        <p className="font-medium">
                          {customerData.demographics.market}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Region</p>
                        <p className="font-medium">
                          {customerData.demographics.region}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Last Login
                        </span>
                        <span>{customerData.security.lastLogin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          IP Address
                        </span>
                        <span>{customerData.security.ipAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Location
                        </span>
                        <span>{customerData.security.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          2FA Status
                        </span>
                        <Badge
                          variant="outline"
                          className={
                            customerData.security.twoFactorEnabled
                              ? "border-green-500 text-green-500"
                              : "border-red-500 text-red-500"
                          }
                        >
                          {customerData.security.twoFactorEnabled
                            ? "Enabled"
                            : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Last Password Change
                        </span>
                        <span>{customerData.security.lastPasswordChange}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="engagement" className="space-y-4 mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          NPS Score
                        </span>
                        <Badge>{customerData.engagement.nps}/10</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Last Survey
                        </span>
                        <span>{customerData.engagement.lastSurvey}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Product Usage
                        </span>
                        <Badge
                          variant="outline"
                          className="border-blue-500 text-blue-500"
                        >
                          {customerData.engagement.productUsage}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Communication Preference
                        </span>
                        <span>
                          {customerData.engagement.communicationPreference}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
