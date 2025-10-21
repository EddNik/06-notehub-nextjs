import css from "./SearchBox.module.css";
import clsx from "clsx";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface SearchBoxProps {
  setQuery: (query: string) => void;
}

function SearchBox({ setQuery }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputValue = useDebouncedCallback((value: string) => {
    setQuery(value.trim());
  }, 500);

  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
          handleInputValue(event.target.value);
        }}
      />
      <button
        onClick={() => {
          setInputValue("");
          setQuery("");
        }}
        type="button"
        className={clsx(css.btnClear, inputValue && css.btnClearVisible)}
      >
        CANCEL
      </button>
    </div>
  );
}

export default SearchBox;
