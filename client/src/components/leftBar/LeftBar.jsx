import './leftBar.scss';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Friends from '../../assets/1.png';
import Groups from '../../assets/2.png';
import Market from '../../assets/3.png';
import Watch from '../../assets/4.png';
import Memories from '../../assets/5.png';
import Events from '../../assets/6.png';
import Gaming from '../../assets/7.png';
import Gallery from '../../assets/8.png';
import Videos from '../../assets/9.png';
import Messages from '../../assets/10.png';
import Tutorials from '../../assets/11.png';
import Courses from '../../assets/12.png';
import Fund from '../../assets/13.png';
import { AuthContext } from '../../context/authContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleScroll } from '../../activate/scroll';
import React from 'react';

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div key={0} className="item" onClick={() => handleClick(0)}>
            {0 === activeIndex && <div className="active"></div>}
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleScroll}>
              <HomeOutlinedIcon className="logo" />
            </Link>
            <span>Trang chủ</span>
          </div>
          <Link
            to={'/profile/' + currentUser.id}
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={handleScroll}
          >
            <div key={1} className="user" onClick={() => handleClick(1)}>
              {1 === activeIndex && <div className="active"></div>}
              <img src={'/upload/' + currentUser.profilePic} alt="" />
              <span>{currentUser.name}</span>
            </div>
          </Link>
        </div>
        <hr />
        <div className="menu">
          <div key={2} className="item" onClick={() => handleClick(2)}>
            {2 === activeIndex && <div className="active"></div>}
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div key={3} className="item" onClick={() => handleClick(3)}>
            {3 === activeIndex && <div className="active"></div>}
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div key={4} className="item" onClick={() => handleClick(4)}>
            {4 === activeIndex && <div className="active"></div>}
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div key={5} className="item" onClick={() => handleClick(5)}>
            {5 === activeIndex && <div className="active"></div>}
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div key={6} className="item" onClick={() => handleClick(6)}>
            {6 === activeIndex && <div className="active"></div>}
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div key={7} className="item" onClick={() => handleClick(7)}>
            {7 === activeIndex && <div className="active"></div>}
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div key={8} className="item" onClick={() => handleClick(8)}>
            {8 === activeIndex && <div className="active"></div>}
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div key={9} className="item" onClick={() => handleClick(9)}>
            {9 === activeIndex && <div className="active"></div>}
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div key={10} className="item" onClick={() => handleClick(10)}>
            {10 === activeIndex && <div className="active"></div>}
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div key={11} className="item" onClick={() => handleClick(11)}>
            {11 === activeIndex && <div className="active"></div>}
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div key={12} className="item" onClick={() => handleClick(12)}>
            {12 === activeIndex && <div className="active"></div>}
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div key={13} className="item" onClick={() => handleClick(13)}>
            {13 === activeIndex && <div className="active"></div>}
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div key={14} className="item" onClick={() => handleClick(14)}>
            {14 === activeIndex && <div className="active"></div>}
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
