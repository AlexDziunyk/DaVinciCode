import React from 'react';
import './style.scss';

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
        <div className="social-login">
          <p>or</p>
          <div className="social-buttons">
            <button className="google-button">Google</button>
            <button className="apple-button">Apple</button>
            <button className="facebook-button">Facebook</button>
            <button className="linkedin-button">LinkedIn</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
