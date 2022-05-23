import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UploadView from "./UploadView";
import ArtworkViewer from "./ArtworkViewer";
import ArtworkIndex from "./ArtworkIndex";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArtworkIndex />} />
        <Route path="artwork" element={<ArtworkViewer />}>
          <Route path=":artworkId" element={<ArtworkViewer />} />
        </Route>
        <Route path="upload" element={<UploadView />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
