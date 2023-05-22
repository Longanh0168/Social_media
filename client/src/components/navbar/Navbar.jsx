import './navbar.scss';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import QuizIcon from '@mui/icons-material/Quiz';
import HelpIcon from '@mui/icons-material/Help';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import { handleScroll } from '../../activate/scroll';

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: 'none' }} onClick={handleScroll}>
          <span>JK24 Social</span>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon className="icon" onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon className="icon" onClick={toggle} />
        )}
      </div>
      <div className="search">
        <SearchOutlinedIcon />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="right">
        <EmailOutlinedIcon className="icon" />
        <PersonOutlinedIcon className="icon" />
        <NotificationsOutlinedIcon className="icon" />
        <div className="user" onClick={handleClick}>
          {isVisible && (
            <div className="user-menu">
            <ul className="user-list">
              <li className="user-item"> 
                <AccountBoxIcon className='icon'/>
                <a href={'/profile/' + currentUser.id} >Profile</a>
              </li>
              <li className="user-item">
                <SettingsIcon className='icon'/>
                <a href="">Settings</a>
              </li>
              <li className="user-item">
                <HelpIcon className='icon'/>
                <a href="">Support</a>
              </li>
              <li className="user-item">
                <QuizIcon className='icon'/>
                <a href="">Feeback</a>
              </li>
              <hr />
              <li className="user-item">
                <LogoutIcon className='icon'/>
                <a to="./login" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
          )}

          <img src={'/upload/' + currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
