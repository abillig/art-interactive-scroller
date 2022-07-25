import "./UploadView.scss";
import axios from "axios";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ImagesUploader from "./ImagesUploader";
import Header from "../Shared/Header";

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

  const leadImageTitleUpdate = (value) => {
    setLeadImage(
      Object.assign({}, leadImage, {
        title: value,
      })
    );
  };

  function postImage({
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
    description && formData.append("description", description);
    artworkId && formData.append("artwork_id", artworkId);
    
    return axios.post(
      `${process.env.REACT_APP_API_URL}/images`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  const submit = event => {
    // post lead image 
    postImage({
      image: leadImage.url,
      title: leadImage.title,
      leadImage: true,
    }).then(async res => {
      let artworkId = res.data.insertId;

      for(let upload of uploads){
        // the await ensures that uploads post in the proper order 
        await postImage({
          image: upload.url,
          description: upload.description,
          title: upload.title,
          leadImage: false,
          artworkId: artworkId,
        });
      };
    }).catch(err => {
      console.error(err)
    });
  };

  return (
    <div className="uploadView">
      <Header
        title={"Art Interactive"}
        bringToFront={false}
        displayDescription
        colorScheme="light"
      />
      <div className="imageUploadContainer">
        <div className="sectionHeader">Lead Image</div>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div className="sectionBody">
          <img className="leadImage" alt="lead" src={leadImage.preview}></img>
          <div className="uploadDescription">
            <input
              placeholder="lead image title"
              className="imageInput"
              value={leadImage.name}
              onChange={(e) => leadImageTitleUpdate(e.target.value)}
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
