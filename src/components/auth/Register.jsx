import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/reducers/auth/registerSlice';
import '../../styles/login.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerStatus = useSelector((state) => state.register.status);
  const registerError = useSelector((state) => state.register.error);
  const registerLoading = useSelector(
    (state) => state.register.status === 'loading',
  );

  const handleRegister = (e) => {
    e.preventDefault();
    const register = {
      user: {
        name,
        email,
        password,
      },
    };
    dispatch(registerUser(register));

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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <span htmlFor="username" className="text-sm text-gray-600">
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
            <span htmlFor="email" className="text-sm text-gray-600">
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
            <span htmlFor="password" className="text-sm text-gray-600">
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
            <span htmlFor="userType" className="text-sm text-gray-600">
              Account Type
            </span>
            <select
              id="userType"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="customer">Choose an option</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
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
        <p className="text-sm text-center text-gray-600">
          Already have an account?
          {' '}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 focus:text-blue-700"
          >
            Sign In
          </Link>
        </p>
        {registerStatus === 'failed' && (
          <p className="text-sm text-red-500 text-center mt-4">
            {registerError.status.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
