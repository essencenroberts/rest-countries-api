import type { Country } from "./types";

/** turn country data in DOm elements for homepage grids 
 - only need Country type (flag, name, population, region, capital)

*/
// create Country card that takes a single country, returns an HTMLElement 

export function countryCard(country: Country): HTMLElement {
  const card = document.createElement("a");
  card.href = `details.html?code=${country.alpha3Code}`;
  card.className = "block rounded-lg overflow-hidden shadow-md bg-white dark:bg-dark-blue";



  // flag
  const flagImage = document.createElement("img");
  flagImage.src = country.flags.svg;
  flagImage.alt = `Flag of ${country.name}`;
  flagImage.className = "w-full h-40 ovject-cover";

  // text below the flag 

  const infoContainer = document.createElement("div");
  infoContainer.className = "p-6";

  // country name
  const nameHeading = document.createElement("h2");
  nameHeading.textContent = country.name;
  nameHeading.className = "font-extrabold text-lg mb-4";

  // population
  const populationText = document.createElement("p");
  populationText.innerHTML = `<span class="font-semibold">Population:</span> ${country.population.toLocaleString()}`;

  // region
  const regionText = document.createElement("p");
  regionText.innerHTML = `<span class="font-semibold">Region:</span> ${country.region}`;
  // capital 

  const capitalText = document.createElement("p");
  capitalText.innerHTML = `<span class="font-semibold">Capital:</span> ${country.capital ?? "N/A"
  }`;

  infoContainer.append(populationText, regionText, capitalText);
  card.append(flagImage, nameHeading, infoContainer);

  return card;
}


// renderCountryList
  /** 
    - takes an array of Country and
    - refliter search/drop down
   */

export function renderCountryList(
  countries: Country[],
  container: HTMLElement
): void {
  container.innerHTML = "";

  countries.forEach((country) => {
    const card = countryCard(country);
    container.appendChild(card);
  });
}
