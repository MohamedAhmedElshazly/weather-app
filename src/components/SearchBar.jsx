

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useWeather } from '../context/WeatherContext';

function SearchBar() {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { searchCity, loading, error } = useWeather();

  const handleSearch = (e) => {
    e.preventDefault();
    if (value.trim()) {
      searchCity(value.trim());
      setValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <form
        onSubmit={handleSearch}
        style={{ display: 'flex', gap: '12px', marginBottom: error ? '16px' : '0' }}
      >
        <div style={{ flex: 1, position: 'relative' }}>
          <Search
            size={20}
            color={colors.inputPlaceholder}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              transition: 'color 0.2s'
            }}
          />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            style={{
              width: '100%',
              paddingLeft: '48px',
              paddingRight: '16px',
              paddingTop: '12px',
              paddingBottom: '12px',
              background: colors.inputBg,
              borderRadius: '8px',
              border: isFocused
                ? `2px solid ${colors.buttonBg}`
                : `1px solid ${colors.cardBorder}`,
              color: colors.text,
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow: isFocused
                ? `0 0 0 3px ${colors.buttonBg}33`
                : 'none',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'text'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 32px',
            background: loading ? colors.textSecondary : colors.buttonBg,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
            opacity: loading ? 0.6 : 1
          }}
          onMouseEnter={(e) => !loading && (e.target.style.background = colors.buttonHover)}
          onMouseLeave={(e) => !loading && (e.target.style.background = colors.buttonBg)}
        >
          {loading ? t('loading') : t('searchButton')}
        </button>
      </form>

      {/* رسالة الخطأ */}
      {error && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          color: '#ef4444',
          fontSize: '14px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 10C7.44772 10 7 9.55228 7 9V5C7 4.44772 7.44772 4 8 4C8.55228 4 9 4.44772 9 5V9C9 9.55228 8.55228 10 8 10ZM9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z" 
              fill="currentColor"
            />
          </svg>
          {t('cityNotFound')}
        </div>
      )}
    </div>
  );
}

export default SearchBar;