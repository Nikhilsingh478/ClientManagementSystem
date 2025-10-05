import { motion } from "motion/react";
import { ArrowLeft, Users, UserPlus, TrendingUp, Activity, Folder } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Client {
  id: string;
  businessName: string;
  contactDetails: string;
  problemDescription: string;
  addedAt: number;
}

interface FolderType {
  id: string;
  name: string;
  activeClients: Client[];
  potentialClients: Client[];
  createdAt: number;
}

interface AnalyticsDashboardProps {
  folders: FolderType[];
  onBack: () => void;
}

export function AnalyticsDashboard({ folders, onBack }: AnalyticsDashboardProps) {
  // Aggregate all clients from all folders
  const allActiveClients = folders.flatMap((folder) => folder.activeClients);
  const allPotentialClients = folders.flatMap((folder) => folder.potentialClients);
  const totalClients = allActiveClients.length + allPotentialClients.length;

  // Get recent clients (last 5)
  const allClients = [...allActiveClients, ...allPotentialClients]
    .sort((a, b) => b.addedAt - a.addedAt)
    .slice(0, 5);

  // Chart data for client distribution
  const distributionData = [
    { name: "Active", clients: allActiveClients.length },
    { name: "Potential", clients: allPotentialClients.length },
  ];

  // Folder breakdown data
  const folderData = folders.map((folder) => ({
    name: folder.name.length > 15 ? folder.name.substring(0, 15) + "..." : folder.name,
    active: folder.activeClients.length,
    potential: folder.potentialClients.length,
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-6 hover:bg-accent transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to CMS
          </Button>

          <h1 className="text-foreground mb-8">Analytics Dashboard</h1>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-card border-border hover:border-accent transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-muted-foreground">Total Folders</CardTitle>
                  <Folder className="w-5 h-5 text-chart-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-foreground">{folders.length}</div>
                  <p className="text-muted-foreground mt-1">Active folders</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-card border-border hover:border-accent transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-muted-foreground">Total Clients</CardTitle>
                  <Users className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-foreground">{totalClients}</div>
                  <p className="text-muted-foreground mt-1">All clients combined</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-card border-border hover:border-accent transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-muted-foreground">Active Clients</CardTitle>
                  <Activity className="w-5 h-5 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-foreground">{allActiveClients.length}</div>
                  <p className="text-muted-foreground mt-1">Currently active</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-card border-border hover:border-accent transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-muted-foreground">Potential Clients</CardTitle>
                  <UserPlus className="w-5 h-5 text-chart-3" />
                </CardHeader>
                <CardContent>
                  <div className="text-foreground">{allPotentialClients.length}</div>
                  <p className="text-muted-foreground mt-1">Prospects in pipeline</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Client Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={distributionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                      <XAxis dataKey="name" stroke="#a1a1a1" />
                      <YAxis stroke="#a1a1a1" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#141414",
                          border: "1px solid #262626",
                          borderRadius: "8px",
                          color: "#fafafa",
                        }}
                      />
                      <Bar dataKey="clients" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Folder Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  {folderData.length === 0 ? (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      No folders created yet
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={folderData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                        <XAxis dataKey="name" stroke="#a1a1a1" />
                        <YAxis stroke="#a1a1a1" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#141414",
                            border: "1px solid #262626",
                            borderRadius: "8px",
                            color: "#fafafa",
                          }}
                        />
                        <Bar dataKey="active" fill="#10b981" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="potential" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity and Conversion Rate */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allClients.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No recent activity</p>
                    ) : (
                      allClients.map((client) => (
                        <div
                          key={client.id}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-chart-1 mt-2 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-foreground truncate">{client.businessName}</p>
                            <p className="text-muted-foreground truncate">{client.contactDetails}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Conversion Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8 text-chart-2" />
                      <div>
                        <p className="text-muted-foreground">Conversion Rate</p>
                        <p className="text-foreground">
                          {totalClients > 0 ? Math.round((allActiveClients.length / totalClients) * 100) : 0}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Folder className="w-8 h-8 text-chart-4" />
                      <div>
                        <p className="text-muted-foreground">Avg Clients per Folder</p>
                        <p className="text-foreground">
                          {folders.length > 0 ? Math.round(totalClients / folders.length) : 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-chart-1" />
                      <div>
                        <p className="text-muted-foreground">Most Populated Folder</p>
                        <p className="text-foreground truncate">
                          {folders.length > 0
                            ? folders.reduce((max, folder) => 
                                (folder.activeClients.length + folder.potentialClients.length) > 
                                (max.activeClients.length + max.potentialClients.length) ? folder : max
                              ).name
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
