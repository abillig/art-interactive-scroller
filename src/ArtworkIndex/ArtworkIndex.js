import "../App.scss";
import "./ArtworkIndex.scss";
import React, { useState, useEffect } from "react";

import ArtworkTile from "./ArtworkTile";
import Header from "../Shared/Header";

function ArtworkIndex() {
  const [artCollection, setArtCollection] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/artwork/all`)
      .then((result) => result.json())
      .then((json) => {
        setArtCollection(json["artworkCollection"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const artworkTiles =
    artCollection &&
    artCollection.map((artwork) => {
      const { artwork_id, url, title } = artwork;
      return (
        <ArtworkTile
          artworkId={artwork_id}
          url={url}
          title={title}
          key={artwork_id}
        />
      );
    });

  return (
    <>
      <Header
        title={"Art Interactive"}
        bringToFront={false}
        displayDescription
        colorScheme="light"
      />
      <div className="artworkIndex">{artworkTiles}</div>;
    </>
  );
}

export default ArtworkIndex;
