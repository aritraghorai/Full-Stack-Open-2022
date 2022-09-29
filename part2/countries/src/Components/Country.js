import React, { useState } from "react";
import WeatherData from "./WeatherData";

const Country = ({ country }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      {show ? (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital:{country.capital.join(" ")}</p>
          <p>Area:{country.area}</p>
          <h1>Languages:</h1>
          <ul>
            {Object.keys(country.languages).map((la) => (
              <li key={la}>{country.languages[la]}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt="" />
          <WeatherData capital={country.capital[0]} />
        </div>
      ) : (
        <>
          <p>{country.name.common}</p>
          <button onClick={() => setShow(true)}>show</button>
        </>
      )}
    </div>
  );
};

export default Country;
