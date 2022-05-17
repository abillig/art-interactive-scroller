import './App.css';
import React from 'react';

const SplashScreen = props => {
  const { artworkInfo } = props

  return (
    <div className="splashScreen">
        <h1>{artworkInfo["description"]}</h1>
      <img className="splashScreenImage" src={artworkInfo && artworkInfo["url"]}></img>
    </div>
  );
}

export default SplashScreen;