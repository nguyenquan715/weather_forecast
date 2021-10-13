import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherBoard from './components/WeatherBoard';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {WEATHER} from './constants/weather';

const WEATHER_FORECAST = [
  {
    weather: WEATHER.SUNNY,
    temperature: '27',
    date: '13/10/2021'    
  },
  {
    weather: WEATHER.CLOUDY,
    temperature: '22',
    date: '14/10/2021' 
  },
  {
    weather: WEATHER.CLOUDY_GUSTS,
    temperature: '20',
    date: '15/10/2021'    
  },
  {
    weather: WEATHER.LIGHTNING,
    temperature: '25',
    date: '16/10/2021'
  },
  {
    weather: WEATHER.RAIN_WIND,
    temperature: '14',
    date: '17/10/2021'    
  },
  {
    weather: WEATHER.THUNDERSTORM,
    temperature: '20',
    date: '18/10/2021'    
  },
  {
    weather: WEATHER.CLOUDY_HIGH,
    temperature: '17',
    date: '19/10/2021' 
  },
  {
    weather: WEATHER.SUNNY,
    temperature: '30',
    date: '20/10/2021'
  },
];

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>      
      <WeatherBoard weatherForecast={WEATHER_FORECAST}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
