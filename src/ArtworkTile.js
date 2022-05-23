import "./App.scss";
import React from "react";
import { Link } from "react-router-dom";

const ArtworkTile = (props) => {
  const { artworkId, url, title } = props;

  const tileStyle = {
    backgroundImage: `url(http://localhost:8080${props.url})`,
  };

  return (
    <Link to={`/artwork/${artworkId}`}>
      <div className="tile" style={tileStyle}>
        <div className="tileTitle">{title}</div>
      </div>
    </Link>
  );
};

export default ArtworkTile;
