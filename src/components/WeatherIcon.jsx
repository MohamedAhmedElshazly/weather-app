

import { Sun, Cloud, CloudDrizzle, CloudRain, Zap, CloudFog, CloudSnow } from 'lucide-react';

function WeatherIcon({ type, size = 40 }) {
  const iconType = type?.toLowerCase() || 'clear';
  
  const icons = {
    clear: <Sun size={size} color="#FFA500" />,
    clouds: <Cloud size={size} color="#9CA3AF" />,
    drizzle: <CloudDrizzle size={size} color="#FBBF24" />,
    rain: <CloudRain size={size} color="#60A5FA" />,
    thunderstorm: <Zap size={size} color="#64748B" />,
    fog: <CloudFog size={size} color="#9CA3AF" />,
    mist: <CloudFog size={size} color="#9CA3AF" />,
    haze: <CloudFog size={size} color="#9CA3AF" />,
    snow: <CloudSnow size={size} color="#B0E0E6" />
  };

  return icons[iconType] || icons.clear;
}

export default WeatherIcon;