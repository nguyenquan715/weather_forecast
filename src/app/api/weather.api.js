import axios from 'axios';

export const WeatherApi = {
    getWeatherForecast: () => {    
        return axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Hanoi&appid=2a49085afb487d2ff55ee5e94505e422');                                   
    }
}