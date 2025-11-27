
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useWeather } from '../context/WeatherContext';
import WeatherIcon from './WeatherIcon';
import { toArabicNumbers } from '../i18n/config.js';
import countries from "../utils/countries.jsx";
import cityList from "../utils/citiesList";

function MainWeatherCard() {
  const { t, i18n } = useTranslation();
  const { weatherData } = useWeather();
  const { colors, unit } = useTheme();
  
  if (!weatherData) return null;

  const getCountryName = () => {
    const countryCode = weatherData.country;
    const lang = i18n.language === "ar" ? "ar" : "en";
    return countries[countryCode]?.[lang] || countryCode;
  };

  const getCityName = () => {
    const cityName = weatherData.city;
    const lang = i18n.language === "ar" ? "ar" : "en";
    
    const cityData = cityList[cityName];
    
    if (cityData) {
      return cityData[lang];
    }
    
    return cityName;
  };

  const getCurrentDate = () => {
    const date = new Date();
    const dayIndex = date.getDay();
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    
    const dayName = t(`days.${days[dayIndex]}`);
    const monthName = t(`monthsShort.${months[monthIndex].substring(0, 3)}`);
    
    if (i18n.language === 'ar') {
      return `${dayName}، ${toArabicNumbers(day)} ${monthName} ${toArabicNumbers(year)}`;
    } else {
      return `${dayName}, ${monthName} ${day}, ${year}`;
    }
  };

  const convertTemp = (tempC) => {
    if (unit === 'fahrenheit') {
      return Math.round((tempC * 9) / 5 + 32);
    }
    return tempC;
  };

  const getTemperature = () => {
    const temp = convertTemp(weatherData.temp);
    return i18n.language === 'ar' ? toArabicNumbers(temp) : temp;
  };

  const getWeatherDescription = () => {
    const description = weatherData.description.toLowerCase();
    const translationKey = `weather.${description}`;
    const translated = t(translationKey);
    
    if (translated === translationKey) {
      const firstWord = description.split(' ')[0];
      const firstWordTranslated = t(`weather.${firstWord}`);
      if (firstWordTranslated !== `weather.${firstWord}`) {
        return firstWordTranslated.charAt(0).toUpperCase() + firstWordTranslated.slice(1);
      }
      return description.charAt(0).toUpperCase() + description.slice(1);
    }
    
    return translated.charAt(0).toUpperCase() + translated.slice(1);
  };

  return (
    <div
      style={{
        background: colors.gradient,
        borderRadius: '24px',
        padding: '32px',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '240px'
      }}
    >
      {/* Decorative dots */}
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '32px', 
        width: '8px', 
        height: '8px', 
        borderRadius: '50%', 
        background: '#FFA500' 
      }}></div>
      <div style={{ 
        position: 'absolute', 
        bottom: '64px', 
        left: '96px', 
        width: '6px', 
        height: '6px', 
        borderRadius: '50%', 
        background: 'rgba(255,255,255,0.4)' 
      }}></div>
      <div style={{ 
        position: 'absolute', 
        bottom: '96px', 
        right: '144px', 
        width: '10px', 
        height: '10px', 
        borderRadius: '50%', 
        background: '#FFA500' 
      }}></div>

      <h2
        style={{
          fontSize: '36px',
          fontWeight: 600,
          color: 'white',
          marginBottom: '4px'
        }}
      >
        {getCityName()}, {getCountryName()}
      </h2>

      <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
        {getCurrentDate()}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <WeatherIcon type={weatherData.icon} size={60} />
        <div style={{ fontSize: '144px', fontWeight: 300, color: 'white', lineHeight: 1 }}>
          {getTemperature()}°
        </div>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginTop: '12px' }}>
        {getWeatherDescription()}
      </p>
    </div>
  );
}

export default MainWeatherCard;