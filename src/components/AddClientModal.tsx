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
      <DialogContent className="sm:max-w-lg bg-card border-border w-[calc(100%-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground text-sm sm:text-lg pr-4">
            Add Client to {folderName} - {sectionTitle}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 py-3 sm:py-4">
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-foreground text-sm sm:text-base">Business Name</Label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter business name..."
              className="bg-input-background border-border text-foreground h-11 sm:h-10 text-sm sm:text-base"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactDetails" className="text-foreground text-sm sm:text-base">Contact Details</Label>
            <Input
              id="contactDetails"
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
              placeholder="Email, phone, etc..."
              className="bg-input-background border-border text-foreground h-11 sm:h-10 text-sm sm:text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="problemDescription" className="text-foreground text-sm sm:text-base">Problem Description</Label>
            <Textarea
              id="problemDescription"
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Describe the client's problem..."
              className="bg-input-background border-border text-foreground min-h-[100px] resize-none text-sm sm:text-base"
            />
          </div>
          <DialogFooter className="gap-2 flex-col sm:flex-row pt-2">
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
