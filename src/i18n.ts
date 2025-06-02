// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// i18n.on('languageChanged', (lng) => {
//     document.dir = i18n.dir(lng);
//     document.documentElement.lang = lng;
// })
// Import your translations
import enTranslations from '../public/locales/en/translation.json';
import arTranslations from '../public/locales/ar/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ar: {
        translation: arTranslations,
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;
