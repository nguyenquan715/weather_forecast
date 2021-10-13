import '../assets/css/weather-card.scss';
import '../assets/css/weather-icons.min.css';

function WeatherCard(props) {
    return(
        <div className="weather-card">
            <div className="weather-icon">
                <i className={`wi ${props.weather.icon}`}></i>
            </div>
            <div className="weather-info">
                <div className="date">
                    {props.date}
                </div>
                <div className="temperature">
                    {props.temperature}°C
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;