import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/reducers/auth/logoutSlice';
import FooterToolbar from './FooterToolbar';
import { getUserRole, getUserName } from '../utils/userStorage';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const role = getUserRole();
  const userName = getUserName() || 'Guest';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminLinks = [
    { path: '/trade', text: 'Home' },
    { path: '/trade/reserve', text: 'Add to Cart' },
    { path: '/trade/reservations', text: 'Shopping Cart' },
    { path: '/trade/add', text: 'Add Product' },
    { path: '/trade/delete', text: 'Delete Product' },
  ];

  const userLinks = [
    { path: '/trade', text: 'Home' },
    { path: '/trade/reserve', text: 'Reserve' },
    { path: '/trade/reservations', text: 'My Reservations' },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const headerStyle = {
    fontFamily: 'Dancing Script',
  };

  const toggleMenu = () => {
    setMenu(!menu);
    setShowProfileOptions(false);
  };

  const closeMenu = () => {
    setMenu(false);
    setShowProfileOptions(false);
  };

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={toggleMenu}
        className="items-start p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden
         hover:bg-gray-100 focus:outline-none focus:ring-2
         focus:ring-gray-200
         dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        style={{ position: 'absolute', margin: 0 }}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="default-sidebar"
        aria-label="Sidebar"
        className={`fixed top-0 left-0 z-40 w-full h-screen bg-#f2f2f2 transition-transform sm:relative sm:w-64 ${
          menu ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        <nav className="h-screen flex flex-col justify-between items-center border-e-2 p-3">
          <div className="flex flex-col items-center">
            <h1
              className="text-3xl mt-4 -rotate-6 text-bold underline"
              style={headerStyle}
            >
              MicroCommerce
            </h1>
            <div className="text-lg font-semibold text-#000000 mt-2">
              {userName}
            </div>
            <div
              className="text-xs text-gray-500 mt-1 cursor-pointer relative"
              onClick={toggleProfileOptions}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  toggleProfileOptions();
                }
              }}
              role="button"
              tabIndex={0}
            >
              {role}
              {' '}
              User
              <span className="ml-1">&#9660;</span>
              {/* Dropdown menu content */}
              {showProfileOptions && (
                <div className="bg-white border mt-1 p-2 rounded-md absolute top-8 right-0">
                  <div
                    role="button"
                    tabIndex={0}
                    className="text-sm text-gray-700 cursor-pointer hover:text-indigo-600"
                    onClick={() => {
                      navigate('/profile');
                      closeMenu();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        navigate('/profile');
                        closeMenu();
                      }
                    }}
                  >
                    Profile
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    className="text-sm text-gray-700 cursor-pointer hover:text-indigo-600"
                    onClick={() => {
                      navigate('/account');
                      closeMenu();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        navigate('/account');
                        closeMenu();
                      }
                    }}
                  >
                    Account
                  </div>
                </div>
              )}
            </div>
          </div>
          {role === 'admin' && (
            <>
              <div className="navbar-nav mt-4">
                <ul className="space-y-4">
                  {adminLinks.map((link) => (
                    <li key={link.path}>
                      <button
                        type="button"
                        className="text-lg font-semibold text-#000000 hover:bg-#146eb4 hover:text-#f2f2f2 w-full px-4 py-2 rounded-full"
                        onClick={() => {
                          navigate(link.path);
                          closeMenu();
                        }}
                      >
                        {link.text}
                      </button>
                    </li>
                  ))}
                  <button
                    type="button"
                    className="text-lg font-semibold text-#000000 hover:bg-#146eb4 hover:text-#f2f2f2 w-full px-4 py-2 rounded-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </ul>
              </div>
            </>
          )}
          {role === 'user' && (
            <>
              <div className="navbar-nav mt-4">
                <ul className="space-y-4">
                  {userLinks.map((link) => (
                    <li key={link.path}>
                      <button
                        type="button"
                        className="text-lg font-semibold text-#000000 hover:bg-#146eb4 hover:text-#f2f2f2 w-full px-4 py-2 rounded-full"
                        onClick={() => {
                          navigate(link.path);
                          closeMenu();
                        }}
                      >
                        {link.text}
                      </button>
                    </li>
                  ))}
                  <button
                    type="button"
                    className="text-lg font-semibold text-#000000 hover:bg-#146eb4 hover:text-#f2f2f2 w-full px-4 py-2 rounded-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </ul>
              </div>
            </>
          )}
          <FooterToolbar />
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
