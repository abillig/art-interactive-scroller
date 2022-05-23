import "./ArtworkViewer.scss";
import React from "react";

const ImageTextScroller = (props) => {
  const { featuredImage, apiImages, displaySplashScreen } = props;

  console.log({ apiImages });

  const scrollerStyles = {
    height: `${window.innerHeight * apiImages.length}px`,
  };

  const imagesText = apiImages.map((image, idx) => {
    const leadImage = idx < 2;
    return (
      <div key={idx} className={`imagesText`}>
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
        src={
          featuredImage &&
          `${process.env.REACT_APP_API_URL}${featuredImage["url"]}`
        }
        alt="featured"
      ></img>
      <div className="scrollingPanel" style={scrollerStyles}>
        {imagesText}
      </div>
    </div>
  );
};

export default ImageTextScroller;
