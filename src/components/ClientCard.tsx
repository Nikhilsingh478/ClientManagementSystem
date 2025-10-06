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
      className={`bg-card border rounded-lg p-3 sm:p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 ${
        isSelected ? "border-chart-1 ring-2 ring-chart-1/20" : "border-border hover:border-accent"
      }`}
    >
      <div className="space-y-2.5 sm:space-y-3">
        {/* Checkbox for bulk selection */}
        {onToggleSelection && (
          <div className="flex items-start gap-2.5 sm:gap-3">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onToggleSelection}
              className="mt-1 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-foreground mb-1 break-words text-sm sm:text-base">{highlightText(client.businessName)}</h3>
              <p className="text-muted-foreground break-words text-xs sm:text-sm">{highlightText(client.contactDetails)}</p>
            </div>
          </div>
        )}

        {!onToggleSelection && (
          <div>
            <h3 className="text-foreground mb-1 break-words text-sm sm:text-base">{highlightText(client.businessName)}</h3>
            <p className="text-muted-foreground break-words text-xs sm:text-sm">{highlightText(client.contactDetails)}</p>
          </div>
        )}
        
        <div className="pt-2 border-t border-border">
          <p className="text-muted-foreground break-words text-xs sm:text-sm">
            <span className="text-foreground">Problem: </span>
            {highlightText(client.problemDescription)}
          </p>
        </div>

        <div className="flex gap-1.5 sm:gap-2 pt-2 flex-wrap">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex-1 min-w-[80px] sm:min-w-[100px] transition-all hover:bg-accent active:bg-accent/60 group h-8 sm:h-9 text-xs sm:text-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-chart-2" />
                <span className="hidden xs:inline">Copied!</span>
                <span className="xs:hidden">✓</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover:scale-110 transition-transform" />
                <span className="hidden xs:inline">Copy</span>
              </>
            )}
          </Button>

          {showPromote && (
            <Button
              onClick={handlePromote}
              variant="outline"
              size="sm"
              className="flex-1 min-w-[80px] sm:min-w-[100px] transition-all hover:bg-accent hover:text-chart-2 active:bg-accent/60 group h-8 sm:h-9 text-xs sm:text-sm"
            >
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover:scale-110 transition-transform" />
              <span className="hidden xs:inline">Promote</span>
            </Button>
          )}

          <Button
            onClick={handleDelete}
            variant="outline"
            size="sm"
            className="transition-all hover:bg-destructive/10 hover:text-destructive hover:border-destructive active:bg-destructive/20 group h-8 sm:h-9 w-8 sm:w-9 p-0"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
