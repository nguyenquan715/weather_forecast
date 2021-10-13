import WeatherCard from './WeatherCard';
import MainWeather from './MainWeather';
import '../assets/css/weather-board.scss';
import { useEffect, useState } from 'react';
import { WeatherApi } from '../app/api/weather';
import { WEATHER } from '../constants/weather';
import counterSlice from '../features/counter/counterSlice';


function WeatherBoard(props) {
    const [weatherForecastInfo, setWeatherForecastInfo] = useState([]);
    const [currentWeather, setCurrentWeather] = useState({
        icon: 'wi-day-sunny',
        date: '13/10/2021',
        temperature: 21,
        description: 'Sunny'
    });    
    //Call api at first render
    useEffect(() => {
        WeatherApi.getWeatherForecast()
        .then((response) => { 
            let mockWeatherForecast = [];
            for(let weatherInfo of response.data['list']) {
                if(weatherInfo['dt_txt'].split(' ')[1] === '06:00:00'){
                    mockWeatherForecast.push({
                        date: weatherInfo['dt_txt'].split(' ')[0],
                        temperature: weatherInfo.main['temp'],
                        main: weatherInfo.weather[0]['main'],
                        description: weatherInfo.weather[0]['description']
                    });
                }
            }
            console.log(mockWeatherForecast);
            setWeatherForecastInfo(mockWeatherForecast);
        })
        .catch((err) => {
            console.log(err);                
        });
    }, []);

    const handleClick = (index) => {
        let weatherRaw = weatherForecastInfo[index];
        const weather = setWeather(weatherRaw);
        setCurrentWeather(weather);
    }    

    const weatherList = [];    
    for(let i=0; i<weatherForecastInfo.length; i++) { 
        let weatherRaw = weatherForecastInfo[i];
        const weather = setWeather(weatherRaw);
        console.log(weather);
        if(i === 0) {
            setCurrentWeather(weather);
        }
        else{
            weatherList.push(<WeatherCard key={i} index={i} icon={weather.icon} date={weather.date} temperature={weather.temperature}/>);
        }
    }
    return(
        <div className="weather-board">
            {currentWeather && <MainWeather icon={currentWeather.icon} date={currentWeather.date} temperature={currentWeather.temperature} description={currentWeather.description}/>}
            <div className="weather-list">
                {weatherList}                
            </div>
        </div>
    );
}

function setWeather(weatherRaw){
    let icon = setWeatherIcon(weatherRaw['main']);
    let date = weatherRaw['date'];
    let temperature = convertToCelsius(weatherRaw['temperature']);
    let description = weatherRaw['description'];
    return {
        icon: icon,
        date: date,
        temperature: temperature,
        description: description
    };
}

function setWeatherIcon(weatherMain) {
    const main = weatherMain.toLowerCase();
    const keys = Object.keys(WEATHER);
    for(let key of keys) {
        if(main.includes(key)) {
            return WEATHER[key];
        }
    }
    return WEATHER['default'];
}

function convertToCelsius(kelvin){
    return Math.floor(kelvin - 273.15);
}

export default WeatherBoard;