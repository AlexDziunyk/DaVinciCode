import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import design1 from '../../assets/design1.png';
import design2 from '../../assets/design2.png';
import design3 from '../../assets/design3.png';
import './style.scss';
import { useAuth } from '../../context/AuthContext';

const Home = () => {

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, []);

  return (
    <div className="home-container">
      <main>
        <section className="start">
          <div>
            <h1>Service for graphic design</h1>
            <p className='subtitle'>Design Made Simple - Unleash Your Creativity</p>
            <p className='text'>Inspira is a cutting-edge graphic design platform tailored for both budding and seasoned designers. At its core, DesignSpark bridges the gap between traditional artistry and digital innovation, providing a seamless, intuitive interface that simplifies the design process while enhancing creativity.
            </p>
          </div>
          <div>
            <button id="start-creating">Start Creating Now</button>
            <p className="rating"><span className='star'>★ 5.0</span> Over <span className='number'>250+</span> customers used Inspira</p>
          </div>
        </section>
        <section className="gallery">
          <img src={design1} alt="Design 1" />
          <img className='image' src={design2} alt="Design 2" />
          <img src={design3} alt="Design 3" />
        </section>
      </main>
    </div>
  );
};

export default Home;
