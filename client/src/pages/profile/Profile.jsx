import './profile.scss';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import QuizIcon from '@mui/icons-material/Quiz';
import HelpIcon from '@mui/icons-material/Help';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../../components/posts/Posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import Update from '../../components/update/Update';

const Profile = () => {
  const userId = useLocation().pathname.split('/')[2];
  const { currentUser, logout } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const { isLoading, data } = useQuery(['user'], () =>
    makeRequest.get('/users/find/' + userId).then((res) => {
      return res.data;
    }),
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(['relationship'], () =>
    makeRequest.get('/relationships?followedUserId=' + userId).then((res) => {
      return res.data;
    }),
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following) return makeRequest.delete('/relationships?userId=' + userId);
      return makeRequest.post('/relationships', { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['relationship']);
      },
    },
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {isLoading ? (
        'loading'
      ) : (
        <>
          <div className="images">
            <img src={'/upload/' + data.coverPic} alt="" className="cover" />
            <img src={'/upload/' + data.profilePic} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a className="icon" href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a className="icon" href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a className="icon" href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  'loading'
                ) : userId == currentUser.id ? (
                  <button
                    onClick={() => {
                      setOpenUpdate(true);
                    }}
                  >
                    update
                  </button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id) ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>
              <div className="right">
                <div>
                  <EmailOutlinedIcon className="icon" />
                </div>
                <div className="more" onClick={handleClick}>
                  <MoreVertIcon className="icon" />
                  {isVisible && (
                    <div className="user-menu">
                      <ul className="user-list">
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
                </div>
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
