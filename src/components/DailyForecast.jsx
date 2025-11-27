

import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useWeather } from '../context/WeatherContext';
import WeatherIcon from './WeatherIcon';
import { toArabicNumbers } from '../i18n/config.js';

function DailyForecast() {
  const { t, i18n } = useTranslation();
  const { colors, unit } = useTheme();
  const { forecastData } = useWeather();

  if (!forecastData || !forecastData.list) return null;

  const dailyData = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 7);

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const dayIndex = date.getDay();
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return t(`daysShort.${days[dayIndex]}`);
  };

  const convertTemperature = (temp) => {
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
  };

  const formatTemperature = (temp) => {
    const rounded = convertTemperature(temp);
    return i18n.language === 'ar' ? toArabicNumbers(rounded) : rounded;
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 600, color: colors.text, marginBottom: '16px' }}>
        {t('dailyForecast')}
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
        {dailyData.map((day, idx) => (
          <div key={idx} style={{
            background: colors.cardBg,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: '16px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <p style={{ color: colors.textTertiary, fontSize: '14px', marginBottom: '12px', margin: 0 }}>
              {getDayName(day.dt)}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <WeatherIcon type={day.weather[0].main} size={36} />
            </div>
            
            <p style={{ color: colors.text, fontWeight: 500, margin: 0 }}>
              {formatTemperature(day.main.temp)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyForecast;
