import { getCountryDetail, getCountryByCode } from "./apiService";
import { handleError } from "./errorHandler";
import type { CountryDetail } from "./types";
import "./theme.js";

const detailContainer = document.getElementById("country-detail")!;

// get ocuntry code out of URL , parse the query string 
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

// detail view build out connecting the DOM

function buildDetailView(country: CountryDetail): HTMLElement {
  const container = document.createElement("div")
  container.className = "flex flex-col md:flex-row gap-12 items-start";


// flag
 const flagImage = document.createElement("img");
  flagImage.src = country.flag.url_svg;
  flagImage.alt = `Flag of ${country.names.common}`;
  flagImage.className = "w-full md:w-1/2 rounded-md";
  //right column with info
  const infoColumn = document.createElement("div");
  infoColumn.className = "flex-1";
  //  country name , 
  const nameHeading = document.createElement("h1");
  nameHeading.textContent = country.names.common;
  nameHeading.className = "font-extrabold text-2xl md:text-3xl mb-6";
  //native name

  const nativeNameValue = country.names.native ? Object.values(country.names.native)[0]?.common : undefined;

  //two-column 
    const left = document.createElement("div");
    const right = document.createElement("div");
    right.className = "md:ml-24 mt-6 md:mt-0";

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "flex flex-col md:flex-row md:jystify-between mb-12";

    // build details line
    function buildDetailsLine(label: string, value: string): HTMLParagraphElement {
      const p = document.createElement("p");
      p.className = "mb-2";
      p.innerHTML = `<span class="font-semibold">${label}:</span> ${value}`;
      return p
    }
// left side //population, region, sub region, capital,
    left.append(
      buildDetailsLine('Native Name', nativeNameValue ?? "N/A" ),
      buildDetailsLine('Population', country.population.toLocaleString()),
      buildDetailsLine('Region', country.region),
      buildDetailsLine('Sub Region', country.subregion ?? "N/A"),
      buildDetailsLine(
      //capital 
        'Capital',
        country.capitals?.map((c) => c.name).join(", ") ?? "N/A"
      )
    );

  // rigth side |  toop level domain, currencies, language
    right.append(
      buildDetailsLine("Top Level Domain", country.tlds?.join(", ") ?? "N/A"),
      buildDetailsLine("Currencies", country.currencies?.map((c) => c.name).join(', ') ?? "N/A"
      ),
      buildDetailsLine("Languages", country.languages?.map((l) => l.name).join(', ') ?? "N/A"
      )
    );

    detailsContainer.append(left, right);

    // border countries 
  const bordersContainer = document.createElement("div");
  bordersContainer.className = "flex flex-wrao items-center gap-3";
    if (country.borders && country.borders.length > 0) {
      const bordersLabel = document.createElement("span");
      bordersLabel.textContent = "Border Countries";
      bordersLabel.className = "font-semibold mr-2";
      bordersContainer.appendChild(bordersLabel);

        // each border code needs to become a clickable button with real country name 

      country.borders.forEach((borderCode) => {
        getCountryByCode(borderCode).then((borderCountry) => {
          if (!borderCountry) return;

          const borderLink = document.createElement("a");
          borderLink.href = `details.html?code=${borderCountry.alpha3Code}`;
          borderLink.textContent = borderCountry.name;
          borderLink.className = 
            "rounded-md shadow-sm bg-white dark:bg-dark-blue px-6 py-1 text-sm"
          bordersContainer.appendChild(borderLink);


        });
      });
    }
      infoColumn.append(nameHeading, detailsContainer, bordersContainer);
      container.append(flagImage, infoColumn);

      return container; 
    }   

    if (!code) {
      handleError(new Error("No Country code provided."), detailContainer);
    } else {
      getCountryDetail(code)
        .then((country) => {
          detailContainer.innerHTML = "";
          detailContainer.appendChild(buildDetailView(country));
        })
        .catch((error) => {
          handleError(error, detailContainer);
        });
    } 

  





