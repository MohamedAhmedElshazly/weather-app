import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';

function LocationDialog() {
  const { t } = useTranslation();
  const { showLocationDialog, getCurrentLocation, denyLocation } = useWeather();
  const { colors, darkMode } = useTheme();

  if (!showLocationDialog) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      denyLocation();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
        animation: 'fadeIn 0.225s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: darkMode ? '#1e1e1e' : '#ffffff',
          borderRadius: '4px',
          padding: 0,
          maxWidth: '444px',
          width: '90%',
          boxShadow: darkMode 
            ? '0px 11px 15px -7px rgba(0,0,0,0.4), 0px 24px 38px 3px rgba(0,0,0,0.28), 0px 9px 46px 8px rgba(0,0,0,0.24)'
            : '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
          animation: 'slideUp 0.225s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden'
        }}
      >
        {/* Dialog Content */}
        <div style={{ padding: '24px 24px 20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: darkMode ? 'rgba(99, 102, 241, 0.16)' : 'rgba(99, 102, 241, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
              flexShrink: 0
            }}>
              <MapPin size={24} color={colors.buttonBg} />
            </div>
            
            <div style={{ flex: 1 }}>
              <h2 style={{
                color: darkMode ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)',
                fontSize: '20px',
                fontWeight: 500,
                margin: 0,
                marginBottom: '8px',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                lineHeight: '1.6',
                letterSpacing: '0.0075em'
              }}>
                {t('locationTitle')}
              </h2>
              
              <p style={{
                color: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                fontSize: '14px',
                lineHeight: '1.43',
                margin: 0,
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                letterSpacing: '0.01071em'
              }}>
                {t('locationDescription')}
              </p>
            </div>
          </div>
        </div>

        {/* Dialog Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '8px',
          gap: '8px'
        }}>
          <button
            onClick={denyLocation}
            style={{
              padding: '6px 16px',
              background: 'transparent',
              color: colors.buttonBg,
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.02857em',
              minWidth: '64px',
              transition: 'background 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => {
              e.target.style.background = darkMode 
                ? 'rgba(99, 102, 241, 0.08)' 
                : 'rgba(99, 102, 241, 0.04)';
            }}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >
            {t('deny')}
          </button>

          <button
            onClick={getCurrentLocation}
            style={{
              padding: '6px 16px',
              background: 'transparent',
              color: colors.buttonBg,
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.02857em',
              minWidth: '64px',
              transition: 'background 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => {
              e.target.style.background = darkMode 
                ? 'rgba(99, 102, 241, 0.08)' 
                : 'rgba(99, 102, 241, 0.04)';
            }}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >
            {t('allow')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocationDialog;