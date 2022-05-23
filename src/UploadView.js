import "./UploadView.scss";
import axios from "axios";

import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ImagesUploader from "./ImagesUploader";

const UploadView = () => {
  const [uploads, setUploads] = useState([]);
  const [leadImage, setLeadImage] = useState({ title: "lead image" });

  const onDrop = useCallback(
    (file) => {
      const uploadedFile = file[0];

      const image = Object.assign({}, uploadedFile, {
        preview: URL.createObjectURL(uploadedFile),
      });

      setLeadImage(
        Object.assign({}, leadImage, {
          preview: image.preview,
          url: uploadedFile,
        })
      );
    },
    [leadImage]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const leadImageTitlepdate = (value) => {
    setLeadImage(
      Object.assign({}, leadImage, {
        title: value,
      })
    );
  };

  async function postImage({
    image,
    description,
    title,
    leadImage,
    artworkId,
  }) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("lead_image", leadImage);
    if (description) {
      formData.append("description", description);
    }
    if (artworkId) {
      formData.append("artwork_id", artworkId);
    }

    const result = await axios.post("http://localhost:8080/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result.data;
  }

  const submit = async (event) => {
    const result = await postImage({
      image: leadImage.url,
      title: leadImage.title,
      leadImage: true,
    });
    const artworkId = await result.insertId;
    uploads.forEach((upload) => {
      postImage({
        image: upload.url,
        description: upload.description,
        title: upload.title,
        leadImage: false,
        artworkId: artworkId,
      });
    });
  };

  return (
    <div className="uploadView">
      <div className="imageUploadContainer">
        <div className="sectionHeader">Lead Image</div>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div className="sectionBody">
          <img className="leadImage" src={leadImage.preview}></img>
          <div className="uploadDescription">
            <input
              placeholder="lead image title"
              className="imageInput"
              value={leadImage.name}
              onChange={(e) => leadImageTitlepdate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <ImagesUploader uploads={uploads} setUploads={setUploads} />
      <button onClick={submit}> Submit </button>
    </div>
  );
};

export default UploadView;
