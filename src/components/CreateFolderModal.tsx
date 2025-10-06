import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { FolderPlus } from "lucide-react";

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFolder: (folderName: string) => void;
}

export function CreateFolderModal({ isOpen, onClose, onCreateFolder }: CreateFolderModalProps) {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      onCreateFolder(folderName.trim());
      setFolderName("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border w-[calc(100%-2rem)] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2 text-base sm:text-lg">
            <FolderPlus className="w-4 h-4 sm:w-5 sm:h-5 text-chart-1" />
            Create New Folder
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-3 sm:py-4">
          <div className="space-y-2">
            <Label htmlFor="folderName" className="text-foreground text-sm sm:text-base">
              Folder Name
            </Label>
            <Input
              id="folderName"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="e.g., New York Clients, Tech Startups..."
              className="bg-input-background border-border text-foreground h-11 sm:h-10 text-sm sm:text-base"
              autoFocus
            />
          </div>
          <DialogFooter className="gap-2 flex-col sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto transition-all hover:bg-accent h-10 sm:h-9 text-sm sm:text-base order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 transition-all h-10 sm:h-9 text-sm sm:text-base order-1 sm:order-2"
              disabled={!folderName.trim()}
            >
              Create Folder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
