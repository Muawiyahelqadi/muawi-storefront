import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search appointments..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
