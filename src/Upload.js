import './UploadView.scss';
import axios from 'axios'

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

    setLeadImage(Object.assign({}, leadImage, {preview: image.preview, url: uploadedFile}))
  }, [leadImage])

  const { getRootProps, getInputProps } = useDropzone({onDrop})

  const leadImageDescriptionUpdate = value => {
    setLeadImage(Object.assign({}, leadImage, {
        description: value
    }))
  }

  async function postImage({image, description}) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("description", description)

    const result = await axios.post('http://localhost:3005/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    return result.data
  }

  const submit = async event => {
    await postImage({image: leadImage.url, description: leadImage.description})
    uploads.forEach(upload => {
        postImage({image: upload.url, description: upload.description})
    })
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
       <button onClick={submit}> Submit </button>
    </div>
  )
}

export default Upload