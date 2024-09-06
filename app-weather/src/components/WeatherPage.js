import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './WeatherPage.css';

const WeatherPage = () => {
  const { cityId } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load weather data');
        setLoading(false);
      }
    };
    fetchWeather();
  }, [cityId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Determine background based on weather condition
  const weatherCondition = weather.weather[0].main.toLowerCase();
  const backgroundClass = 
    weatherCondition === 'clear' ? 'sunny' :
    weatherCondition === 'rain' ? 'rainy' :
    weatherCondition === 'clouds' ? 'cloudy' : '';

  return (
    <div className={`container ${backgroundClass}`}>
      <h2 className='title-heading'>Weather in {weather.name}</h2>
      <p><strong>Temperature :- </strong> {weather.main.temp}°K</p>
      <p><strong>Weather :- </strong> {weather.weather[0].description}</p>
      <p><strong>Humidity :- </strong> {weather.main.humidity}%</p>
      <p><strong>Wind Speed :- </strong> {weather.wind.speed} m/s</p>
      <p><strong>Pressure :- </strong> {weather.main.pressure} hPa</p>
    </div>
  );
};

export default WeatherPage;
