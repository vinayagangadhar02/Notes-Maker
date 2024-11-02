import React from 'react';
import Light from "../../assets/sun.svg";
import Dark from "../../assets/night.svg";

const DarkLightMode = ({ isLight,toggleTheme }) => {
  return (
    <div>
     <img 
      src={isLight ? Light : Dark} 
      alt={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"} 
      onClick={toggleTheme} 
      style={{ cursor: 'pointer', width: '40px', height: '40px' }} 
    />
    </div>
  );
};

export default DarkLightMode;
