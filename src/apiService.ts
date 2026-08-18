
import type { Country, CountryDetail, CountryDetailResponse } from "./types";
import countriesData from '../data.json';

// import data.json 


const countries = countriesData as Country[];

// getAllCountries function for HOMEPAGE data.json only

export async function getAllCountries(): Promise<Country[]> {
  return countries;
}

//getCountryByCode
export async function getCountryByCode(code: string): Promise<Country | undefined> {
  return countries.find(
    (country) => country.alpha3Code.toLowerCase() === code.toLowerCase()
  );
}
//getCountryByName function COUNTRY DETAIL PAGE live fetch

const API_BASE_URL = "https://api.restcountries.com/countries/v5"

const API_KEY = import.meta.env.VITE_RESTCOUNTRIES_API_KEY;

//getCountryDetail
export async function getCountryDetail(code: string): Promise<CountryDetail> {
  const response = await fetch(
    `${API_BASE_URL}/codes.alpha_3/${code}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch country: ${response.status}`);
  }

  const result = (await response.json()) as CountryDetailResponse;

  const country = result.data.objects[0];

  if (!country) {
    throw new Error(`No country found for code: ${code}`);



  }

  return country;


}


// export async function getCountryByName(name: string): Promise<Country | undefined> {
//   const response = await fetch(``)
//   // return countries.find(
//   //   (country) => country.name.toLowerCase() === name.toLowerCase()
//   // );
// }




