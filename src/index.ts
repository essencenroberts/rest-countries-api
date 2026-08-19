// main 
import { getAllCountries, getCountryDetail } from "./apiService.js";
import { renderCountryList, countryCard } from "./renderCountries.js";
import { handleError } from "./errorHandler.js";
import type { Country } from "./types.js";
import "./theme.js";



// connect to HTML using DOM
const countriesContainer = document.getElementById("countries")!;

const searchInput = document.getElementById("search-input") as HTMLInputElement;

const regionSelect = document.getElementById("region-select") as HTMLSelectElement;

// array of Countrys 
let allCountries: Country[] = [];


// filterCountries 
function filterCountries(
  countries: Country[],
  searchText: string,
  region: string
): Country[] {
  return countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesRegion = region === "" || country.region === region;
      return matchesSearch && matchesRegion;
  });
}

// every time the input chnages we need to call updateDisplayCountries to re-render the grid
function updateDisplayCountries(): void {
  const filtered = filterCountries(
    allCountries,
    searchInput.value,
    regionSelect.value
  );
  renderCountryList(filtered, countriesContainer);
}

// on page load
getAllCountries()
  .then((countries) => {
    allCountries = countries;
    renderCountryList(allCountries, countriesContainer);
  }) 
  .catch((error) => {
    handleError(error, countriesContainer);
  });


console.log("search input found:", searchInput);
console.log("region select found:", regionSelect);

//add event listenders
  searchInput.addEventListener("input", updateDisplayCountries);

  regionSelect.addEventListener("change", updateDisplayCountries);
// const countryCard = 



// // TEST if api fetch is working - confirm its working
// getAllCountries().then((countries) => {
//   console.log("Total countries:", countries.length);
//   console.log("First country:", countries[0]);
// });

// getCountryDetail("BEL").then((country) => {
//   console.log("Beligum from live API:", country);}).catch((error) => {
//     console.log("getCountryDetail failed:", error);
    
//   });
  