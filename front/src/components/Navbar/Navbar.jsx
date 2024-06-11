import './style.scss';
import logo from '../../assets/Logo.svg';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        <img src={logo} alt='logo'></img>
      </div>
      <div className='navbar__links'>
        <div className='navbar__links_item'>Docs</div>
        <div className='navbar__links_item'>Support</div>
        <div className='navbar__links_item'>Log In</div>
        <div className='navbar__links_button'>Sign Up</div>
      </div>
    </div>
  )
}

export default Navbar