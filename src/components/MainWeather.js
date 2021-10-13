import '../assets/css/weather-main.scss';
import '../assets/css/weather-icons.min.css';

function MainWeather(props) {
    return(
        <div className="weather-main">
            <div className="weather-icon">
                <i className={`wi ${props.weather.icon}`}></i>
            </div>
            <div className="weather-info">
                <div className="date">
                    {props.date}
                </div>
                <div className="description">
                    {props.weather.description}
                </div>
                <div className="temperature">
                    {props.temperature}°C
                </div>
            </div>
        </div>
    )
}

export default MainWeather;