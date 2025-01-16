import React from "react";
import "./langs.css";

const Langs: React.FC = () => {
  return (
    <div className="language-dropdown">
      <ul>
        <li>
          <img
            src="https://flagcdn.com/us.svg"
            alt="English"
            className="flag"
          />
          English
        </li>
        <li>
          <img
            src="https://flagcdn.com/es.svg"
            alt="Español"
            className="flag"
          />
          Español
        </li>
        <li>
          <img
            src="https://flagcdn.com/fr.svg"
            alt="Français"
            className="flag"
          />
          Français
        </li>
        <li>
          <img
            src="https://flagcdn.com/de.svg"
            alt="Deutsch"
            className="flag"
          />
          Deutsch
        </li>
        <li>
          <img src="https://flagcdn.com/cn.svg" alt="中国人" className="flag" />
          中国人
        </li>
        <li>
          <img
            src="https://flagcdn.com/it.svg"
            alt="Italiano"
            className="flag"
          />
          Italiano
        </li>
      </ul>
    </div>
  );
};

export default Langs;
