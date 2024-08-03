import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  handleSearch?: (value: string) => void;
  defaultValue?: string;
}

export default function SearchBar({ placeholder, handleSearch, defaultValue }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Input
        className="pl-10 py-2 text-sm border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-primary"
        placeholder={placeholder}
        onChange={(e) => handleSearch && handleSearch(e.target.value)}
        defaultValue={defaultValue}
        aria-label="search"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  );
}