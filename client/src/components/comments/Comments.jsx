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
  const [menuOpen, setMenuOpen] = useState(true);

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

  const deleteMutation = useMutation(
    (commentId) => {
      return makeRequest.delete('/comments/' + commentId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['comments']);
      },
    },
  )
  

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
              
              {menuOpen && comment.userId === currentUser.id && <button onClick={() => {deleteMutation.mutate(comment.id)}}>Delete</button>}
            </div>
          ))}
    </div>
  );
};

export default Comments;
