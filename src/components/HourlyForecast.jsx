
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useWeather } from '../context/WeatherContext';
import WeatherIcon from './WeatherIcon';
import { toArabicNumbers } from '../i18n/config.js';

function HourlyForecast() {
  const { t, i18n } = useTranslation();
  const { colors, unit } = useTheme();
  const { forecastData } = useWeather();

  if (!forecastData?.list) return null;

  const hours = forecastData.list.slice(0, 8);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hoursVal = date.getHours();
    const minutes = date.getMinutes();
    const hour12 = hoursVal % 12 || 12;
    const period = hoursVal >= 12 ? t('pm') : t('am');
    
    if (i18n.language === 'ar') {
      return `${toArabicNumbers(hour12)}:${toArabicNumbers(minutes.toString().padStart(2, '0'))} ${period}`;
    } else {
      return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
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
    <div style={{
      background: colors.cardBg,
      backdropFilter: 'blur(10px)',
      border: `1px solid ${colors.cardBorder}`,
      borderRadius: '16px',
      padding: '24px'
    }}>
      <h3 style={{ fontSize: '20px', fontWeight: 600, color: colors.text, margin: 0, marginBottom: '24px' }}>
        {t('hourlyForecast')}
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {hours.map((hour, idx) => (
          <div key={idx} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: colors.itemBg,
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <WeatherIcon type={hour.weather?.[0]?.main} size={32} />
              <span style={{ color: colors.text, fontWeight: 500 }}>
                {formatTime(hour.dt)}
              </span>
            </div>
            <span style={{ fontSize: '20px', fontWeight: 600, color: colors.text }}>
              {formatTemperature(hour.main?.temp)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
