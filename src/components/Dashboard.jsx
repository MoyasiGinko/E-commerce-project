// Dashboard.js
import React, { useState } from 'react';
import InventoryTab from './dashboard/InventoryTab';
import HealthComponent from './dashboard/HealthCheck';
import ProfileTab from './dashboard/ProfileTab';
import { getUserRole } from '../utils/userStorage';

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
    <div className="max-w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-semibold mb-6">User Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        {userRole === 'VENDOR' && (
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`py-2 px-4 rounded-md focus:outline-none ${
              activeTab === 'inventory'
                ? 'bg-green-500 text-white'
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
              activeTab === 'health'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200'
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
