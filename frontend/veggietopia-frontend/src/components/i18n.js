import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../translations/en.json';
import taTranslation from '../translations/ta.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ta: {
        translation: taTranslation,
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
