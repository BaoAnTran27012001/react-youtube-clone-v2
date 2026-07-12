import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="border border-gray-400 px-3 py-2 rounded-full inline-flex">
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent focus-visible:outline-none min-w-[400px]"
      />
      <Search className="cursor-pointer" />
    </div>
  );
};

export default SearchBar;
