import React from 'react';
import {
  getUserName,
  getUserRole,
  getUserEmail,
} from '../../utils/userStorage';

const UserProfileTab = () => {
  const currentUser = {
    user: {
      name: getUserName(),
      email: getUserEmail(),
      role: getUserRole(),
    },
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-semibold mb-6">User Profile</h1>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
          {/* You can add a user profile picture here */}
          <img
            src={currentUser.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{currentUser.user.name}</h2>
          <p className="text-gray-500">{currentUser.user.role}</p>
          <p className="text-gray-500">{currentUser.user.email}</p>
        </div>
      </div>
      {/* Additional user information or actions can be added here */}
    </div>
  );
};

export default UserProfileTab;
