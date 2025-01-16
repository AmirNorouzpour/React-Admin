import React from "react";
import "./user-profile.css";

const UserProfile: React.FC = () => {
  return (
    <div className="item-dropdown">
      <ul>
        <li>Setting</li>
        <li>Help</li>
        <li>Log out</li>
      </ul>
    </div>
  );
};

export default UserProfile;
