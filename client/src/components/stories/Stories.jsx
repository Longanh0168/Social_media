import { useContext, useState } from 'react';
import './stories.scss';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import { useQuery } from '@tanstack/react-query';

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const userId = currentUser.id;

  const { isLoading, error, data: users } = useQuery(['followers', userId], () => {
    return makeRequest.get(`/users/followers/` + userId)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response.data);
      });
  });

  const getRandomUsers = (users, count, excludedUserId) => {
    if (!users || users.length === 0 || count <= 0) {
      return [];
    }
  
    const filteredUsers = users.filter(user => user.id !== excludedUserId);
  
    const shuffledUsers = filteredUsers.sort(() => 0.5 - Math.random());
    return shuffledUsers.slice(0, count);
  };
  
  const stories = getRandomUsers(users, 4, currentUser.id);

  const handleStoryClick = (image) => {
    setSelectedImage(image);
    setPopupOpen(true);
    setTimeout(() => {
      setPopupOpen(false);
    }, 1500); 
  };
  

  return (
    <div className="stories">
      <div className="story">
        <img src={'/upload/' + currentUser.profilePic} alt="" onClick={() => handleStoryClick(currentUser.profilePic)}/>
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={'/upload/' + story.profilePic} alt="" onClick={() => handleStoryClick(story.profilePic)}/>
          <span>{story.name}</span>
        </div>
      ))}
      {popupOpen && (
        <div className="popup">
          <img src={'/upload/' + selectedImage} alt="Story" />
        </div>
      )}
    </div>
  );
};

export default Stories;
