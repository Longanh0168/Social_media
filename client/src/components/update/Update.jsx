import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import './update.scss';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const upload = async (file) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await makeRequest.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put('/users', user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['user']);
      },
    },
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;

    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img src={cover ? URL.createObjectURL(cover) : '/upload/' + user.coverPic} alt="" />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input type="file" id="cover" style={{ display: 'none' }} onChange={(e) => setCover(e.target.files[0])} />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img src={profile ? URL.createObjectURL(profile) : '/upload/' + user.profilePic} alt="" />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: 'none' }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>

          <input type="email" name="email" onChange={handleChange} placeholder="Email:" />

          <input type="password" name="password" onChange={handleChange} placeholder="Password:" />

          <input type="text" name="name" onChange={handleChange} placeholder="Name:" />

          <input type="text" name="city" onChange={handleChange} placeholder="City:" />

          <input type="text" name="website" onChange={handleChange} placeholder="Website:" />

          <button onClick={handleSubmit}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
