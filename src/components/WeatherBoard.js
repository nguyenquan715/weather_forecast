import WeatherCard from './WeatherCard';
import MainWeather from './MainWeather';
import '../assets/css/weather-board.scss';
import { useEffect, useState } from 'react';
import { WeatherApi } from '../app/api/weather.api';
import { WEATHER } from '../constants/weather';
import { useSelector, useDispatch } from 'react-redux';
import { selectBackgroundColor, setBackgroundColor } from './../app/weatherSlice';


function WeatherBoard(props) {
    const [weatherForecastInfo, setWeatherForecastInfo] = useState([]);
    const [currentWeather, setCurrentWeather] = useState({});
    const backgroundColor = useSelector(selectBackgroundColor);
    const dispatch = useDispatch();  
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
            const weather = setWeather(mockWeatherForecast[0]);
            setCurrentWeather(weather);            
            dispatch(setBackgroundColor(weather['background']));            
        })
        .catch((err) => {
            console.log(err);                
        });
    }, [dispatch]);

    const handleClick = (index) => {        
        let weatherRaw = weatherForecastInfo[index];
        const weather = setWeather(weatherRaw);
        setCurrentWeather(weather);
        dispatch(setBackgroundColor(weather['background']));
    }    

    const weatherList = [];    
    for(let i=0; i<weatherForecastInfo.length; i++) { 
        let weatherRaw = weatherForecastInfo[i];
        const weather = setWeather(weatherRaw);                
        weatherList.push(<WeatherCard key={`${weatherRaw['main']}-${i}`} index={i} icon={weather.icon} date={weather.date} temperature={weather.temperature} onClick={(index) => handleClick(index)}/>);        
    }    
    return(
        <div className="weather-board" style={{backgroundColor: backgroundColor}}>
            {currentWeather && <MainWeather icon={currentWeather.icon} date={currentWeather.date} temperature={currentWeather.temperature} description={currentWeather.description}/>}
            <div className="weather-list">
                {weatherList}                             
            </div>
        </div>
    );
}

function setWeather(weatherRaw){
    let weatherInfo = getWeatherInfo(weatherRaw['main']);
    let icon = weatherInfo['icon'];
    let background = weatherInfo['background'];
    let date = weatherRaw['date'];
    let temperature = convertToCelsius(weatherRaw['temperature']);
    let description = weatherRaw['description'].toUpperCase();
    return {
        icon: icon,
        date: date,
        temperature: temperature,
        description: description,
        background: background,
    };
}

function getWeatherInfo(weatherMain) {
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