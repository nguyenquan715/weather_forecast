import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherBoard from './components/WeatherBoard';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>      
      <WeatherBoard />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
