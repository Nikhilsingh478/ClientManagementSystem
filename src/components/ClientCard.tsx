import { motion } from "motion/react";
import { Copy, Check, Trash2, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner@2.0.3";

interface Client {
  id: string;
  businessName: string;
  contactDetails: string;
  problemDescription: string;
  addedAt: number;
}

interface ClientCardProps {
  client: Client;
  onDelete: () => void;
  onPromote?: () => void;
  showPromote?: boolean;
  searchQuery?: string;
  isSelected?: boolean;
  onToggleSelection?: () => void;
}

export function ClientCard({
  client,
  onDelete,
  onPromote,
  showPromote = false,
  searchQuery = "",
  isSelected = false,
  onToggleSelection,
}: ClientCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const formattedText = `Business Name: ${client.businessName}\nContact Details: ${client.contactDetails}\nProblem: ${client.problemDescription}`;
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    toast.success("Client details copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    onDelete();
    toast.success("Client removed successfully");
  };

  const handlePromote = () => {
    if (onPromote) {
      onPromote();
      toast.success("Client promoted to Active Clients!");
    }
  };

  // Highlight matching text
  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === searchQuery.toLowerCase()) {
        return (
          <mark key={index} className="bg-chart-3/30 text-chart-3 rounded px-0.5">
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className={`bg-card border rounded-lg p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 ${
        isSelected ? "border-chart-1 ring-2 ring-chart-1/20" : "border-border hover:border-accent"
      }`}
    >
      <div className="space-y-3">
        {/* Checkbox for bulk selection */}
        {onToggleSelection && (
          <div className="flex items-start gap-3">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onToggleSelection}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-foreground mb-1 break-words">{highlightText(client.businessName)}</h3>
              <p className="text-muted-foreground break-words">{highlightText(client.contactDetails)}</p>
            </div>
          </div>
        )}

        {!onToggleSelection && (
          <div>
            <h3 className="text-foreground mb-1 break-words">{highlightText(client.businessName)}</h3>
            <p className="text-muted-foreground break-words">{highlightText(client.contactDetails)}</p>
          </div>
        )}
        
        <div className="pt-2 border-t border-border">
          <p className="text-muted-foreground break-words">
            <span className="text-foreground">Problem: </span>
            {highlightText(client.problemDescription)}
          </p>
        </div>

        <div className="flex gap-2 pt-2 flex-wrap">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex-1 min-w-[100px] transition-all hover:bg-accent group"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-chart-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Copy
              </>
            )}
          </Button>

          {showPromote && (
            <Button
              onClick={handlePromote}
              variant="outline"
              size="sm"
              className="flex-1 min-w-[100px] transition-all hover:bg-accent hover:text-chart-2 group"
            >
              <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Promote
            </Button>
          )}

          <Button
            onClick={handleDelete}
            variant="outline"
            size="sm"
            className="transition-all hover:bg-destructive/10 hover:text-destructive hover:border-destructive group"
          >
            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
