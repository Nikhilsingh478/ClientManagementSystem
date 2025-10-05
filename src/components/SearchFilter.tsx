import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedFilter: string;
  onFilterChange: (value: string) => void;
  problemKeywords: string[];
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  problemKeywords,
}: SearchFilterProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search clients by business name or problem..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 bg-input-background border-border focus:ring-2 focus:ring-ring transition-all"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <label className="text-muted-foreground">Filter by problem:</label>
        <Select value={selectedFilter} onValueChange={onFilterChange}>
          <SelectTrigger className="w-[250px] bg-input-background border-border">
            <SelectValue placeholder="All Problems" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Problems</SelectItem>
            {problemKeywords.map((keyword) => (
              <SelectItem key={keyword} value={keyword}>
                {keyword}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
