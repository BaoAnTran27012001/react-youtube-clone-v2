import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [text, setText] = useState();
  const navigate = useNavigate();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (text.trim()) {
        navigate(`/search?query=${text}`);
      } else {
        navigate("/");
      }
    }
  };
  return (
    <div className="border border-gray-400 px-3 py-2 rounded-full inline-flex">
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent focus-visible:outline-none min-w-[400px]"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeyDown}
      />
      <Search className="cursor-pointer" />
    </div>
  );
};

export default SearchBar;
