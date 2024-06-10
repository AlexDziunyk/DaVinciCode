import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <nav>
          <a href="#">Docs</a>
          <a href="#">Support</a>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </nav>
      </header>
      <main>
        <section className="start">
          <h1>Service for graphic design</h1>
          <p>Design Made Simple - Unleash Your Creativity</p>
          <button id="start-creating">Start Creating Now</button>
          <p className="rating">★ 5.0 Over <span>250+</span> customers used Inspira</p>
        </section>
        <section className="gallery">
          <img src="../../assets/design1.jpg" alt="Design 1" />
          <img src="../../assets/design2.jpg" alt="Design 2" />
          <img src="../../assets/design3.jpg" alt="Design 3" />
          <img src="../../assets/design4.jpg" alt="Design 4" />
        </section>
      </main>
    </div>
  );
};

export default Home;
