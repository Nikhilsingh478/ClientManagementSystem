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
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-card border-2 border-chart-1 rounded-xl shadow-2xl shadow-black/40 px-6 py-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-chart-1/20 text-chart-1 rounded-full flex items-center justify-center">
                  {selectedCount}
                </div>
                <p className="text-foreground">
                  {selectedCount} {selectedCount === 1 ? "client" : "clients"} selected
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={onDeleteSelected}
                  variant="destructive"
                  size="sm"
                  className="transition-all hover:scale-105"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected
                </Button>

                <Button
                  onClick={onClearSelection}
                  variant="outline"
                  size="sm"
                  className="transition-all hover:bg-accent"
                >
                  <X className="w-4 h-4 mr-2" />
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
