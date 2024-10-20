import React, { ChangeEvent, useState } from "react";
import styles from "./SearchBarStyle.module.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search articles...",
}) => {
  const [query, setQuery] = useState<string>("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className={styles["search-bar"]}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={styles["search-input"]}
      />
    </div>
  );
};

export default SearchBar;
