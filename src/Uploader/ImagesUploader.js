import "./UploadView.scss";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImagesUploader = (props) => {
  const { uploads, setUploads } = props;

  const handleTitleUpdate = (value, idx) => {
    setUploads([
      ...uploads.slice(0, idx),
      Object.assign({}, uploads[idx], { title: value }),
      ...uploads.slice(idx + 1),
    ]);
  };

  const handleDescriptionUpdate = (value, idx) => {
    setUploads([
      ...uploads.slice(0, idx),
      Object.assign({}, uploads[idx], { description: value }),
      ...uploads.slice(idx + 1),
    ]);
  };

  const uploadRow = (upload, idx) => {
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
            value={upload.headline}
            onChange={(e) => handleTitleUpdate(e.target.value, idx)}
          />
          <input
            placeholder="description"
            className="imageInput"
            value={upload.description}
            onChange={(e) => handleDescriptionUpdate(e.target.value, idx)}
          />
        </div>
      </div>
    );
  };

  const onDrop = useCallback(
    (files) => {
      const filesWithPreview = files.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setUploads(
        uploads.concat(
          filesWithPreview.map((file, idx) => ({
            preview: file.preview,
            url: files[idx], // backend needs to read original file without preview
          }))
        )
      );
    },
    [uploads, setUploads]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="imageUploadContainer">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className="sectionHeader">Additional Images</div>
      {uploads.map((upload, idx) => uploadRow(upload, idx))}
    </div>
  );
};

export default ImagesUploader;
