import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { ClientCard } from "./ClientCard";

interface Client {
  id: string;
  businessName: string;
  contactDetails: string;
  problemDescription: string;
}

interface FolderProps {
  folder: {
    id: string;
    name: string;
    clients: Client[];
  };
  onAddClient: () => void;
  filteredClients: Client[];
}

export function Folder({ folder, onAddClient, filteredClients }: FolderProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <div className="border-b border-border bg-muted/30">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 hover:text-foreground transition-colors group flex-1 text-left"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </motion.div>
            <h2 className="text-foreground">{folder.name}</h2>
            <span className="text-muted-foreground ml-2">
              ({filteredClients.length})
            </span>
          </button>
          
          <Button
            onClick={onAddClient}
            size="sm"
            className="bg-foreground text-background hover:bg-foreground/90 transition-all group"
          >
            <Plus className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
            Add Client
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4">
              {filteredClients.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No clients found. Click "Add Client" to get started.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredClients.map((client) => (
                    <ClientCard key={client.id} client={client} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
