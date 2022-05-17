import './App.scss';
import React from 'react';

const Header = props => {
  const { artworkInfo, displaySplashScreen } = props

  const headerStyles = {
      background: displaySplashScreen ? "none" : "#1c1b1b",
      boxShadow: displaySplashScreen ? 'none' : 'none',
      color: displaySplashScreen ? "#1c1b1b" : "#efe6e1"
  }

  return (
    !displaySplashScreen && <div className="header" style={headerStyles}>{artworkInfo.description}</div>
  )
}

export default Header