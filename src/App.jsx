
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { WeatherProvider } from './context/WeatherContext';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MainWeatherCard from './components/MainWeatherCard';
import WeatherDetailsGrid from './components/WeatherDetailsGrid';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import LocationDialog from './components/LocationDialog';

function AppContent() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.background,
        padding: '32px 16px',
        transition: 'background 0.3s ease'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <Header />

        <h2
          style={{
            textAlign: "center",
            marginBottom: '22px',
            color: colors.text,
            fontSize: "38px",
            transition: 'color 0.3s ease'
          }}
        >
          {t('mainTitle')}
        </h2>

        <SearchBar />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}
          >
            {/* Main Content - Takes 2 columns on large screens */}
            <div style={{ gridColumn: window.innerWidth >= 1024 ? 'span 2' : 'span 1' }}>
              <MainWeatherCard />
              <WeatherDetailsGrid />
              <DailyForecast />
            </div>

            {/* Sidebar - Takes 1 column */}
            <div>
              <HourlyForecast />
            </div>
          </div>
        </div>
      </div>

      <LocationDialog />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <AppContent />
      </WeatherProvider>
    </ThemeProvider>
  );
}

