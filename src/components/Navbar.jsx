import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/reducers/auth/logoutSlice';
import FooterToolbar from './FooterToolbar';
import { getUserRole, getUserName } from '../utils/userStorage';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // Set initial screen size
  const role = getUserRole();
  const userName = getUserName() || 'Guest';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeNavbar = () => {
    setMenu(false);
    setShowProfileOptions(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenu(!menu);
    setShowProfileOptions(false);
  };

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleResize = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    // Set up event listener for resizing
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dropdownItems = [
    {
      text: 'Dashboard',
      path: '/trade/dashboard',
      onClick: () => {
        navigate('/trade/dashboard');
        closeNavbar();
      },
    },
  ];

  const headerStyle = {
    fontFamily: 'Dancing Script',
  };

  const roleLinks = {
    ADMIN: [
      { path: '/trade', text: 'Home' },
      { path: '/trade/reserve', text: 'Categories' },
      { path: '/trade/manage-category', text: 'Manage Category' },
      { text: 'Logout', onClick: handleLogout },
    ],
    VENDOR: [
      { path: '/trade', text: 'Home' },
      { path: '/trade/edit-product', text: 'Edit' },
      { path: '/trade/add', text: 'Add' },
      { path: '/trade/delete', text: 'Delete' },
      { text: 'Logout', onClick: handleLogout },
    ],
    CUSTOMER: [
      { path: '/trade', text: 'Home' },
      { path: '/trade/reserve', text: 'Categories' },
      { path: '/trade/reservations', text: 'Shopping Cart' },
      { text: 'Logout', onClick: handleLogout },
    ],
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        aria-label="Toggle Menu"
        type="button"
        onClick={toggleMenu}
        className="fixed top-0 left-0 p-2 text-sm text-gray-500 rounded-lg sm:hidden
          hover:bg-gray-100 focus:outline-none focus:ring-2
          focus:ring-gray-200
          dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        style={{
          zIndex: 1000, // Ensure it's above other elements
        }}
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
        className={`fixed top-0 left-0 z-50 w-full h-screen bg-gray-800 transition-transform sm:relative sm:w-64 ${
          menu ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        {!isDesktop && (
          <button
            type="button"
            onClick={closeNavbar}
            className="absolute top-2 right-2 text-white cursor-pointer flex items-center z-60"
          >
            {/* Close Icon */}
            {/* <svg
              className="w-4 h-4"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg> */}
          </button>
        )}
        <nav className="h-screen flex flex-col justify-between items-center border-e-2 p-3">
          <div className="flex flex-col items-center">
            <h1
              className="text-3xl mt-4 -rotate-6 text-bold underline font-bold text-white"
              style={headerStyle}
            >
              MicroCommerce
            </h1>
            <div className="text-lg font-semibold text-gray-300 mt-2">
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
              -User
              <span className="ml-1">&#9660;</span>
              {/* Dropdown menu content */}
              {showProfileOptions && (
                <div className="bg-white border mt-1 p-2 rounded-md absolute top-8 right-0">
                  {dropdownItems.map((item) => (
                    <div
                      key={item.text}
                      role="button"
                      tabIndex={0}
                      className="text-sm text-gray-700 cursor-pointer hover:text-indigo-600"
                      onClick={item.onClick}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          item.onClick();
                        }
                      }}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="navbar-nav mt-4">
            <ul className="space-y-4">
              {role
              && (role === 'ADMIN' || role === 'VENDOR' || role === 'CUSTOMER') ? (
                  roleLinks[role].map((link) => (
                    <li key={link.path}>
                      <button
                        type="button"
                        className="text-lg font-semibold text-gray-300 hover:bg-gray-700 hover:text-red-600 w-full px-4 py-2 rounded-full"
                        onClick={() => {
                          if (link.onClick) {
                            link.onClick();
                          } else {
                            navigate(link.path);
                          }
                          closeNavbar(); // Close the navbar upon selecting any navbar item
                        }}
                      >
                        {link.text}
                      </button>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <button
                        type="button"
                        className="text-lg font-semibold text-gray-300 hover:bg-gray-700 hover:text-red-600 w-full px-4 py-2 rounded-full"
                        onClick={() => navigate('/trade')}
                      >
                        Home
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="text-lg font-semibold text-gray-300 hover:bg-gray-700 hover:text-red-600 w-full px-4 py-2 rounded-full"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
            </ul>
          </div>
          <FooterToolbar />
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
