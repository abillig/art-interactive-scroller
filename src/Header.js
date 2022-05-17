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
    <div className="header" style={headerStyles}>
        {!displaySplashScreen && <div className="description">{artworkInfo.description}</div>}
    </div>
  )
}

export default Header