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
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  const [searchName, setSearchName] = useState('');
  const navigate = useNavigate();

  const { isLoading, error, data: users, refetch } = useQuery(['users'], () =>
    makeRequest.get('/users').then((res) => {
      return res.data;
    }),
  );

  const findUserIdByName = (searchName) => {
    const foundUser = users.find((user) => user.name === searchName);
    if (foundUser) {
      return foundUser.id;
    }
    return null;
  };

  const handleInputChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSubmit = () => {
    if (searchName.trim() !== '') {
      const userId = findUserIdByName(searchName);
      console.log(userId)
      if (userId) {
        navigate('/profile/' + userId);
      }
    }
    setSearchName('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
      handleScroll();
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };



  

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: 'none' }} onClick={handleScroll}>
          <span>Social media</span>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon className="icon" onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon className="icon" onClick={toggle} />
        )}
      </div>
      <div className="search">
        <SearchOutlinedIcon />
        <input type="text" placeholder="Search..." value={searchName} onChange={handleInputChange} onKeyDown={handleKeyDown} />
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
