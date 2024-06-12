import './style.scss';
import logo from '../../assets/Logo.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        <img src={logo} alt='logo'></img>
      </div>
      <div className='navbar__links'>
        <Link><div className='navbar__links_item'>Docs</div></Link>
        <Link><div className='navbar__links_item'>Support</div></Link>
        <Link className='link' to="/login"><div className='navbar__links_item'>Log In</div></Link>
        <Link className='link' to="/signup"><div className='navbar__links_button'>Sign Up</div></Link>
      </div>
    </div>
  )
}

export default Navbar