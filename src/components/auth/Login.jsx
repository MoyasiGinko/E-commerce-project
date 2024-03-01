/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { loginUser } from '../../redux/reducers/auth/loginSlice';
import '../../styles/login.css';
import backgroundImage from '../../assets/images/bg-ecom-3.jpg';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const loginStatus = useSelector((state) => state.login.status);
  const loginLoading = useSelector((state) => state.login.status === 'loading');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };
      await dispatch(loginUser(user));
      setEmail('');
      setPass('');
    } catch (error) {
      setLoginError('Invalid email or password. Please try again.');
      // Display the error message in a notification
      toast.error('Invalid email or password. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (loginStatus === 'success') {
      console.log('Login successful. Redirecting to /trade.');
      navigate('/trade');
    }
  }, [loginStatus, navigate]);

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        background: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 font-merriweather">
          Sign In
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <p className="text-center text-red-500 font-bold">
              {loginError
                || (loginStatus === 'failed'
                  && 'An error occurred. Please try again.')}
            </p>
          </div>
          <div className="mb-4">
            <span
              htmlFor="email"
              className="text-sm text-gray-600 font-merriweather"
            >
              Email
            </span>
            <input
              type="email"
              id="email"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <span
              htmlFor="password"
              className="text-sm text-gray-600 font-merriweather"
            >
              Password
            </span>
            <input
              type="password"
              id="password"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="********"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className={`w-full py-2 px-4 bg-yellow-400 text-white rounded-md focus:outline-none hover:bg-yellow-500 ${
                loginLoading ? 'cursor-not-allowed' : ''
              }`}
              disabled={loginLoading}
            >
              {loginLoading ? 'Logging in...' : 'Sign In'}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600 font-merriweather">
          New to MicroCommerce?
          {' '}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 focus:text-blue-700"
          >
            Create account
          </Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
