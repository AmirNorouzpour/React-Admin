import React from "react";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div
        style={{ paddingLeft: "10px", fontSize: "12px", lineHeight: "25px" }}
      >
        Version 1.0.0
      </div>
    </div>
  );
};

export default Footer;
