
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useWeather } from '../context/WeatherContext';
import { toArabicNumbers } from '../i18n/config.js';

function WeatherDetailsGrid() {
  const { t, i18n } = useTranslation();
  const { colors, unit } = useTheme();
  const { weatherData } = useWeather();
  
  if (!weatherData) return null;

  const formatNumber = (num) => {
    return i18n.language === 'ar' ? toArabicNumbers(num) : num;
  };

  const convertTemperature = (temp) => {
    if (!weatherData) return temp;
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
  };

  const details = [
    { label: t('feelsLike'), value: `${formatNumber(convertTemperature(weatherData.feelsLike))}°` },
    { label: t('humidity'), value: `${formatNumber(weatherData.humidity)}${t('percent')}` },
    { label: t('wind'), value: `${formatNumber(weatherData.windSpeed)} ${t('kmh')}` },
    { label: t('precipitation'), value: `${formatNumber(weatherData.precipitation)} ${t('mm')}` }
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
      gap: '16px', 
      marginBottom: '24px' 
    }}>
      {details.map((detail, i) => (
        <div 
          key={i} 
          style={{
            background: colors.cardBg,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: '16px',
            padding: '16px'
          }}
        >
          <p style={{ 
            color: colors.textSecondary, 
            fontSize: '14px', 
            marginBottom: '8px',
            margin: 0,
          }}>
            {detail.label}
          </p>
          <h3 style={{ 
            fontSize: '28px', 
            fontWeight: 600, 
            color: colors.text, 
            margin: 0 
          }}>
            {detail.value}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default WeatherDetailsGrid;
