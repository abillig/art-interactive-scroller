import React, { useState } from "react";

  
  const UploadForm = ({ upload, idx, handleTitleUpdate, handleDescriptionUpdate }) => {
    const [headline, setHeadline] = useState("");
    const [description, setDesription] = useState("");

    const handleHeadlineChange = value => {
        setHeadline(value);
        handleTitleUpdate(value, idx);
    }

    const handleDescriptionChange = value => {
        setDesription(value);
        handleDescriptionUpdate(value, idx);
    }

    return (
        <div className="sectionBody">
            <div className="imageContainer">
            <img
                className="uploadImage"
                alt="upload preview"
                src={upload.preview}
            />
            </div>
            <div className="uploadDescription">
            <input
                placeholder="title"
                className="imageInput"
                value={headline}
                onChange={e => handleHeadlineChange(e.target.value)}
            />
            <input
                placeholder="description"
                className="imageInput"
                value={description}
                onChange={e => handleDescriptionChange(e.target.value)}
            />
            </div>
        </div>
    );
};

export default UploadForm;


