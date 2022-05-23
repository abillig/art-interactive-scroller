// import logo from './logo.svg';
import "./App.scss";
import React from "react";

const ScrollerStuff = (props) => {
  const { featuredImage, apiImages, displaySplashScreen } = props;

  const scrollerStyles = {
    height: `${window.innerHeight * apiImages.length}px`,
  };

  const imagesText = apiImages.map((image, idx) => {
    const leadImage = idx < 2;
    return (
      <div className={`imagesText`}>
        <h3 className="imageHeader">{leadImage ? "" : image["header"]}</h3>
        <div className="imageDescription">
          {leadImage ? "" : image["description"]}
        </div>
      </div>
    );
  });

  const splashScreen = displaySplashScreen ? "splash" : "";

  return (
    <div className={`scroller ${splashScreen}`}>
      {splashScreen && (
        <div className="splashHeader">
          {featuredImage && featuredImage.description}
        </div>
      )}
      <img
        className={splashScreen ? "" : "featuredImage"}
        src={featuredImage && `http://localhost:8080${featuredImage["url"]}`}
      ></img>
      <div className="scrollingPanel" style={scrollerStyles}>
        {imagesText}
      </div>
    </div>
  );
};

export default ScrollerStuff;
