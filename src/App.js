// import logo from './logo.svg';
import './App.scss';
import React, { useState, useEffect } from 'react';
import {
  Outlet, Link
} from "react-router-dom";

import ArtworkViewer from './ArtworkViewer';

function App() {
  return (
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/artwork">Artwork</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App