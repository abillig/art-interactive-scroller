import './App.css';
import React from 'react';

const Header = props => {
  const { artworkInfo, displaySplashScreen } = props

  const headerStyles = {
      backgroundColor: displaySplashScreen ? "#efe6e1" : "#1c1b1b",
      boxShadow: displaySplashScreen ? '0 2px 5px -2px #e0dad6' : 'none',
      color: displaySplashScreen ? "#1c1b1b" : "#efe6e1"
  }

  return (
    !displaySplashScreen && <div className="header" style={headerStyles}>{artworkInfo.description}</div>
  )
}

export default Header