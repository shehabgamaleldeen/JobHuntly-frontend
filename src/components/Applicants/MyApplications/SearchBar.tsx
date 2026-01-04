import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.trim() === "") {
      onSearch(""); 
    }
  }, [query, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim()); 
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by company..."
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-600 text-sm md:text-base"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-[#F4F4FD] text-[#25324B] border border-gray-300 rounded hover:bg-gray-50 text-sm md:text-base"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;


