import './UploadView.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import ImagesUploader from './ImagesUploader';

const Upload = () => {
  const [uploads, setUploads] = useState([]);
  const [leadImage, setLeadImage] = useState({});


  const onDrop = useCallback(file => {

    const uploadedFile = file[0]

    const image = Object.assign({}, uploadedFile, {
        preview: URL.createObjectURL(uploadedFile)
    })

    setLeadImage(Object.assign({}, leadImage, {preview: image.preview, url: image}))
  }, [leadImage])

  const { getRootProps, getInputProps } = useDropzone({onDrop})

  const leadImageDescriptionUpdate = value => {
    setLeadImage(Object.assign({}, leadImage, {
        description: value
    }))
  }

  return (
    <div className="uploadView"> 
        <div className="imageUploadContainer">
            <div className="sectionHeader">Lead Image</div>
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <div className="sectionBody">
                <img className="leadImage" src={leadImage.preview}></img>
                <div className="uploadDescription">
                    <input placeholder="lead image description" 
                        className="imageInput" 
                        value={leadImage.name}
                        onChange={e => leadImageDescriptionUpdate(e.target.value)}/>
                </div>
            </div>
        </div>
       <ImagesUploader uploads={uploads} setUploads={setUploads} />
    </div>
  )
}

export default Upload