import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/reducers/auth/registerSlice';
import '../../styles/login.css';
import backgroundImage from '../../assets/images/bg-ecom-2.jpg';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [type, setType] = useState('CUSTOMER'); // Default to 'customer'

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerStatus = useSelector((state) => state.register.status);
  // const registerError = useSelector((state) => state.register.error);
  const registerLoading = useSelector(
    (state) => state.register.status === 'loading',
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      username: name,
      email,
      password,
      type,
    };

    try {
      await dispatch(registerUser(user));
      // If registration is successful, redirect to login page
      navigate('/login');
    } catch (error) {
      // Handle registration error
      console.error('Registration failed. Error:', error);

      // Display the error message to the user using react-toastify
      toast.error(
        error.response
          ? error.response.data.error.message
          : 'An unexpected error occurred. Please try again.',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
    }

    setName('');
    setEmail('');
    setPass('');
  };

  useEffect(() => {
    if (registerStatus === 'success') {
      navigate('/login');
    }
  }, [registerStatus, navigate]);

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
          Create Account
        </h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <span
              htmlFor="username"
              className="text-sm text-gray-600 font-merriweather"
            >
              Your Name
            </span>
            <input
              type="text"
              id="username"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
          <div className="mb-4">
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
          <div className="mb-4">
            <span
              htmlFor="userType"
              className="text-sm text-gray-600 font-merriweather"
            >
              Account Type
            </span>
            <select
              id="userType"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="VENDOR">Vendor</option>
            </select>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className={`w-full py-2 px-4 bg-yellow-400 text-white rounded-md focus:outline-none hover:bg-yellow-500 ${
                registerLoading ? 'cursor-not-allowed' : ''
              }`}
              disabled={registerLoading}
            >
              {registerLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600 font-merriweather">
          Already have an account?
          {' '}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 focus:text-blue-700"
          >
            Sign In
          </Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
