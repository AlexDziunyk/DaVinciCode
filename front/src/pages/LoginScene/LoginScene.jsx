import React from 'react';
import './style.scss';
import imagelogin1 from '../../assets/LoginSignup/search_281764.png';
import imagelogin2 from '../../assets/LoginSignup/twitter-alt-circle_12107562.png';
import imagelogin3 from '../../assets/LoginSignup/facebook_145802.png';
import imagelogin4 from '../../assets/LoginSignup/linkedin_145807.png';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="input-group">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-link">
          Don't have an account? <a href="/signup">Signup</a>
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
