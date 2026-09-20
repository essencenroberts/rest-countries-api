

// SearchBarProps
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange}: SearchBarProps) {
  return (
    <div className="relative w-full md:w-80">
        <label htmlFor="search-input" className="search" hidden>Search for a country</label>

        <input 
          id="search-input"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search for a country..."
          className="w-full rounded-md shadow-sm bg-white dark:bg-dark-blue px-6 py-3 text-sm"
        />
      </div>
  );
}

export default SearchBar;