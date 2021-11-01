import '../assets/css/weather-card.scss';
import '../assets/css/weather-icons.min.css';

export default function WeatherCard(props) {
    return(
        <div className="weather-card" onClick={() => props.onClick()}>
            <div className="weather-icon">
                <i className={`wi ${props.icon}`}></i>
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