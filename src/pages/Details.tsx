import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import type { Country, CountryDetail } from "../types";
import { getCountryByCode, getCountryDetail } from "../apiService";
import { getErrorMessage } from "../errorHandler";

// Details page component 
function Details() {

  // get code
  const { code } = useParams();

  // Country Detail usestate
  const [country, setCountry] = useState<CountryDetail | null> (null);

  // state error message
  const [error, setError] = useState("");

  // loading state
  const [loading, setLoading] = useState(true);

  // border countries state
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);

  // useEffect
  useEffect(() => {
    if (!code) {
      setError("No Country code provided.");
      setLoading(false);
      return;
    }

    // start laoding country
    setLoading(true)

    // ask API for country
    getCountryDetail(code)
        // save country when loaded
      .then((country) => {
        setCountry(country);
        setError("");
      })

      .catch((error) => {
        setError(getErrorMessage(error));
      })

      .finally(() => {
        setLoading(false);
      });
  }, [code]);


    // border countries useEffect
    useEffect(() => {
       
       //if country has no border
       if (!country?.borders || country.borders.length === 0) {
        setBorderCountries([]);
        return;
       }

        // every border country
       Promise.all(
        country.borders.map((borderCode) => 
          getCountryByCode(borderCode)
        )  
       ).then((countries) => {
       //remove missing ocuntries
        const validCountries = countries.filter(
          (country): country is Country => Boolean(country)
        );

        //save border countries
        setBorderCountries(validCountries);
       });
    }, [country]);

    if (loading) {
      return (
        <main>
          <p>Loading country information...</p>
        </main>
      );
    }
    // show error if something foes wrong
    if (error) {
    return (
      <main>
        <p className="rounded-md bg-white p-6 text-red-600 shadow-md dark:bg-dark-blue">{error}</p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-white px-6 py-3 shadow-md dark:bg-dark-blue"
        >
          Back to Home
        </Link>
      </main>
    );
  }
  //cant use country before it exist
  if (!country) {
    return null;
  }

  // get countrys native name
  const nativeNameValue =
    country.names.native
      ? Object.values(country.names.native) [0]?.common
      : undefined;

  return (
    <main>
      <Link
        to="/"
        className="mb-10 inline-block rounded-md bg-white px-6 py-3 shadow-md dark:bg-dark-blue"
       >← Back</Link>

       <div className="flex flex-col items-start gap-12 md:flex-row">
        
        {/* country flag */}
        <img 
          src={country.flag.url_svg}
          alt={`Flag of ${country.names.common}`}
          className="w-full rounded-md md:w-1/2"
        />

        {/* right side country info */}
        <div className="flex-1">
          <h1 className="mb-6 text-2xl font-extrabold md:text-3xl">{country.names.common}</h1>

           {/* 2 column */}
          <div className="mb-12 flex  flex-col md:flex-row md:justify-between">
            {/* left */}
              <div>
                <p className="mb-2">
                  <span
                    className="font-semibold"
                  >Native Name"</span>{" "}
                  {nativeNameValue ?? "N/A"}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Population:</span>{" "}
                  {country.population.toLocaleString()}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Region:</span>{" "}
                  {country.region}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">
                    Sub Region:
                  </span>{" "}
                  {country.subregion ?? "N/A"}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">
                    Capital:
                  </span>{" "}
                  {country.capitals
                  ?.map((capital) => capital.name)
                  .join(", ") ?? "N/A"}
                </p>

              </div>

            {/* right */}
              <div className="mt-6 md:ml-24 md:mt-0">
                <p className="mb-2">
                  <span className="font-semibold">
                    Top Level Domain:
                  </span>{ " "}
                  {country.tlds?.join(", ") ?? "N/A"}
                </p>

                 <p className="mb-2">
                  <span className="font-semibold">
                    Currencies"
                  </span>{ " "}
                  {country.currencies
                  ?.map((currency) => currency.name)
                  .join(", ") ?? "N/A"}
                </p>

                 <p className="mb-2">
                  <span className="font-semibold">
                    Languages:
                  </span>{ " "}
                  {country.languages 
                  ?.map((langugage) => langugage.name)
                  .join(", ") ?? "N/A"}
                </p>

              </div>

              {/* border countries section */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="mr-2 font-semibold">Border Countries:</span>

                {borderCountries.length > 0 ? (
                  borderCountries.map((borderCountry) => (
                    <Link
                      key={borderCountry.alpha3Code}
                      to={`/details/${borderCountry.alpha3Code}`}
                      className="rounded-md bg-white px-6 py-2 text-sm shadow-sm dark:bg-dark-blue"
                    >
                      {borderCountry.name}
                    </Link>
                  ))
                ) : (
                  <span>N/A</span>
                )}
                
                
              </div>
          </div>

        </div>

       
       </div>
    
    </main>
  );
}

export default Details;