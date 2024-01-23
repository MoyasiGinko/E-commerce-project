// Dashboard.js
import React, { useState } from 'react';
import InventoryTab from './dashboard/InventoryTab';
import TradeOrderHistoryTab from './dashboard/TradeorderHistoryTab';
import ProfileTab from './dashboard/ProfileTab';
import MyItemsTab from './dashboard/MyItemsTab';
import { getUserRole } from '../utils/userStorage';

const Dashboard = () => {
  const userRole = getUserRole();
  const [activeTab, setActiveTab] = useState(
    userRole === 'VENDOR' ? 'MyItemsTab' : 'orderHistory'
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'inventory':
        return <InventoryTab />;
      case 'MyItemsTab':
        return <MyItemsTab />;
      case 'orderHistory':
        return <TradeOrderHistoryTab />;
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
            onClick={() => setActiveTab('MyItemsTab')}
            className={`py-2 px-4 rounded-md focus:outline-none ${
              activeTab === 'MyItemsTab'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            My Items
          </button>
        )}
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
            onClick={() => setActiveTab('orderHistory')}
            className={`py-2 px-4 rounded-md focus:outline-none ${
              activeTab === 'orderHistory'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            Order History
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
