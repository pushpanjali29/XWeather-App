
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const API_KEY = "9ec60aac943a429881a162037242610";
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (city) {
      setLoading(true);
      fetchData();
    }
  }, [city]);

  const fetchData = async () => {
    try {
      const data = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      if (!data.ok) {
        throw new Error("City not found. Please enter a valid city name.");
      }
      const response = await data.json();
      setCities(response);
      setLoading(false);
      setIsLoaded(true);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch weather data");
      setLoading(false);
      setIsLoaded(false);
    }
  };

  const handleClick = () => {
    setCity(cities);
    setIsLoaded(false);
  };

  return (
    <div className="App">
      <input
        className="inputBox"
        onChange={(e) => setCities(e.target.value)}
        type="text"
        placeholder="Enter city name"
      />
      <button className="btn" onClick={handleClick} type="button">
        Search
      </button>

      {loading && <p>Loading data...</p>}
      {isLoaded && (
        <div className="container weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{cities?.current?.temp_c} C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3> <p>{cities?.current?.humidity}</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{cities?.current?.condition?.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{cities?.current?.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
