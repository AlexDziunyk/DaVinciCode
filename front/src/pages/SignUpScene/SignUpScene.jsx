import React, { useState } from 'react';
import './style.scss';
import imagelogin1 from '../../assets/LoginSignup/search_281764.png';
import imagelogin2 from '../../assets/LoginSignup/twitter-alt-circle_12107562.png';
import imagelogin3 from '../../assets/LoginSignup/facebook_145802.png';
import imagelogin4 from '../../assets/LoginSignup/linkedin_145807.png';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="confirmpassword"
              placeholder="Confirm password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
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

export default SignUp;
