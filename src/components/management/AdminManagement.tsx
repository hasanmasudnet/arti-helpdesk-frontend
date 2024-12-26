import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Users, Shield, Database, Bell, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminCard = ({ title, description, icon: Icon, onClick }) => (
  <Card className="hover:shadow-md transition-all cursor-pointer">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center gap-2">
        <Icon className="w-5 h-5" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button variant="outline" className="w-full" onClick={onClick}>
        Manage
      </Button>
    </CardContent>
  </Card>
);

const AdminManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [apiConfig, setApiConfig] = useState({
    openaiKey: "",
    openaiModel: "gpt-4",
  });

  const [emailConfig, setEmailConfig] = useState({
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPass: "",
    senderEmail: "",
  });

  const handleSaveApiConfig = () => {
    console.log("Saving API config:", apiConfig);
  };

  const handleSaveEmailConfig = () => {
    console.log("Saving Email config:", emailConfig);
  };

  const sections = [
    {
      title: "System Settings",
      description:
        "Configure global system settings, preferences, and defaults",
      icon: Settings,
      onClick: () => console.log("System Settings clicked"),
    },
    {
      title: "User Management",
      description: "Manage user accounts, roles, and permissions",
      icon: Users,
      onClick: () => navigate("/admin/users"),
    },
    {
      title: "Security",
      description:
        "Configure security settings, authentication, and access control",
      icon: Shield,
      onClick: () => console.log("Security clicked"),
    },
    {
      title: "Data Management",
      description: "Manage data, backups, and system maintenance",
      icon: Database,
      onClick: () => console.log("Data Management clicked"),
    },
    {
      title: "Notifications",
      description: "Configure system notifications and alerts",
      icon: Bell,
      onClick: () => console.log("Notifications clicked"),
    },
    {
      title: "Integrations",
      description: "Manage third-party integrations and APIs",
      icon: Globe,
      onClick: () => console.log("Integrations clicked"),
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">
            Admin Dashboard
          </h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="general"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Integrations
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section) => (
                <AdminCard
                  key={section.title}
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  onClick={section.onClick}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">OpenAI API Key</label>
                  <Input
                    type="password"
                    placeholder="sk-..."
                    className="max-w-md"
                    value={apiConfig.openaiKey}
                    onChange={(e) =>
                      setApiConfig({ ...apiConfig, openaiKey: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">API Model</label>
                  <Input
                    type="text"
                    placeholder="gpt-4"
                    defaultValue="gpt-4"
                    className="max-w-md"
                    value={apiConfig.openaiModel}
                    onChange={(e) =>
                      setApiConfig({
                        ...apiConfig,
                        openaiModel: e.target.value,
                      })
                    }
                  />
                </div>
                <Button onClick={handleSaveApiConfig} className="mt-2">
                  Save API Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Email Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 max-w-md">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">SMTP Host</label>
                    <Input
                      type="text"
                      placeholder="smtp.example.com"
                      value={emailConfig.smtpHost}
                      onChange={(e) =>
                        setEmailConfig({
                          ...emailConfig,
                          smtpHost: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">SMTP Port</label>
                    <Input
                      type="number"
                      placeholder="587"
                      value={emailConfig.smtpPort}
                      onChange={(e) =>
                        setEmailConfig({
                          ...emailConfig,
                          smtpPort: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">SMTP Username</label>
                    <Input
                      type="text"
                      placeholder="username@example.com"
                      value={emailConfig.smtpUser}
                      onChange={(e) =>
                        setEmailConfig({
                          ...emailConfig,
                          smtpUser: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">SMTP Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={emailConfig.smtpPass}
                      onChange={(e) =>
                        setEmailConfig({
                          ...emailConfig,
                          smtpPass: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Sender Email</label>
                    <Input
                      type="email"
                      placeholder="noreply@example.com"
                      value={emailConfig.senderEmail}
                      onChange={(e) =>
                        setEmailConfig({
                          ...emailConfig,
                          senderEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button onClick={handleSaveEmailConfig} className="mt-2">
                    Save Email Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminManagement;