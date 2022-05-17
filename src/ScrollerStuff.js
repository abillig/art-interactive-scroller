// import logo from './logo.svg';
import './App.css';
import React from 'react';

const ScrollerStuff = props => {
    const {featuredImage, apiImages} = props

  const scrollerStyles = {
    height: `${window.innerHeight * (apiImages.length + 2)}px`
  }

  const imagesText = apiImages.map(image => {
    return (
        <div className="imagesText">
            <h3 className="imageHeader">{image["header"]}</h3>
             <div className="imageDescription">{image["description"]}</div>
        </div>
    )
  })

  return (
    <div className="scroller">
      <img className="featuredImage" src={featuredImage && featuredImage["url"]}></img>
      <div className="scrollingPanel" style={scrollerStyles}>
        {imagesText}
      </div>
    </div>
  );
}

export default ScrollerStuff