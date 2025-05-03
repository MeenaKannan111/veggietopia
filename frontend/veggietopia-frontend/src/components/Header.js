<<<<<<< HEAD
import React from 'react';
import { useTranslation } from 'react-i18next';
//import i18n from './i18n';
import logo from '../assets/logo.png';

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header style={{ display: "flex", alignItems: "center", padding: "10px", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt={t("veggietopia") + " Logo"} style={{ height: "50px", marginRight: "10px" }} />
        <h1>{t("welcome")}</h1>
      </div>
      {/* <div>
        <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div> */}
    </header>
  );
};

export default Header;
=======
import logo from "../assets/logo.png";

const Header = () => {
    return (
        <header style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <img src={logo} alt="Veggietopia Logo" style={{ height: "50px", marginRight: "10px" }} />
            <h1>Welcome to Veggietopia</h1>
        </header>
    );
};

export default Header;
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
