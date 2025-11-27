

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      // Header
      appName: 'الطقس الآن',
      language: 'English',
      celsius: 'سلزيوس',
      fahrenheit: 'فهرنهايت',
      
      // Main Title
      mainTitle: "كيف تبدو السماء اليوم؟",
      
      // Search
      searchPlaceholder: 'ابحث عن مكان...',
      searchButton: 'بحث',
      loading: 'جاري التحميل...',
      cityNotFound: 'المدينة غير موجودة. حاول مرة أخرى.',
      
      // Weather Card
      welcome: 'مرحباً',
      allowLocationOrSearch: 'اسمح بالموقع أو ابحث عن مدينة',
      loadingWeather: 'جاري تحميل بيانات الطقس...',
      
      // Weather Details
      feelsLike: 'الإحساس',
      humidity: 'الرطوبة',
      wind: 'الرياح',
      precipitation: 'الأمطار',
      
      // Units
      kmh: 'كم/س',
      mm: 'ملم',
      percent: '٪',
      
      // Weather Descriptions
      weather: {
        clear: 'صافي',
        clouds: 'غائم',
        rain: 'ممطر',
        drizzle: 'رذاذ',
        thunderstorm: 'عاصفة رعدية',
        snow: 'ثلجي',
        mist: 'ضبابي',
        fog: 'ضباب',
        haze: 'ضبابي خفيف',
        'clear sky': 'سماء صافية',
        'few clouds': 'غيوم قليلة',
        'scattered clouds': 'غيوم متفرقة',
        'broken clouds': 'غيوم متقطعة',
        'overcast clouds': 'غيوم كثيفة',
        'light rain': 'أمطار خفيفة',
        'moderate rain': 'أمطار معتدلة',
        'heavy rain': 'أمطار غزيرة',
        'light snow': 'ثلوج خفيفة',
        'heavy snow': 'ثلوج كثيفة'
      },
      
      // Forecast
      dailyForecast: 'التوقعات اليومية',
      hourlyForecast: 'التوقعات بالساعة',
      
      // Days
      days: {
        sunday: 'الأحد',
        monday: 'الإثنين',
        tuesday: 'الثلاثاء',
        wednesday: 'الأربعاء',
        thursday: 'الخميس',
        friday: 'الجمعة',
        saturday: 'السبت'
      },
      
      // Days Short
      daysShort: {
        sun: 'الأحد',
        mon: 'الإثنين',
        tue: 'الثلاثاء',
        wed: 'الأربعاء',
        thu: 'الخميس',
        fri: 'الجمعة',
        sat: 'السبت'
      },
      
      // Months
      months: {
        january: 'يناير',
        february: 'فبراير',
        march: 'مارس',
        april: 'أبريل',
        may: 'مايو',
        june: 'يونيو',
        july: 'يوليو',
        august: 'أغسطس',
        september: 'سبتمبر',
        october: 'أكتوبر',
        november: 'نوفمبر',
        december: 'ديسمبر'
      },
      
      // Months Short
      monthsShort: {
        jan: 'يناير',
        feb: 'فبراير',
        mar: 'مارس',
        apr: 'أبريل',
        may: 'مايو',
        jun: 'يونيو',
        jul: 'يوليو',
        aug: 'أغسطس',
        sep: 'سبتمبر',
        oct: 'أكتوبر',
        nov: 'نوفمبر',
        dec: 'ديسمبر'
      },
      
      // Location Dialog
      locationTitle: 'هل تسمح لـ weather-app بالوصول إلى موقعك الجغرافي؟',
      locationDescription: 'سيتمكن weather-app من الوصول إلى موقعك عندما يكون هذا الموقع الإلكتروني مفتوحاً.',
      allow: 'السماح',
      deny: 'عدم السماح',
      
      // Time
      am: 'ص',
      pm: 'م'
    }
  },
  
  en: {
    translation: {
      // Header
      appName: 'Weather Now',
      language: 'العربية',
      celsius: 'Celsius',
      fahrenheit: 'Fahrenheit',
      
      // Main Title
      mainTitle: "How's the sky looking today?",
      
      // Search
      searchPlaceholder: 'Search for a place...',
      searchButton: 'Search',
      loading: 'Loading...',
      cityNotFound: 'City not found. Please try again.',
      
      // Weather Card
      welcome: 'Welcome',
      allowLocationOrSearch: 'Allow location or search for a city',
      loadingWeather: 'Loading weather data...',
      
      // Weather Details
      feelsLike: 'Feels Like',
      humidity: 'Humidity',
      wind: 'Wind',
      precipitation: 'Precipitation',
      
      // Units
      kmh: 'km/h',
      mm: 'mm',
      percent: '%',
      
      // Weather Descriptions
      weather: {
        clear: 'Clear',
        clouds: 'Clouds',
        rain: 'Rain',
        drizzle: 'Drizzle',
        thunderstorm: 'Thunderstorm',
        snow: 'Snow',
        mist: 'Mist',
        fog: 'Fog',
        haze: 'Haze',
        'clear sky': 'Clear sky',
        'few clouds': 'Few clouds',
        'scattered clouds': 'Scattered clouds',
        'broken clouds': 'Broken clouds',
        'overcast clouds': 'Overcast clouds',
        'light rain': 'Light rain',
        'moderate rain': 'Moderate rain',
        'heavy rain': 'Heavy rain',
        'light snow': 'Light snow',
        'heavy snow': 'Heavy snow'
      },
      
      // Forecast
      dailyForecast: 'Daily forecast',
      hourlyForecast: 'Hourly forecast',
      
      // Days
      days: {
        sunday: 'Sunday',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday'
      },
      
      // Days Short
      daysShort: {
        sun: 'Sun',
        mon: 'Mon',
        tue: 'Tue',
        wed: 'Wed',
        thu: 'Thu',
        fri: 'Fri',
        sat: 'Sat'
      },
      
      // Months
      months: {
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December'
      },
      
      // Months Short
      monthsShort: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Oct',
        nov: 'Nov',
        dec: 'Dec'
      },
      
      // Location Dialog
      locationTitle: 'Allow weather-app to access your location?',
      locationDescription: 'weather-app will be able to access your location when this website is open.',
      allow: 'Allow',
      deny: 'Block',
      
      // Time
      am: 'AM',
      pm: 'PM'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

// Helper function to convert numbers to Arabic
export const toArabicNumbers = (num) => {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/\d/g, (digit) => arabicNumbers[digit]);
};

export default i18n;