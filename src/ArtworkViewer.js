import "./App.scss";
import React, { useState, useEffect } from "react";
import ScrollerStuff from "./ScrollerStuff";
import Header from "./Header";
import SplashScreen from "./SplashScreen";
import { FaHome } from "react-icons/fa";
import { Outlet, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ArtworkViewer() {
  const [featuredImage, setFeaturedImage] = useState(null);
  const [apiImages, setApiImages] = useState([]);
  const [artworkInfo, setArtworkInfo] = useState({});
  const [displaySplashScreen, setDisplaySplashScreen] = useState(true);
  let params = useParams();

  const handleScroll = () => {
    const percentageOfPageScrolledTo =
      window.scrollY / (window.innerHeight * apiImages.length);
    const desiredIndex = Math.round(
      apiImages.length * percentageOfPageScrolledTo
    );

    if (desiredIndex > 1 && desiredIndex !== apiImages.indexOf(featuredImage)) {
      setDisplaySplashScreen(false);
    } else if (desiredIndex <= 1) {
      setDisplaySplashScreen(true);
    }
    setFeaturedImage(apiImages[desiredIndex]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    //TO DO api service
    fetch(`http://localhost:8080/artwork/${params.artworkId}`)
      .then((result) => result.json())
      .then((json) => {
        const artworkInfo = json.info[0];
        let imgGroup = [artworkInfo, artworkInfo, ...json.images.images];

        imgGroup.forEach((imgObject) => {
          let img = new Image();
          img.src = `http://localhost:8080${imgObject.url}`;
        });
        setApiImages(imgGroup);
        setArtworkInfo(artworkInfo);
        setFeaturedImage(artworkInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [apiImages, handleScroll]);

  const favIconColor = displaySplashScreen ? "#1c1b1b" : "#efe6e1";

  return (
    <div className="artworkViewer">
      <Link to={`/`}>
        <FaHome
          className="homeIcon"
          style={{ color: `${favIconColor}` }}
        ></FaHome>
      </Link>
      <Header
        artworkInfo={artworkInfo}
        displaySplashScreen={displaySplashScreen}
      />
      <div className="pageContent">
        <div className="scroller">
          <ScrollerStuff
            apiImages={apiImages}
            featuredImage={featuredImage}
            displaySplashScreen={displaySplashScreen}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default ArtworkViewer;
