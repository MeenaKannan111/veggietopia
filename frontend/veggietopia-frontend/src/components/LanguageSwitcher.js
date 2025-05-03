import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <select onChange={(e) => handleLanguageChange(e.target.value)} defaultValue={i18n.language}>
      <option value="en">English</option>
      <option value="ta">தமிழ்</option>
    </select>
  );
};