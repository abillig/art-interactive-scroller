// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import ScrollerStuff from './ScrollerStuff';
import Header from './Header';
import SplashScreen from './SplashScreen';

function App() {
  const [featuredImage, setFeaturedImage] = useState(null);
  const [apiImages, setApiImages] = useState([])
  const [artworkInfo, setArtworkInfo] = useState({})
  const [displaySplashScreen, setDisplaySplashScreen] = useState(true)

  const handleScroll = () => {
    const splashScreenHeight = 2;
    const apiImagesPlusSplashScreen = apiImages.length + 2;
    const percentageOfPageScrolledTo = window.scrollY / (window.innerHeight * (apiImagesPlusSplashScreen));
    const desiredIndex = Math.round(apiImagesPlusSplashScreen * percentageOfPageScrolledTo);
    
    console.log({percentageOfPageScrolledTo})
      console.log({desiredIndex})
      console.log({pageV: window.innerHeight})
      console.log({apiImages})
    if (desiredIndex !== apiImages.indexOf(featuredImage)) {
      setDisplaySplashScreen(false)
      setFeaturedImage(apiImages[desiredIndex]) 
    }
  }

  useEffect(() => {
    //TO DO api service 
    fetch('http://localhost:3005/artwork')
      .then(result => result.json())
      .then(json => {
        const artworkInfo = json.info[0]
        setApiImages([...json.images.images])
        setArtworkInfo(artworkInfo)
      })
      .catch((err) => {
        console.log(err);   
      }); 
  }, [])

  useEffect(()=> {
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll) 
  }, [apiImages, handleScroll])

  return (
    <>
      <Header artworkInfo={artworkInfo} displaySplashScreen={displaySplashScreen}/>
      <div className="pageContent">
      {displaySplashScreen && <SplashScreen artworkInfo={artworkInfo} style/>}
        <div className="scroller" id="scroller">
          <ScrollerStuff apiImages={apiImages} featuredImage={featuredImage} />
        </div>
      </div>
    </>
  );
}

export default App