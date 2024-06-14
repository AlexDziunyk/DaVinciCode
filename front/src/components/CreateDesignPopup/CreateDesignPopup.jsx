import React, { useState } from 'react';
import './style.scss';
import loading from '../../assets/loading.gif';
import cross from '../../assets/Close.svg';
import axios from '../../axios/axios';
import { useProjects } from '../../context/ProjectsContext';

const CreateDesignPopup = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { setProject } = useProjects();

  const createNewProject = async () => {
    setIsLoading(true);
    const { data } = await axios.post("/projects/create", { title: inputValue });
    setIsLoading(false);
    setProject(data.result);
    onClose();
  }

  return (
    <div className='popup'>
      <div className='popup__container'>
        <div className='popup__header'>
          <h2>Create new design!</h2>
          <img onClick={onClose} className='cross' src={cross} alt='cross'></img>
        </div>
        <p>Do something wonderful with a lot of great tools!</p>
        <input disabled={isLoading} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Enter the title...'></input>
        {isLoading ? <img src={loading} alt='loading'></img> : <button onClick={createNewProject}>Create</button>}
      </div>
    </div>
  )
}

export default CreateDesignPopup;