import React, { useState, useEffect } from 'react';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import imagelogin1 from '../../assets/LoginSignup/search_281764.png';
import axios from '../../axios/axios';
import { useProjects } from '../../context/ProjectsContext';


const Projects = () => {
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const { project } = useProjects();
  const [email, setEmail] = useState("");
  const [profilename, setProfilename] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const changeProfile = async (e) => {
    e.preventDefault();

    if (!email || !profilename) {
      setError("The fields can't be empty!")
      return;
    }

    const { data } = await axios.post('user//info/update', { email, profilename });

    if (data.result) {
      setError("");
      setSuccess("Info updated!")
    } else {
      setError("Something went wrong!");
    }

    console.log(data);

  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/projects/my');

        setProjects(data.result);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [project]);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axios.get('/user/info');

      // setLogin(data.result.login);
      setEmail(data.result.email);
      setProfilename(data.result.profilename)

    }

    fetchProfile();

  }, []);


  useEffect(() => {
    setError("");
    setSuccess("");
  }, [tab])


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
          {projects.length === 0 && <h2>You don't have any project yet. Create one!</h2>}
          {projects && projects.map(project => (
            <Link style={{ textDecoration: "none" }} key={project._id} to={`/projects/${project._id}`}>
              <div className="project-card">
                {/* <img src={project.image} alt={project.description} /> */}
                <p>{project.title}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="content">
          {/* <div className="profile-pic">
            <div className="profile-placeholder"></div>
            <button className="choose-file">Choose file</button>
          </div> */}
          <form onSubmit={changeProfile} className="profile-form">
            <div className="form-group">
              <label>PROFILE NAME:</label>
              <input value={profilename} onChange={(e) => setProfilename(e.target.value)} type="text" />
            </div>
            <div className="form-group">
              <label>EMAIL:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {/* <div className="form-group">
              <label>LOGIN:</label>
              <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
            </div> */}
            {/* <div className="form-group">
              <label>PASSWORD:</label>
              <input type="password" />
            </div> */}
              <p className='error'>{error}</p>
              <p className='success'>{success}</p>
            <button type="submit" className="save-changes">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Projects;