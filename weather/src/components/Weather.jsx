import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import searcht from '../assets/search.png';
import Weathr from '../assets/weather.png';
import wind from '../assets/wind.png';
import temp from '../assets/temperature.png';
import max from '../assets/fever.png';
import min from '../assets/hot.png';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);
    const inpdat = useRef(null);

    const search = async (city) => {
        if (city===""){
            alert("Please enter a city");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                temperature: Math.floor(data.main.temp),
                windSpeed: data.wind.speed,
                city: data.name,
                maxtemp: Math.floor(data.main.temp_max),
                mintemp: Math.floor(data.main.temp_min),
            });
        } catch (error) {
            console.log("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        search('Hyderabad');
    }, []);

    return (
        <div className="box">
            <div className="search">
                <input ref={inpdat} type="text" placeholder="Search." />
                <img src={searcht} alt="search icon" onClick={() => search(inpdat.current.value)} />
            </div>
            <br /><br />
            <img src={Weathr} alt="weather icon" className="weathr" />
            <p className="temp">{weatherData.temperature}°C</p>
            <p className="city">{weatherData.city}</p>
            <br /><br /><br /><br />
            <div className="weather-data">
                <div className="data">
                    <img src={temp} alt="humidity icon" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="data">
                    <img src={wind} alt="wind speed icon" />
                    <div>
                        <p>{weatherData.windSpeed}km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
                <div className="data1">
                    <img src={min} alt="min temperature icon" />
                    <div>
                        <p>{weatherData.mintemp}°C</p>
                        <span>Min-Temperature</span>
                    </div>
                </div>
                <div className="data1">
                    <img src={max} alt="max temperature icon" />
                    <div>
                        <p>{weatherData.maxtemp}°C</p>
                        <span>Max-Temperature</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
