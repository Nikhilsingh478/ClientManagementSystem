import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Plus, Trash2, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";
import { ClientCard } from "./ClientCard";
import { Badge } from "./ui/badge";

interface Client {
  id: string;
  businessName: string;
  contactDetails: string;
  problemDescription: string;
  addedAt: number;
}

interface FolderCardProps {
  folder: {
    id: string;
    name: string;
    activeClients: Client[];
    potentialClients: Client[];
    createdAt: number;
  };
  onAddClient: (folderId: string, type: "active" | "potential") => void;
  onDeleteClient: (folderId: string, clientId: string, type: "active" | "potential") => void;
  onPromoteClient: (folderId: string, clientId: string) => void;
  onDeleteFolder: (folderId: string) => void;
  searchQuery: string;
  selectedClients: Set<string>;
  onToggleClientSelection: (clientId: string) => void;
}

export function FolderCard({
  folder,
  onAddClient,
  onDeleteClient,
  onPromoteClient,
  onDeleteFolder,
  searchQuery,
  selectedClients,
  onToggleClientSelection,
}: FolderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeExpanded, setActiveExpanded] = useState(false);
  const [potentialExpanded, setPotentialExpanded] = useState(false);

  const totalClients = folder.activeClients.length + folder.potentialClients.length;

  const filterClients = (clients: Client[]) => {
    if (!searchQuery) return clients;
    const query = searchQuery.toLowerCase();
    return clients.filter(
      (client) =>
        client.businessName.toLowerCase().includes(query) ||
        client.contactDetails.toLowerCase().includes(query) ||
        client.problemDescription.toLowerCase().includes(query)
    );
  };

  const filteredActiveClients = filterClients(folder.activeClients);
  const filteredPotentialClients = filterClients(folder.potentialClients);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition-all"
    >
      {/* Folder Header */}
      <div className="border-b border-border bg-muted/20 p-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-3 hover:text-foreground transition-colors group flex-1 text-left"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </motion.div>
            <h2 className="text-foreground">{folder.name}</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/30">
                {folder.activeClients.length} Active
              </Badge>
              <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/30">
                {folder.potentialClients.length} Potential
              </Badge>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <div className="text-muted-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>{totalClients} total</span>
            </div>
            <Button
              onClick={() => onDeleteFolder(folder.id)}
              variant="outline"
              size="sm"
              className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Folder Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 space-y-4">
              {/* Active Clients Section */}
              <div className="bg-muted/20 border border-border rounded-lg overflow-hidden">
                <div className="border-b border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveExpanded(!activeExpanded)}
                      className="flex items-center gap-2 hover:text-foreground transition-colors group flex-1 text-left"
                    >
                      <motion.div
                        animate={{ rotate: activeExpanded ? 0 : -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                      </motion.div>
                      <h3 className="text-foreground">Active Clients</h3>
                      <span className="text-muted-foreground">({filteredActiveClients.length})</span>
                    </button>
                    <Button
                      onClick={() => onAddClient(folder.id, "active")}
                      size="sm"
                      className="bg-foreground text-background hover:bg-foreground/90 transition-all group"
                    >
                      <Plus className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
                      Add
                    </Button>
                  </div>
                </div>

                <AnimatePresence>
                  {activeExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4">
                        {filteredActiveClients.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            {searchQuery ? "No matching clients found" : "No active clients yet"}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                            {filteredActiveClients.map((client) => (
                              <ClientCard
                                key={client.id}
                                client={client}
                                onDelete={() => onDeleteClient(folder.id, client.id, "active")}
                                searchQuery={searchQuery}
                                isSelected={selectedClients.has(client.id)}
                                onToggleSelection={() => onToggleClientSelection(client.id)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Potential Clients Section */}
              <div className="bg-muted/20 border border-border rounded-lg overflow-hidden">
                <div className="border-b border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setPotentialExpanded(!potentialExpanded)}
                      className="flex items-center gap-2 hover:text-foreground transition-colors group flex-1 text-left"
                    >
                      <motion.div
                        animate={{ rotate: potentialExpanded ? 0 : -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                      </motion.div>
                      <h3 className="text-foreground">Potential Clients</h3>
                      <span className="text-muted-foreground">({filteredPotentialClients.length})</span>
                    </button>
                    <Button
                      onClick={() => onAddClient(folder.id, "potential")}
                      size="sm"
                      className="bg-foreground text-background hover:bg-foreground/90 transition-all group"
                    >
                      <Plus className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
                      Add
                    </Button>
                  </div>
                </div>

                <AnimatePresence>
                  {potentialExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4">
                        {filteredPotentialClients.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            {searchQuery ? "No matching clients found" : "No potential clients yet"}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                            {filteredPotentialClients.map((client) => (
                              <ClientCard
                                key={client.id}
                                client={client}
                                onDelete={() => onDeleteClient(folder.id, client.id, "potential")}
                                onPromote={() => onPromoteClient(folder.id, client.id)}
                                showPromote
                                searchQuery={searchQuery}
                                isSelected={selectedClients.has(client.id)}
                                onToggleSelection={() => onToggleClientSelection(client.id)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
