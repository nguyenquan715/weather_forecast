import WeatherCard from './WeatherCard';
import MainWeather from './MainWeather';
import '../assets/css/weather-board.scss';
import { useEffect, useState } from 'react';
import { WeatherApi } from '../app/api/weather.api';
import { WEATHER } from '../constants/weather.constant';
import { useSelector, useDispatch } from 'react-redux';
import { selectBackground, setBackground } from './../app/weatherSlice';


export default function WeatherBoard(props) {
    const [weatherForecastInfo, setWeatherForecastInfo] = useState([]);
    const [currentWeather, setCurrentWeather] = useState({});
    const background = useSelector(selectBackground);
    const dispatch = useDispatch();
    
    useEffect(() => {
        WeatherApi.getWeatherForecast()
            .then((response) => {
                const mockWeatherForecast = response.data['list']
                                                .filter(weatherInfo => weatherInfo['dt_txt'].split(' ')[1] === '09:00:00')
                                                .map(weatherInfo => {
                                                    const weather = {
                                                        date: weatherInfo['dt_txt'].split(' ')[0],
                                                        temperature: weatherInfo.main['temp'],
                                                        main: weatherInfo.weather[0]['main'],
                                                        description: weatherInfo.weather[0]['description']
                                                    };
                                                    return weather;
                                                });                    
                console.log(mockWeatherForecast);
                setWeatherForecastInfo(mockWeatherForecast);
                const weather = setWeather(mockWeatherForecast[0]);
                setCurrentWeather(weather);
                dispatch(setBackground(weather['background']));
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleClickWeatherCard = (index) => {        
        const weatherRaw = weatherForecastInfo[index];
        const weather = setWeather(weatherRaw);
        setCurrentWeather(weather);
        dispatch(setBackground(weather['background']));
    }
    
    return(
        <div className="weather-board" style={{backgroundImage: `url(${background})`}}>
            {currentWeather && <MainWeather icon={currentWeather.icon} date={currentWeather.date} temperature={currentWeather.temperature} description={currentWeather.description}/>}
            <div className="weather-list">
                {
                    weatherForecastInfo.map((weatherRaw, index) => {
                        const weather = setWeather(weatherRaw);
                        return <WeatherCard key={`${weatherRaw['main']}-${index}`} icon={weather.icon} date={weather.date} temperature={weather.temperature} onClick={() => handleClickWeatherCard(index)}/>;
                    })
                }                             
            </div>
        </div>
    );
}

const setWeather = (weatherRaw) => {
    const weatherInfo = getWeatherInfo(weatherRaw['main']);
    const icon = weatherInfo['icon'];
    const background = weatherInfo['background'];
    const date = weatherRaw['date'];
    const temperature = convertToCelsius(weatherRaw['temperature']);
    const description = weatherRaw['description'].toUpperCase();
    return {
        icon,
        date,
        temperature,
        description,
        background,
    };
}

const getWeatherInfo = (weatherMain) => {
    const main = weatherMain.toLowerCase();
    const keys = Object.keys(WEATHER);    
    for(let key of keys) {
        if(main.includes(key)) {
            return WEATHER[key];
        }
    }
    return WEATHER['default'];
}

const convertToCelsius = (kelvin) => {
    return Math.floor(kelvin - 273.15);
}