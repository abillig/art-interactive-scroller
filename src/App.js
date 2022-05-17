// import logo from './logo.svg';
import './App.scss';
import React, { useState, useEffect } from 'react';
import ScrollerStuff from './ScrollerStuff';
import Header from './Header';
import SplashScreen from './SplashScreen';
import { FaHome } from 'react-icons/fa';


function App() {
  const [featuredImage, setFeaturedImage] = useState(null);
  const [apiImages, setApiImages] = useState([])
  const [artworkInfo, setArtworkInfo] = useState({})
  const [displaySplashScreen, setDisplaySplashScreen] = useState(true)

  const handleScroll = () => {
    const percentageOfPageScrolledTo = window.scrollY / (window.innerHeight * (apiImages.length));
    const desiredIndex = Math.round(apiImages.length * percentageOfPageScrolledTo);

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

  const favIconColor = displaySplashScreen ? "#1c1b1b" : "#efe6e1"
  
  return (
    <>
      <FaHome className="homeIcon" style={{color: `${favIconColor}`}}></FaHome>
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