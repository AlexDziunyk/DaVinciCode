import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';

const ProfileSettings = () => {
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const userId = '';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/projects/my');

        setProjects(data.result);
        console.log(data.result)
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${userId}`);
        setProfileImage(response.data.profileImage);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('profileImage', selectedFile);
    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfileImage(response.data.profileImage);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="profile-settings">
      <div className="tabs">
        <button className={`tab ${tab === 'projects' ? 'active' : ''}`} onClick={() => setTab('projects')}>
          Projects
        </button>
        <button className={`tab ${tab === 'settings' ? 'active' : ''}`} onClick={() => setTab('settings')}>
          Settings
        </button>
      </div>
      {tab === 'projects' ? (
        <div className="projects">
          {projects && projects.map(project => (
            <div key={project._id} className="project-card">
              <img src={project.image} alt={project.description} />
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="content">
          <div className="profile-pic">
            {profileImage ? (
              <img src={`http://localhost:3001${profileImage}`} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-placeholder"></div>
            )}
            <input type="file" onChange={handleFileChange} />
            <button className="choose-file" onClick={handleUpload}>Upload</button>
          </div>
          <form className="profile-form">
            <div className="form-group">
              <label>PROFILE NAME:</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>EMAIL:</label>
              <input type="email" />
            </div>
            <div className="form-group">
              <label>USERNAME:</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>PASSWORD:</label>
              <input type="password" />
            </div>
            <button type="submit" className="save-changes">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
