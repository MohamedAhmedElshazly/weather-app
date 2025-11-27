
import { useState } from 'react';
import { Sun, Moon, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useTranslation();
  const { darkMode, toggleTheme, toggleLanguage, colors, isRTL, unit, setUnit } = useTheme();

  const handleUnitClick = (selectedUnit) => {
    setUnit(selectedUnit);
    setShowMenu(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Sun size={40} color="#FFA500" />
        <h1 style={{ fontSize: '24px', fontWeight: 600, color: colors.text, margin: 0 }}>
          {t('appName')}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
        <button
          onClick={toggleLanguage}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'transparent',
            border: `1px solid ${colors.cardBorder}`,
            color: colors.text,
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            textTransform: 'none'
          }}
          onMouseEnter={e => e.target.style.background = colors.hoverBg}
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          {t('language')}
        </button>

        <button
          onClick={toggleTheme}
          style={{
            padding: '8px',
            borderRadius: '8px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={e => e.target.style.background = colors.hoverBg}
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          {darkMode ? <Sun size={24} color={colors.text} /> : <Moon size={24} color={colors.text} />}
        </button>

        <button
          onClick={() => setShowMenu(!showMenu)}
          style={{
            padding: '8px',
            borderRadius: '8px',
            background: showMenu ? colors.hoverBg : 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={e => !showMenu && (e.target.style.background = colors.hoverBg)}
          onMouseLeave={e => !showMenu && (e.target.style.background = 'transparent')}
        >
          <Settings size={24} color={colors.text} />
        </button>

        {showMenu && (
          <div style={{
            position: 'absolute',
            right: isRTL ? 'auto' : 0,
            left: isRTL ? 0 : 'auto',
            top: '50px',
            background: colors.menuBg,
            borderRadius: '8px',
            boxShadow: darkMode ? '0 10px 25px rgba(0,0,0,0.5)' : '0 10px 25px rgba(0,0,0,0.15)',
            padding: '8px 0',
            width: '160px',
            zIndex: 10,
            border: `1px solid ${colors.cardBorder}`
          }}>
            {[t('celsius'), t('fahrenheit')].map((unitLabel, index) => (
              <button
                key={index}
                onClick={() => handleUnitClick(index === 0 ? 'celsius' : 'fahrenheit')}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  textAlign: isRTL ? 'right' : 'left',
                  color: colors.text,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseEnter={e => e.target.style.background = colors.menuHover}
                onMouseLeave={e => e.target.style.background = 'transparent'}
              >
                {unitLabel}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
