import React, { useEffect, useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
const WeatherData = ({ capital }) => {
  const [weather, setWeather] = useState(undefined);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [capital]);
  return (
    <>
      {weather && (
        <div>
          <div>Temperature:{weather.main.temp} Celsius</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
          />
          <div>wind:{weather.wind.speed} m/s</div>
        </div>
      )}
    </>
  );
};

export default WeatherData;
