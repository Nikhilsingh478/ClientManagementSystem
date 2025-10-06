import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { motion } from "motion/react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-6"
    >
      <div className="relative group">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none group-focus-within:text-chart-1 transition-colors" />
        <Input
          type="text"
          placeholder="Search all folders..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 sm:pl-12 pr-10 h-12 sm:h-14 bg-card border-border focus:ring-2 focus:ring-chart-1/20 focus:border-chart-1 transition-all shadow-sm text-sm sm:text-base"
        />
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onSearchChange("")}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted hover:bg-accent active:bg-accent/60 flex items-center justify-center transition-colors"
          >
            <span className="text-muted-foreground text-xl sm:text-2xl">×</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
