import { useEffect, useState } from "react";
import type { Country } from "../types";
import { getAllCountries } from "../apiService";
import { getErrorMessage } from "../errorHandler";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import CountryCard from "../components/CountryCard";


// index.ts refractor for react Home page - get the countries, filter contries, 

// Home component
function Home() {

// state for all countries data
const [countries, setCountries] = useState<Country[]>([]);

// state for search box input
const [searchInput, setSearchInput] = useState("");

// useState for selected region | region select
const [selectedRegion, setSelectedRegion] = useState("");

// useState error
const [error, setError] = useState("");

// useEffect - replaces on page load getAllCountries() .then .catch
useEffect(() => {
  getAllCountries()
    .then((countries) => {
      setCountries(countries);
    })

    .catch((error) => {
      setError(getErrorMessage(error));
    })
}, []);

// filter countries by what user types

const filteredCountries = countries.filter((country) => {
    
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    const matchesRegion = 
      selectedRegion === "" || country.region === selectedRegion;
      
      
      return matchesSearch && matchesRegion;
});

  return (
    <main>
      <h1 className="mb-8 text-2xl font-extrabold">Countries</h1>

      {/* searchbox and dropdown filter */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar 
          value={searchInput}
          onChange={setSearchInput}
        />

        <RegionFilter 
          value={selectedRegion}
          onChange={setSelectedRegion}
        />
      </div>

      {/* error message */}
      {error && (
        <p className="mb-6 rounded-md bg-white p-6 text-red-600 shadow-md">
          {error}
        </p>
      )}

      {/* country card grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {filteredCountries.map((country) => (
          <CountryCard 
            key={country.alpha3Code}
            country={country}
          />
        ))}
      </div>
    </main>
  )
}

export default Home;

