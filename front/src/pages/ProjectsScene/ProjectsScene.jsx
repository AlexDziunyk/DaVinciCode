import React, { useState, useEffect  } from 'react';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import imagelogin1 from '../../assets/LoginSignup/search_281764.png';
import axios from 'axios';


const Projects = () => {
    const [tab, setTab] = useState('projects');
    const [projects, setProjects] = useState([]);
  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await axios.get('http://localhost:3001/projects');
          setProjects(response.data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };
  
      fetchProjects();
    }, []);
  
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
            {projects.map(project => (
              <div key={project._id} className="project-card">
                <img src={project.image} alt={project.description} />
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="content">
            <div className="profile-pic">
              <div className="profile-placeholder"></div>
              <button className="choose-file">Choose file</button>
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
                <label>LOGIN:</label>
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
  
  export default Projects;