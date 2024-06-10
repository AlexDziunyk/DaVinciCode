import { shapesObj } from '../../utils/shapes';
import { v4 as uuidv4 } from 'uuid';
import './style.scss';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import customAxios from '../../axios/axios';
import shapesImg from '../../assets/shapes.svg';
import imagesImg from '../../assets/images.svg';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";


const Toolbar = ({ shapes, setShapes }) => {

  const [chosenCategory, setChosenCategory] = useState("shapes");
  const [photos, setPhotos] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [newUploadedFile, setNewUploadedFile] = useState("");
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

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    setUploadedFiles(prev => [URL.createObjectURL(file), ...prev])
  }


  const addShape = debounce((type) => {
    const shape = { ...shapesObj[type], id: uuidv4() };
    setShapes((prevShapes) => [...prevShapes, shape]);
  }, 50);

  const addImage = debounce((image, isUrl) => {
    const shape = { ...shapesObj["image"], id: uuidv4() };
    shape.url = isUrl ? image : image.urls.small;
    shape.width = 220;
    shape.height = 320;
    setShapes((prevShapes) => [...prevShapes, shape]);
  }, 50);


  const generateImage = async() => {
    const { data } = await customAxios.post('/openai/generate-image', { prompt: promptValue });

    console.log(data.result);

    setGeneratedImages(prev => [data.result, ...prev]);

  }

  useEffect(() => {
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

    fetchPhotos();
  }, []);



  return (
    <div className='toolbar'>
      <div className='toolbar__tools'>
        <div onClick={() => setChosenCategory("shapes")} className='toolbar__tools_item'>
          <img src={shapesImg} alt='shapesImg' width={24} height={24}></img>
        </div>
        <div onClick={() => setChosenCategory("images")} className='toolbar__tools_item'>
          <img src={imagesImg} alt='imagesImg' width={24} height={24}></img>
        </div>
        <div onClick={() => setChosenCategory("upload")} className='toolbar__tools_item'>
          <FaCloudUploadAlt />
        </div>
        <div onClick={() => setChosenCategory("ai")} className='toolbar__tools_item'>
          <FaRobot />
        </div>
      </div>

      {chosenCategory === "shapes" && <div className='toolbar__shapes'>
        <p className='toolbar-title'>Shapes</p>
        <div className='toolbar-items'>
          <h1 onClick={() => addShape("rect")}>Square</h1>
          <h1 onClick={() => addShape("circle")}>Circle</h1>
          <h1 onClick={() => addShape("star")}>Star</h1>
          <h1 onClick={() => addShape("text")}>Text</h1>
        </div>
      </div>}

      {chosenCategory === "images" && <div className='toolbar__images'>
        {photos && photos.map(item => {
          return (
            <div className='toolbar__images_item' key={item.id} onClick={() => addImage(item)}>
              <img width={40} height={60} src={item.urls.small}></img>
            </div>
          );
        })}
      </div>}

      {chosenCategory === "upload" && <div>
        <p className='toolbar-title'>Uploads</p>
        <input value={newUploadedFile} onChange={handleInputChange} ref={uploadInputRef} hidden type="file"></input>
        <button onClick={() => {
          uploadInputRef.current.click();
        }}>Upload image</button>
        {uploadedFiles && uploadedFiles.map((item, index) => {
          return (
            <div className='toolbar__images_item' key={index} onClick={() => addImage(item, true)}>
              <img width={40} height={60} src={item}></img>
            </div>
          )
        })}
      </div>}

      {chosenCategory === "ai" && <div>
        <p className='toolbar-title'>Uploads</p>
        <input value={promptValue} onChange={(e) => setNewPromptValue(e.target.value)} type="text"></input>
        <button onClick={generateImage}>Generate AI IMage</button>
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