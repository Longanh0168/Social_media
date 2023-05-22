import { useContext, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { handleScroll } from '../../activate/scroll';

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState('');
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post('/comments', newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['comments']);
      },
    },
  );

  const { isLoading, data } = useQuery(['comments'], () =>
    makeRequest.get('/comments?postId=' + postId).then((res) => {
      return res.data;
    }),
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc('');
  };

  //Temporary
  // const comments = [
  //   {
  //     id: 1,
  //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam',
  //     name: 'John Doe',
  //     userId: 1,
  //     profilePicture:
  //       'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     id: 2,
  //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam',
  //     name: 'Jane Doe',
  //     userId: 2,
  //     profilePicture:
  //       'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //   },
  // ];
  return (
    <div className="comments">
      <div className="write">
        <Link to={'/profile/' + currentUser.id}>
          <img src={'/upload/' + currentUser.profilePic} alt="" onClick={handleScroll} />
        </Link>
        <input type="text" placeholder="write a comment" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? 'loading'
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <Link to={'/profile/' + comment.userId}>
                <img src={'/upload/' + comment.profilePic} alt="" onClick={handleScroll} />
              </Link>
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">{moment(comment.createdAt).fromNow()}</span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
