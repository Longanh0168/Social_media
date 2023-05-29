import { useContext } from 'react';
import './rightBar.scss';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { handleScroll } from '../../activate/scroll';

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);

  const userId = currentUser.id;

  // UnFollowers
  const { isLoading: isLoadingNotFollow, error: errorNotFollow, data: userNotFollow } = useQuery(['unfollowers', userId], () => {
    return makeRequest.get(`/users/unfollowers/` + userId)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response.data);
      });
  });
  
  //Followers
  const { isLoading: isLoadingFollow, error: errorFollow, data: userFollow } = useQuery(['followers', userId], () => {
    return makeRequest.get(`/users/followers/` + userId)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response.data);
      });
  });

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {errorNotFollow ? 'Something went wrong!' : isLoadingNotFollow ? '' : 
          userNotFollow.map((user) => (
              <Link 
                className="user" key={user.id}
                to={'/profile/' + user.id}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={handleScroll}
              >
                <div className="userInfo">
                  <img
                    src={'/upload/' + user.profilePic}
                    alt=""
                  />
                  <span>{user.name}</span>
                </div>
                <div className="buttons">
                  <button>Go to profile</button>
                </div>
              </Link>
              
          ))}
        </div>
        <div className="item">
          <span>List Friend</span>
          {errorFollow ? 'Something went wrong!' : isLoadingFollow ? '' :
            userFollow.map((user) => (
              <Link 
                className='user' key={user.id}
                to={'/profile/' + user.id}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={handleScroll}
              >
                <div className='userInfo'>
                  <img src={'/upload/' + user.profilePic} alt="" />
                  <p>
                    <span>{user.name}</span>
                  </p>
                </div>
                <div className="status">
                  <span>Offline</span>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default RightBar;
