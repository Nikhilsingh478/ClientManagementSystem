import { motion, AnimatePresence } from "motion/react";
import { Trash2, X } from "lucide-react";
import { Button } from "./ui/button";

interface BulkActionBarProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  onClearSelection: () => void;
}

export function BulkActionBar({ selectedCount, onDeleteSelected, onClearSelection }: BulkActionBarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 sm:bottom-8 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50"
        >
          <div className="bg-card border-2 border-chart-1 rounded-xl shadow-2xl shadow-black/40 px-3 py-3 sm:px-6 sm:py-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-chart-1/20 text-chart-1 rounded-full flex items-center justify-center text-sm sm:text-base flex-shrink-0">
                  {selectedCount}
                </div>
                <p className="text-foreground text-sm sm:text-base">
                  {selectedCount} {selectedCount === 1 ? "client" : "clients"} selected
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={onDeleteSelected}
                  variant="destructive"
                  size="sm"
                  className="flex-1 sm:flex-none transition-all hover:scale-105 active:scale-95 h-9 sm:h-10 text-xs sm:text-sm"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Delete Selected
                </Button>

                <Button
                  onClick={onClearSelection}
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none transition-all hover:bg-accent active:bg-accent/60 h-9 sm:h-10 text-xs sm:text-sm"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
