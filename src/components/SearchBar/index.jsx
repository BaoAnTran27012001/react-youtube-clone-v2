import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      navigate(`/search?query=${inputText}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form
      className="border border-gray-400 px-3 py-2 rounded-full inline-flex"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent focus-visible:outline-none min-w-[400px]"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Search className="cursor-pointer" />
    </form>
  );
};

export default SearchBar;
