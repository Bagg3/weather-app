import { useEffect, useState } from "react";
import Home from "./pages/Home";
import { WeatherData } from "./types/WeatherInterface";
import useFetchWeather from "./utils/FetchWeather"; 

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // Fetch weather data when the component mounts
  const fetchedData = useFetchWeather();

  useEffect(() => {
    setWeatherData(fetchedData.data);
  }, [fetchedData]);

  // Update icon when weatherData changes
  useEffect(() => {
    if (weatherData) {
      const link = document.querySelector(
        "link[rel*='icon']"
      ) as HTMLLinkElement;
      link.type = "image/png";
      link.rel = "icon";
      link.href = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  }, [weatherData]);

  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
