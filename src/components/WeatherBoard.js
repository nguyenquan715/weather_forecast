import WeatherCard from './WeatherCard';
import MainWeather from './MainWeather';
import '../assets/css/weather-board.scss';

function WeatherBoard(props) {
    return(
        <div className="weather-board">
            <MainWeather icon='wi-day-sunny' date='13/10/2022' temperature='26'/>
            <div className="weather-list">
                <WeatherCard icon='wi-day-thunderstorm' date='14/10/2022' temperature='17'/>
                <WeatherCard icon='wi-day-cloudy' date='15/10/2022' temperature='20'/>
                <WeatherCard icon='wi-day-rain' date='16/10/2022' temperature='19'/>
                <WeatherCard icon='wi-day-sleet' date='17/10/2022' temperature='9'/>
                <WeatherCard icon='wi-day-snow-wind' date='18/10/2022' temperature='-5'/>                
            </div>
        </div>
    );
}

export default WeatherBoard;