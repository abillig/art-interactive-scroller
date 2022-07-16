import "./Header.scss";
import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { title, displayDescription, bringToFront, colorScheme } = props;

  const darkColor = "#1c1b1b";
  const lightColor = "#efe6e1";
  const backgroundColor = colorScheme === "light" ? lightColor : darkColor;
  const altColor = colorScheme === "light" ? darkColor : lightColor;

  const headerStyles = {
    background: bringToFront ? "none" : backgroundColor,
    color: altColor,
  };

  const favIconColor = altColor;

  return (
    <>
      <Link to={`/`}>
        <FaHome
          className="homeIcon"
          style={{ color: `${favIconColor}` }}
        ></FaHome>
      </Link>
      <div className="header" style={headerStyles}>
        {displayDescription && <div className="description">{title}</div>}
      </div>
    </>
  );
};

export default Header;
