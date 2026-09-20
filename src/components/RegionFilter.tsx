import type { Region } from "../types";

// dropdown to filter countrie sby region component 


// list of regions in dropdown
const regions: Region[] = [
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
];

// RegionFilter props 
interface RegionFilterProps {
  value: string;
  onChange: (value: string) => void;
}

// RegionFilter component value and onChange
function RegionFilter({ value, onChange }:RegionFilterProps ) {
  return (
    <div>
      <label htmlFor="region-select" className="search" hidden>Filter by Region</label>
        <select
          id="region-select"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-md shadow-sm bg-white dark:bg-dark-blue px-6 py-y text-sm"
        >
         <option value="">Filter by Region</option>

            {/* create one option for each region .map() */}
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
        </select>
    </div>
  );
}

export default RegionFilter;
