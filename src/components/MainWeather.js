import '../assets/css/weather-main.scss';
import '../assets/css/weather-icons.min.css';

export default function MainWeather(props) {
    return(
        <div className="weather-main">
            <div className="weather-icon">
                <i className={`wi ${props.icon}`}></i>
            </div>
            <div className="weather-info">
                <div className="date">
                    {props.date}
                </div>
                <div className="weather-description">
                    {props.description}
                </div>                
                <div className="temperature">
                    {props.temperature}°C
                </div>
            </div>
        </div>
    )
}