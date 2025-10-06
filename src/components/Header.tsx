import { BarChart3 } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  onAdminClick: () => void;
}

export function Header({ onAdminClick }: HeaderProps) {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm px-3 sm:px-6 py-3 sm:py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-chart-1 to-chart-4 rounded-lg flex items-center justify-center">
            <span className="text-background text-sm sm:text-base">CMS</span>
          </div>
          <h1 className="text-foreground text-base sm:text-xl">Client Management</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAdminClick}
          className="w-10 h-10 sm:w-11 sm:h-11 bg-accent rounded-lg flex items-center justify-center hover:bg-accent/80 transition-all group active:bg-accent/60"
        >
          <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-chart-1 transition-colors" />
        </motion.button>
      </div>
    </header>
  );
}
