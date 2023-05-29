import { useContext, useState, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './login.scss';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();
  const { login, currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };


  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
          Stay connected, stay informed.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            {err && err}
            <Link to="/">
              <button onClick={handleLogin}>Login</button>
            </Link>
            <span className="sp-rgt">Don't you have an account?</span>
            <Link className="bt-rgt" to="/register">
              <button>Register</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
