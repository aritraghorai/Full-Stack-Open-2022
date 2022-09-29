import { useState, useEffect } from "react";
import axios from "axios";
import ShowCountries from "./Components/ShowCountries";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const changeFulter = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);
  const showCountry =
    filter === ""
      ? []
      : countries.filter((c) => c.name.common.toLowerCase().includes(filter));
  return (
    <div>
      <div>
        find countries:
        <input type="text" value={filter} onChange={changeFulter} />{" "}
      </div>
      <ShowCountries showCountry={showCountry} />
    </div>
  );
}

export default App;
