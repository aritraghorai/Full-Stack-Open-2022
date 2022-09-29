import React from "react";
import Country from "./Country";

const ShowCountries = ({ showCountry }) => {
  if (showCountry.length > 10) {
    return <p>Two many matches,specify another filter</p>;
  }

  return (
    <div>
      {showCountry.map((country) => (
        <Country country={country} key={country.name.common} />
      ))}
    </div>
  );
};

export default ShowCountries;
