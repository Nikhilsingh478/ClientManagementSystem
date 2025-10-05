import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (client: {
    businessName: string;
    contactDetails: string;
    problemDescription: string;
  }) => void;
  sectionTitle: string;
  folderName: string;
}

export function AddClientModal({ isOpen, onClose, onAddClient, sectionTitle, folderName }: AddClientModalProps) {
  const [businessName, setBusinessName] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessName.trim() && contactDetails.trim() && problemDescription.trim()) {
      onAddClient({
        businessName: businessName.trim(),
        contactDetails: contactDetails.trim(),
        problemDescription: problemDescription.trim(),
      });
      setBusinessName("");
      setContactDetails("");
      setProblemDescription("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Add Client to {folderName} - {sectionTitle}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-foreground">Business Name</Label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter business name..."
              className="bg-input-background border-border text-foreground"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactDetails" className="text-foreground">Contact Details</Label>
            <Input
              id="contactDetails"
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
              placeholder="Email, phone, etc..."
              className="bg-input-background border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="problemDescription" className="text-foreground">Problem Description</Label>
            <Textarea
              id="problemDescription"
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Describe the client's problem..."
              className="bg-input-background border-border text-foreground min-h-[100px] resize-none"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="transition-all hover:bg-accent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-foreground text-background hover:bg-foreground/90 transition-all"
              disabled={!businessName.trim() || !contactDetails.trim() || !problemDescription.trim()}
            >
              Add Client
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
