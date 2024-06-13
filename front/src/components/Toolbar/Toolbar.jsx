import { shapesObj } from '../../utils/shapes';
import { v4 as uuidv4 } from 'uuid';
import './style.scss';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import customAxios from '../../axios/axios';

import imagesIcon from '../../assets/toolbar/Images.svg';
import aiIcon from '../../assets/toolbar/Ai.svg';
import elementsIcon from '../../assets/toolbar/Elements.svg';
import textIcon from '../../assets/toolbar/Text.svg';
import uploadIcon from '../../assets/toolbar/Uploads.svg';
import star from '../../assets/toolbar/star.png';
import { textsArr } from '../../utils/textsArr';


const Toolbar = ({ shapes, setShapes }) => {

  const [chosenCategory, setChosenCategory] = useState("shapes");
  const [photos, setPhotos] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  //const [newUploadedFile, setNewUploadedFile] = useState("");
  const [promptValue, setNewPromptValue] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const uploadInputRef = useRef(null);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const getUploadedImages = async () => {
    const { data } = await customAxios.get("/user/myimages");

    console.log(data)

    setUploadedFiles(data.result);

  }

  const getAiImages = async () => {
    const { data } = await customAxios.get("/user/aiimages");

    console.log(data)

    setGeneratedImages(data.result);

  }

  const uploadMyImage = async (fileImage) => {
    const formData = new FormData();
    formData.append('image', fileImage);

    const response = await customAxios.post('/user/upload/myimages', formData);

    console.log(response)

  }

  const handleInputChange = async (e) => {
    const file = e.target.files[0];
    setUploadedFiles(prev => [URL.createObjectURL(file), ...prev]);

    uploadMyImage(file);
  }

  const addShape = debounce((type) => {
    const shape = { ...shapesObj[type], id: uuidv4() };
    setShapes((prevShapes) => [...prevShapes, shape]);
  }, 50);

  const addText = debounce((properties) => {
    const shape = { ...properties, id: uuidv4() };
    setShapes((prevShapes) => [...prevShapes, shape]);
  }, 50);

  const addImage = debounce((image, isUrl) => {
    const shape = { ...shapesObj["image"], id: uuidv4() };
    shape.url = isUrl ? image : image.urls.small;

    setShapes((prevShapes) => [...prevShapes, shape]);
  }, 50);

  const generateImage = async () => {
    const { data } = await customAxios.post('/openai/generate-image', { prompt: promptValue });

    setGeneratedImages(prev => [data.result, ...prev]);
  }

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos', {
        headers: {
          Authorization: `Client-ID qmN4vxfH1dY-dJJSssRwFtjRUHm6-gLVBP11NVxMGEQ`
        },
        params: {
          per_page: 16
        }
      });
      setPhotos(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching photos from Unsplash', error);
    }
  };

  useEffect(() => {
    getUploadedImages();
    getAiImages();
    fetchPhotos();
  }, []);



  return (
    <div className='toolbar'>
      <div className='toolbar__tools'>
        <div onClick={() => setChosenCategory("shapes")} className='toolbar__tools_item'>
          <img src={elementsIcon} alt='elementsIcon'></img>
        </div>
        <div onClick={() => setChosenCategory("images")} className='toolbar__tools_item'>
          <img src={imagesIcon} alt='imagesIcon'></img>
        </div>
        <div onClick={() => setChosenCategory("text")} className='toolbar__tools_item'>
          <img src={textIcon} alt='textIcon'></img>
        </div>
        <div onClick={() => setChosenCategory("upload")} className='toolbar__tools_item'>
          <img src={uploadIcon} alt='uploadIcon'></img>
        </div>
        <div onClick={() => setChosenCategory("ai")} className='toolbar__tools_item'>
          <img src={aiIcon} alt='aiIcon'></img>
        </div>
      </div>

      {chosenCategory === "shapes" && <div className='toolbar__shapes'>
        <h1 className='toolbar-title'>Shapes</h1>
        <div className='toolbar-items'>
          <div className='square' onClick={() => addShape("rect")}></div>
          <div className='circle' onClick={() => addShape("circle")}></div>
          <div onClick={() => addShape("star")}><img className='star' src={star} alt='star'></img></div>
        </div>
      </div>}

      {chosenCategory === "text" && <div className='toolbar__shapes'>
        <h1 className='toolbar-title'>Texts</h1>
        <div className='toolbar-items'>
          {textsArr.map(item => {
            return (
              <div
                key={item.id}
                onClick={() => addText(item)}
                style={{ cursor: "pointer", fontFamily: item.fontFamily, color: item.fill, fontSize: item.fontSize }}>
                {item.text}
              </div>
            );
          })}
        </div>
      </div>}

      {chosenCategory === "images" && <div>
        <h1 className='toolbar-title'>Images</h1>
        <div className='toolbar__images'>
          {photos && photos.map(item => {
            return (
              <div className='toolbar__images_item' key={item.id} onClick={() => addImage(item)}>
                <img src={item.urls.small}></img>
              </div>
            );
          })}
        </div></div>}

      {chosenCategory === "upload" && <div className='upload-file'>
        <h1 className='toolbar-title'>Uploads</h1>
        <input onChange={handleInputChange} ref={uploadInputRef} hidden type="file"></input>
        <button onClick={() => {
          uploadInputRef.current.click();
        }}>Upload image</button>
        {uploadedFiles && uploadedFiles.map((item, index) => {
          return (
            <div className='toolbar__images_item' key={index} onClick={() => addImage(item, true)}>
              <img width="100%" height="auto" src={item}></img>
            </div>
          )
        })}
      </div>}

      {chosenCategory === "ai" && <div className='ai'>
        <h1 className='toolbar-title'>Ai Images</h1>
        <input placeholder='Enter here your prompt...' value={promptValue} onChange={(e) => setNewPromptValue(e.target.value)} type="text"></input>
        <button onClick={generateImage}>Generate AI Image</button>
        {generatedImages && generatedImages.map((item, index) => {
          return (
            <div className='toolbar__images_item' key={index} onClick={() => addImage(item, true)}>
              <img width={40} height={60} src={item}></img>
            </div>
          )
        })}
      </div>}


    </div>
  )
}

export default Toolbar