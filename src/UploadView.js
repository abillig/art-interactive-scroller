import { useState } from 'react'
import axios from 'axios'

import './UploadView.scss'

async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)

  console.log('sup')

  const result = await axios.post('http://localhost:3005/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}


function UploadView() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, description})
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  return (
    <div className="uploadView">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>

      { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}
      
      <img src="http://localhost:3005/images/4b21572383c2863867710123b1c4ed39"></img>

    </div>
  );
}

export default UploadView;