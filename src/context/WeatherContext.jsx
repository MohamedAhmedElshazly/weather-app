
import { createContext, useContext, useState, useEffect } from 'react';
import { weatherApi } from '../services/weatherApi';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [unit, setUnit] = useState('celsius');

  useEffect(() => {
    // نشوف لو في موقع محفوظ من الجيولوكيشن
    const lastLocation = localStorage.getItem('lastLocation');
    
    if (lastLocation) {
      // لو دخل قبل كده وسمح بالموقع → نعرض آخر موقع من الجيولوكيشن
      const { lat, lon } = JSON.parse(lastLocation);
      getWeatherByCoords(lat, lon);
    } else {
      // أول مرة → نعرض مربع السماح بالموقع
      setShowLocationDialog(true);
    }
  }, []);

  const toggleUnit = (value) => {
    setUnit(value);
  };

  // دالة مساعدة للحصول على الطقس بالإحداثيات
  const getWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const weatherResponse = await weatherApi.getWeatherByCoords(lat, lon);
      const formattedWeather = weatherApi.formatWeatherData(weatherResponse);
      setWeatherData(formattedWeather);
      
      const forecastResponse = await weatherApi.getForecastByCoords(lat, lon);
      setForecastData(forecastResponse);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error(err);
      // لو فشل → نعرض القاهرة
      searchCity('Cairo');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      
      // لو الجيولوكيشن مش مدعوم → نرجع آخر موقع أو القاهرة
      const lastLocation = localStorage.getItem('lastLocation');
      if (lastLocation) {
        const { lat, lon } = JSON.parse(lastLocation);
        getWeatherByCoords(lat, lon);
      } else {
        searchCity('Cairo');
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          const weatherResponse = await weatherApi.getWeatherByCoords(latitude, longitude);
          const formattedWeather = weatherApi.formatWeatherData(weatherResponse);
          setWeatherData(formattedWeather);
          
          const forecastResponse = await weatherApi.getForecastByCoords(latitude, longitude);
          setForecastData(forecastResponse);
          
          // ✅ نحفظ الإحداثيات بس (من الجيولوكيشن فقط)
          localStorage.setItem('lastLocation', JSON.stringify({
            lat: latitude,
            lon: longitude
          }));
          
          setShowLocationDialog(false);
        } catch (err) {
          setError('Failed to fetch weather data');
          console.error(err);
          
          // لو فشل → نرجع آخر موقع أو القاهرة
          const lastLocation = localStorage.getItem('lastLocation');
          if (lastLocation) {
            const { lat, lon } = JSON.parse(lastLocation);
            getWeatherByCoords(lat, lon);
          } else {
            searchCity('Cairo');
          }
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Location error:', err);
        setError('Unable to retrieve your location');
        setLoading(false);
        setShowLocationDialog(false);
        
        // ✅ لو رفض الموقع → نرجع آخر موقع من الجيولوكيشن أو القاهرة
        const lastLocation = localStorage.getItem('lastLocation');
        if (lastLocation) {
          const { lat, lon } = JSON.parse(lastLocation);
          getWeatherByCoords(lat, lon);
        } else {
          searchCity('Cairo');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const searchCity = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const weatherResponse = await weatherApi.getWeatherByCity(city);
      const formattedWeather = weatherApi.formatWeatherData(weatherResponse);
      setWeatherData(formattedWeather);

      const forecastResponse = await weatherApi.getForecastByCity(city);
      setForecastData(forecastResponse);
      
      // ❌ م نحفظ المدينة من البحث
      
      console.log('Weather Data:', formattedWeather);
      console.log('Forecast Data:', forecastResponse);

    } catch (err) {
      setError('City not found');
      console.error(err);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const denyLocation = () => {
    setShowLocationDialog(false);
    
    // ✅ لو رفض → نرجع آخر موقع من الجيولوكيشن أو القاهرة
    const lastLocation = localStorage.getItem('lastLocation');
    if (lastLocation) {
      const { lat, lon } = JSON.parse(lastLocation);
      getWeatherByCoords(lat, lon);
    } else {
      searchCity('Cairo');
    }
  };

  const value = {
    weatherData,
    forecastData,
    loading,
    error,
    showLocationDialog,
    unit,
    toggleUnit,
    getCurrentLocation,
    searchCity,
    denyLocation
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;