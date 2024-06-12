import './style.scss';
import logo from '../../assets/Logo.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import share from '../../assets/share.svg';

const Navbar = () => {

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
  }

  return (
    <div className={`navbar ${isLoggedIn && "logged-in"}`}>

      <Link className='navbar__logo' to="/">
        <img src={logo} alt='logo'></img>
      </Link>

      {!isLoggedIn && <div className='navbar__links'>
        <Link className='link'><div className='navbar__links_item'>Docs</div></Link>
        <Link className='link'><div className='navbar__links_item'>Support</div></Link>
        <Link className='link' to="/login"><div className='navbar__links_item'>Log In</div></Link>
        <Link className='link' to="/signup"><div className='navbar__links_button'>Sign Up</div></Link>
      </div>}
      
      {isLoggedIn && <div className='navbar__links'>
        <Link className='link' to="/login"><div className='navbar__links_item'>Profile</div></Link>
        <Link className='link' to="/">
          <div className='navbar__links_share'>
            <span>Share</span>
            <img src={share} alt='share'></img>
          </div>
        </Link>
      </div>}
    </div>
  )
}

export default Navbar