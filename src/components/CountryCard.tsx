import { Link } from "react-router-dom";
import type { Country } from "../types";

// CountryCardProps 
interface CountryCardProps {
  country: Country
}

// CountryCardComponent
function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      to={`/details/${country.alpha3Code}`}
      className="block rounded-lg overflow-hidden shadow-md bg-white dark:bg-dark-blue"
    >

      {/* country flag */}
      <img 
        src={country.flags.svg}
        alt={`Flag of ${country.name}`}
        className="w-full h-40 ovject-cover"
      />

      {/* section with country name  */}
      <div className="p-6">
        <h2 className="mb-4 text-lg font-extrabold">
          {country.name}
        </h2>

      {/*  country population */}
        <p className="mb-2">
          <span className="font-semibold">Population:</span>{" "}
          {country.population.toLocaleString()}
        </p>

      {/*  country region */}
      <p className="font-semibold">
        <span className="font-semibold">Region:</span>{" "}
        {country.region}
      </p>

      {/*  country capital */}
      <p>
        <span className="font-semibold">Capital:</span>{" "}
        {country.capital ?? "N/A"}
      </p>
      </div>
    </Link>
  );
}

export default CountryCard;