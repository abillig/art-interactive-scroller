// import logo from './logo.svg';
import './App.scss';
import React, { useState, useEffect } from 'react';
import {
  Outlet, Link
} from "react-router-dom";

import ArtworkTile from './ArtworkTile';

function ArtworkIndex() {

    const [artCollection, setArtCollection] = useState([])


  useEffect(() => {
    //TO DO api service 
    fetch(`http://localhost:3005/artwork/all`)
      .then(result => result.json())
      .then(json => {
        setArtCollection(json["artworkCollection"])
      })
      .catch((err) => {
        console.log(err);   
      }); 
  }, [])

  const artworkTiles = artCollection && artCollection.map(artwork => {
      const {artwork_id, url, title} = artwork;
      return <ArtworkTile artworkId = {artwork_id} url={url} title={title} />
    }
)
  
  return (
    <div className="artworkIndex">
      {artworkTiles}
    </div>
  );
}

export default ArtworkIndex