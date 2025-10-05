import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FolderPlus } from "lucide-react";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { FolderCard } from "./components/FolderCard";
import { CreateFolderModal } from "./components/CreateFolderModal";
import { AddClientModal } from "./components/AddClientModal";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { BulkActionBar } from "./components/BulkActionBar";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

interface Client {
  id: string;
  businessName: string;
  contactDetails: string;
  problemDescription: string;
  addedAt: number;
}

interface Folder {
  id: string;
  name: string;
  activeClients: Client[];
  potentialClients: Client[];
  createdAt: number;
}

type ClientType = "active" | "potential";

export default function App() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedClientType, setSelectedClientType] = useState<ClientType | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    const storedFolders = localStorage.getItem("cms-folders");
    if (storedFolders) {
      try {
        setFolders(JSON.parse(storedFolders));
      } catch (error) {
        console.error("Failed to parse folders:", error);
      }
    }
    // Start with empty system - no sample data
  }, []);

  // Save to localStorage whenever folders change
  useEffect(() => {
    localStorage.setItem("cms-folders", JSON.stringify(folders));
  }, [folders]);

  const handleCreateFolder = (folderName: string) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name: folderName,
      activeClients: [],
      potentialClients: [],
      createdAt: Date.now(),
    };
    setFolders([...folders, newFolder]);
    toast.success(`Folder "${folderName}" created successfully!`);
  };

  const handleDeleteFolder = (folderId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    if (folder) {
      const totalClients = folder.activeClients.length + folder.potentialClients.length;
      if (totalClients > 0) {
        if (
          !window.confirm(
            `This folder contains ${totalClients} client(s). Are you sure you want to delete it?`
          )
        ) {
          return;
        }
      }
      setFolders(folders.filter((f) => f.id !== folderId));
      toast.success(`Folder "${folder.name}" deleted`);
    }
  };

  const handleAddClient = (folderId: string, type: ClientType) => {
    setSelectedFolder(folderId);
    setSelectedClientType(type);
    setIsAddClientOpen(true);
  };

  const handleSubmitClient = (clientData: {
    businessName: string;
    contactDetails: string;
    problemDescription: string;
  }) => {
    if (!selectedFolder || !selectedClientType) return;

    const newClient: Client = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      addedAt: Date.now(),
      ...clientData,
    };

    setFolders(
      folders.map((folder) => {
        if (folder.id === selectedFolder) {
          if (selectedClientType === "active") {
            return { ...folder, activeClients: [...folder.activeClients, newClient] };
          } else {
            return { ...folder, potentialClients: [...folder.potentialClients, newClient] };
          }
        }
        return folder;
      })
    );

    toast.success("Client added successfully!");
  };

  const handleDeleteClient = (folderId: string, clientId: string, type: ClientType) => {
    setFolders(
      folders.map((folder) => {
        if (folder.id === folderId) {
          if (type === "active") {
            return {
              ...folder,
              activeClients: folder.activeClients.filter((c) => c.id !== clientId),
            };
          } else {
            return {
              ...folder,
              potentialClients: folder.potentialClients.filter((c) => c.id !== clientId),
            };
          }
        }
        return folder;
      })
    );

    // Remove from selection if selected
    const newSelection = new Set(selectedClients);
    newSelection.delete(clientId);
    setSelectedClients(newSelection);
  };

  const handlePromoteClient = (folderId: string, clientId: string) => {
    setFolders(
      folders.map((folder) => {
        if (folder.id === folderId) {
          const client = folder.potentialClients.find((c) => c.id === clientId);
          if (client) {
            return {
              ...folder,
              potentialClients: folder.potentialClients.filter((c) => c.id !== clientId),
              activeClients: [...folder.activeClients, client],
            };
          }
        }
        return folder;
      })
    );
  };

  const handleToggleClientSelection = (clientId: string) => {
    const newSelection = new Set(selectedClients);
    if (newSelection.has(clientId)) {
      newSelection.delete(clientId);
    } else {
      newSelection.add(clientId);
    }
    setSelectedClients(newSelection);
  };

  const handleDeleteSelected = () => {
    if (selectedClients.size === 0) return;

    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedClients.size} selected client(s)?`
      )
    ) {
      return;
    }

    setFolders(
      folders.map((folder) => ({
        ...folder,
        activeClients: folder.activeClients.filter((c) => !selectedClients.has(c.id)),
        potentialClients: folder.potentialClients.filter((c) => !selectedClients.has(c.id)),
      }))
    );

    toast.success(`${selectedClients.size} client(s) deleted`);
    setSelectedClients(new Set());
  };

  const handleClearSelection = () => {
    setSelectedClients(new Set());
  };

  if (showAnalytics) {
    return <AnalyticsDashboard folders={folders} onBack={() => setShowAnalytics(false)} />;
  }

  const currentFolder = folders.find((f) => f.id === selectedFolder);

  return (
    <div className="min-h-screen bg-background">
      <Header onAdminClick={() => setShowAnalytics(true)} />

      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-6 pb-12">
        {/* Create Folder Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            onClick={() => setIsCreateFolderOpen(true)}
            className="bg-gradient-to-r from-chart-1 to-chart-4 text-white hover:opacity-90 transition-all group shadow-lg shadow-chart-1/20"
          >
            <FolderPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Create Folder
          </Button>
        </motion.div>

        {/* Empty State */}
        {folders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
                <FolderPlus className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-foreground">No Folders Yet</h2>
              <p className="text-muted-foreground">
                Create your first folder to organize your clients by region, category, or any way
                you prefer.
              </p>
              <Button
                onClick={() => setIsCreateFolderOpen(true)}
                className="bg-foreground text-background hover:bg-foreground/90 transition-all mt-4"
              >
                <FolderPlus className="w-5 h-5 mr-2" />
                Create Your First Folder
              </Button>
            </div>
          </motion.div>
        )}

        {/* Search Results Info */}
        {searchQuery && folders.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 px-4 py-3 bg-chart-1/10 border border-chart-1/30 rounded-lg"
          >
            <p className="text-chart-1">
              Searching for: <span className="font-medium">"{searchQuery}"</span>
            </p>
          </motion.div>
        )}

        {/* Folders List */}
        {folders.length > 0 && (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {folders.map((folder, index) => (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <FolderCard
                    folder={folder}
                    onAddClient={handleAddClient}
                    onDeleteClient={handleDeleteClient}
                    onPromoteClient={handlePromoteClient}
                    onDeleteFolder={handleDeleteFolder}
                    searchQuery={searchQuery}
                    selectedClients={selectedClients}
                    onToggleClientSelection={handleToggleClientSelection}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Modals */}
      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        onCreateFolder={handleCreateFolder}
      />

      <AddClientModal
        isOpen={isAddClientOpen}
        onClose={() => {
          setIsAddClientOpen(false);
          setSelectedFolder(null);
          setSelectedClientType(null);
        }}
        onAddClient={handleSubmitClient}
        sectionTitle={selectedClientType === "active" ? "Active Clients" : "Potential Clients"}
        folderName={currentFolder?.name || ""}
      />

      {/* Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedClients.size}
        onDeleteSelected={handleDeleteSelected}
        onClearSelection={handleClearSelection}
      />

      <Toaster position="bottom-right" />
    </div>
  );
}
