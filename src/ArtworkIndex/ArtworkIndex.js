import "../App.scss";
import "./ArtworkIndex.scss";
import React, { useState, useEffect } from "react";

import ArtworkTile from "./ArtworkTile";

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
      const { artwork_id, title } = artwork;
      return (
        <ArtworkTile artworkId={artwork_id} title={title} key={artwork_id} />
      );
    });

  return <div className="artworkIndex">{artworkTiles}</div>;
}

export default ArtworkIndex;
