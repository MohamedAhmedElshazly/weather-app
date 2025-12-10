

import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(true);
  const [unit, setUnit] = useState('celsius'); 

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const theme = {
    darkMode,
    toggleTheme,
    language: i18n.language,
    toggleLanguage,
    isRTL: i18n.language === 'ar',
    unit,
    setUnit,
    colors: darkMode
      ? {
          background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
          cardBg: 'rgba(255,255,255,0.08)',
          cardBorder: 'rgba(255,255,255,0.1)',
          text: '#ffffff',
          textSecondary: 'rgba(255,255,255,0.6)',
          textTertiary: 'rgba(255,255,255,0.8)',
          inputBg: 'rgba(255,255,255,0.1)',
          inputPlaceholder: 'rgba(255,255,255,0.6)',
          buttonBg: '#6366f1',
          buttonHover: '#5558e3',
          menuBg: '#1e293b',
          menuHover: '#334155',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          hoverBg: 'rgba(255,255,255,0.1)',
          itemBg: 'rgba(255,255,255,0.05)',
        }
      : {
          background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd)',
          cardBg: 'rgba(255,255,255,0.9)',
          cardBorder: 'rgba(0,0,0,0.1)',
          text: '#1e293b',
          textSecondary: 'rgba(0,0,0,0.6)',
          textTertiary: 'rgba(0,0,0,0.7)',
          inputBg: 'rgba(255,255,255,0.8)',
          inputPlaceholder: 'rgba(0,0,0,0.4)',
          buttonBg: '#6366f1',
          buttonHover: '#5558e3',
          menuBg: '#ffffff',
          menuHover: '#f1f5f9',
          gradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
          hoverBg: 'rgba(0,0,0,0.05)',
          itemBg: 'rgba(0,0,0,0.03)',
        },
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
