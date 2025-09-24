import { useState } from "react";

type SearchProps = {
  sendDataToParent: (value: string) => void;
};

const Search = ({ sendDataToParent }: SearchProps) => {
  const [searchedItem, setSearchedItem] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchedItem(value);
    sendDataToParent(value);
  };

  return (
    <div>
      <input
        type="text"
        className="w-50 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 
                   focus:ring-2 focus:ring-[#a47148] outline-none transition"
        placeholder="Search..."
        value={searchedItem}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
