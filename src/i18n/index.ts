import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'about': 'About',
      'blog': 'Blog',
      'works': 'Works',
      'machine_repeats': 'MACHINE REPEATS',
      'human_creates': 'HUMAN CREATES',
    },
  },
  zh: {
    translation: {
      'about': '关于我',
      'blog': '博客',
      'works': '作品',
      'machine_repeats': 'MACHINE REPEATS',
      'human_creates': 'HUMAN CREATES',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.startsWith('zh') ? 'zh' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
