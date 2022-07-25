import "./UploadView.scss";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import UploadForm from "./UploadForm";

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
      {uploads.map((upload, idx) => {
        return <UploadForm upload={upload} 
          idx={idx} 
          handleTitleUpdate={handleTitleUpdate} 
          handleDescriptionUpdate={handleDescriptionUpdate}
          key={idx} 
        />
        })}
    </div>
  );
};

export default ImagesUploader;
