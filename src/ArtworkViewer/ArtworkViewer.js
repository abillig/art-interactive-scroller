import "./ArtworkViewer.scss";
import React, { useState, useEffect } from "react";
import ImageTextScroller from "./ImageTextScroller";
import Header from "../Shared/Header";
import { FaHome } from "react-icons/fa";
import { Outlet, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ArtworkViewer() {
  const [featuredImage, setFeaturedImage] = useState(null);
  const [apiImages, setApiImages] = useState([]);
  const [artworkInfo, setArtworkInfo] = useState({});
  const [displaySplashScreen, setDisplaySplashScreen] = useState(true);
  let params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${process.env.REACT_APP_API_URL}/artwork/${params.artworkId}`)
      .then((result) => result.json())
      .then((json) => {
        const artworkInfo = json.info[0];
        // lead image is displayed to start as part of splash screen
        let imgGroup = [artworkInfo, artworkInfo, ...json.images.images];

        // cache images for faster load
        imgGroup.forEach((imgObject) => {
          let img = new Image();
          img.src = `${process.env.REACT_APP_API_URL}${imgObject.url}`;
        });
        setApiImages(imgGroup);
        setArtworkInfo(artworkInfo);
        setFeaturedImage(artworkInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [featuredImage, params]);

  useEffect(() => {
    const handleScroll = () => {
      const percentageOfPageScrolledTo =
        window.scrollY / (window.innerHeight * apiImages.length);
      const desiredIndex = Math.round(
        apiImages.length * percentageOfPageScrolledTo
      );

      if (
        desiredIndex > 1 &&
        desiredIndex !== apiImages.indexOf(featuredImage)
      ) {
        setDisplaySplashScreen(false);
      } else if (desiredIndex <= 1) {
        setDisplaySplashScreen(true);
      }
      setFeaturedImage(apiImages[desiredIndex]);
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [featuredImage, apiImages]);

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
          <ImageTextScroller
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
