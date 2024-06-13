import React, { useState } from 'react';
import './style.scss';
import imagelogin1 from '../../assets/LoginSignup/search_281764.png';
import imagelogin2 from '../../assets/LoginSignup/twitter-alt-circle_12107562.png';
import imagelogin3 from '../../assets/LoginSignup/facebook_145802.png';
import imagelogin4 from '../../assets/LoginSignup/linkedin_145807.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../axios/axios'

const Login = () => {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/user/login", { login: login, password: password });

      if (data.token) {
        localStorage.setItem("token", data.token)
        console.log(data)
        setIsLoggedIn(true);
        navigate('/');

        return;
      }

    } catch (error) {
      setError("Invalid data!");
    }

  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Login" required />
          </div>
          <div className="input-group">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <p className='error'>{error}</p>
          {/* <div className="forgot-password">
            <Link to="#">Forgot password?</Link>
          </div> */}
          <button type='submit' className="login-button">Login</button>
        </form>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
        <div className="divider">
          <span>or</span>
        </div>
        <div className="social-login">
          <div className="social-buttons">
            <a className="google-login-button" href="-" target="_blank"><img src={imagelogin1} alt="none" /></a>
            <a className="twitter-login-button" href="-" target="_blank"><img src={imagelogin2} alt="none" /></a>
            <a className="facebook-login-button" href="-" target="_blank"><img src={imagelogin3} alt="none" /></a>
            <a className="linkedin-login-button" href="-" target="_blank"><img src={imagelogin4} alt="none" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
