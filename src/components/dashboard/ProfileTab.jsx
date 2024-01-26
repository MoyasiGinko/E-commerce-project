import React from 'react';
import {
  getUserName,
  getUserRole,
  getUserEmail,
} from '../../utils/userStorage';
import logoImage from '../../assets/images/cart2.gif'; // Replace with the path to your logo image

const UserProfileTab = () => {
  const currentUser = {
    user: {
      name: getUserName(),
      email: getUserEmail(),
      role: getUserRole(),
    },
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white bg-opacity-80 shadow-md rounded-md">
      {/* Adjust the bg-opacity value to control transparency */}
      <h1 className="text-4xl font-semibold mb-8">User Profile</h1>
      <div className="flex items-center space-x-8 mb-8">
        <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
          {/* Replace this with your logo image */}
          <img src={logoImage} alt="Logo" className="w-16 h-16 object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{currentUser.user.name}</h2>
          <p className="text-green-600 font-bold text-xl">
            {currentUser.user.role}
          </p>
          <p className="text-gray-500 text-lg">{currentUser.user.email}</p>
        </div>
      </div>
      {/* Additional user information or actions can be added here */}
    </div>
  );
};

export default UserProfileTab;
