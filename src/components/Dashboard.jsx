// Dashboard.js
import React, { useState } from 'react';
import InventoryTab from './dashboard/InventoryTab';
import HealthComponent from './dashboard/HealthCheck';
import ProfileTab from './dashboard/ProfileTab';
import { getUserRole } from '../utils/userStorage';
import backgroundImage from '../assets/images/bg-admin-3.jpg'; // Replace with the path to your background image

const Dashboard = () => {
  const userRole = getUserRole();
  const [activeTab, setActiveTab] = useState(
    userRole === 'VENDOR' ? 'inventory' : 'profile',
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'inventory':
        return <InventoryTab />;
      case 'health':
        return <HealthComponent />;
      default:
        return null;
    }
  };

  return (
    <div
      className="max-w-full mx-0 mt-0 p-6 rounded-md relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Full height
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background transparency
      }}
    >
      <h1 className="text-3xl font-semibold mb-6 text-gray-100">
        User Dashboard
      </h1>
      <div className="flex space-x-4 mb-6">
        {userRole === 'VENDOR' && (
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`py-2 px-4 rounded-md focus:outline-none ${
              activeTab === 'inventory'
                ? 'bg-violet-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            Inventory
          </button>
        )}

        {userRole === 'ADMIN' && (
          <button
            type="button"
            onClick={() => setActiveTab('health')}
            className={`py-2 px-4 rounded-md focus:outline-none ${
              activeTab === 'health' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          >
            Admin Panel
          </button>
        )}
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`py-2 px-4 rounded-md focus:outline-none ${
            activeTab === 'profile' ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
        >
          Profile
        </button>
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default Dashboard;
