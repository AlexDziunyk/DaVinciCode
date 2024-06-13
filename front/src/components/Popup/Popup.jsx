import React, { useState } from 'react';
import './style.scss';
import cross from '../../assets/Close.svg';
import loading from '../../assets/loading.gif';

const Popup = ({ onClose, setInputValue, onClick, onAccept }) => {

  const [popupStage, setPopupStage] = useState("generate");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    setIsLoading(true);
    const result = await onClick();
    setIsLoading(false);

    setPopupStage("result");

    if (result !== "") {
      setImageUrl(result);
      return;
    }

    setError("Something went wrong! Try again later...")

  }

  return (
    <div className='popup'>
      {popupStage === "generate" && <div className='popup__container'>
        <div className='popup__header'>
          <h2>Generate new image</h2>
          <img onClick={onClose} className='cross' src={cross} alt='cross'></img>
        </div>
        <p>Create an image using generative AI, describing what you want to see.</p>
        <input disabled={isLoading} onChange={setInputValue} placeholder='What do you want to see?'></input>
        {isLoading ? <img src={loading} alt='loading'></img> : <button onClick={generateImage}>Generate</button>}
      </div>}

      {popupStage === "result" && <div className='popup__container'>
        <div className='popup__header'>
          <h2>Do you like it?</h2>
          <img onClick={onClose} className='cross' src={cross} alt='cross'></img>
        </div>
        <p>Your result!</p>
        {/* <input onChange={setInputValue} placeholder='What do you want to see?'></input> */}
        {error === "" ? <img width={400} height={400} src={imageUrl ?? ''} alt='airesult'></img> : <p>{error}</p>}
        {error !== "" && <button onClick={onClose}>Close the window!</button>}

        {error === "" && <button onClick={onClose}>Nope, close the window!</button>}
        {error === "" && <button onClick={() => onAccept(imageUrl)}>Add to gallery!</button>}
      </div>}
    </div>
  )
}

export default Popup;