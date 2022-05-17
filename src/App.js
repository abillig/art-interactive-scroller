// import logo from './logo.svg';
import './App.scss';
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
    const apiImagesPlusSplashScreen = apiImages.length;
    const percentageOfPageScrolledTo = window.scrollY / (window.innerHeight * (apiImagesPlusSplashScreen));
    const desiredIndex = Math.round(apiImagesPlusSplashScreen * percentageOfPageScrolledTo);
    
    console.log({percentageOfPageScrolledTo})
      console.log({desiredIndex})
      console.log({pageV: window.innerHeight})
      console.log({apiImages})
    if (desiredIndex > 1 && desiredIndex !== apiImages.indexOf(featuredImage)) {
      setDisplaySplashScreen(false)
    } else if (desiredIndex <= 1) {
      setDisplaySplashScreen(true)
    }
    setFeaturedImage(apiImages[desiredIndex]) 
  }

  useEffect(() => {
    //TO DO api service 
    fetch('http://localhost:3005/artwork')
      .then(result => result.json())
      .then(json => {
        const artworkInfo = json.info[0]
        setApiImages([artworkInfo, artworkInfo, ...json.images.images])
        setArtworkInfo(artworkInfo)
        setFeaturedImage(artworkInfo)
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
      {/* <SplashScreen artworkInfo={artworkInfo} style/> */}
        <div className="scroller">
          <ScrollerStuff apiImages={apiImages} featuredImage={featuredImage} displaySplashScreen={displaySplashScreen}/>
        </div>
      </div>
    </>
  );
}

export default App