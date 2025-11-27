

import cityList, { cityAliases } from '../utils/citiesList';

const API_KEY = "690b4b1c4d59450dcb7c2bf2cfa86740"; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const normalizeArabicText = (text) => {
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\u064B-\u065F]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[ىي]/g, 'ي')
    .replace(/^ال([^ا])/g, 'ال$1')
    .toLowerCase();
};

const translateCityName = (cityName) => {
  const normalized = normalizeArabicText(cityName);
  
  const englishKey = cityAliases[normalized];
  if (englishKey) {
    return `${englishKey},EG`;
  }
  
  return cityName;
};

export const weatherApi = {
  async getWeatherByCoords(lat, lon) {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather by coords:', error);
      throw error;
    }
  },

  async getWeatherByCity(city) {
    try {
      const translatedCity = translateCityName(city);
      
      const response = await fetch(
        `${BASE_URL}/weather?q=${translatedCity}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (data.cod !== 200) {
        throw new Error('City not found');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw error;
    }
  },

  async getForecastByCity(city) {
    try {
      const translatedCity = translateCityName(city);
      
      const response = await fetch(
        `${BASE_URL}/forecast?q=${translatedCity}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (data.cod !== "200") {
        throw new Error('Forecast not found');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching forecast by city:', error);
      throw error;
    }
  },

  async getForecastByCoords(lat, lon) {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  formatWeatherData(data) {
    return {
      city: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), 
      precipitation: data.rain ? data.rain['1h'] || 0 : 0,
      description: data.weather[0].description,
      icon: data.weather[0].main
    };
  }
};

export default weatherApi;