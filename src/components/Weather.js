import React, { useState } from 'react';

function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isValidCity, setIsValidCity] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setWeatherData(null);
        setIsValidCity(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=48b27e91b4c3b3c0e34538ab56ab0f89`);
            if (response.ok) {
                const data = await response.json();
                setWeatherData(data);
                setIsValidCity(true);
            } else {
                setIsValidCity(false);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setIsValidCity(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="Weather_component column">
                <h1 className="h1_tag">Weather App</h1>
                <form onSubmit={handleSubmit} className='form_style column center'>
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        className='input_tag'
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button type="submit" className='submit_btn'>Submit</button>
                </form>
                {loading && <div className="loader"></div>}
                {!isValidCity && <p className="error_message">Invalid city. Please enter a valid city name.</p>}
                {weatherData && (
                    <div className="weather_data">
                        <p>City: {weatherData.name}</p>
                        <p>Temperature: {weatherData.main.temp} C</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                        <p>Description: {weatherData.weather[0].description}</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Weather;
