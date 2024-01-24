// RealTimeAlert.jsx
import React, { useState, useEffect } from 'react';
import SockJsClient from 'react-stomp';
import { getToken } from '../../utils/userStorage';

const RealTimeAlert = () => {
  const [stockAlerts, setStockAlerts] = useState([]);
  const [productAvailabilityUpdates, setProductAvailabilityUpdates] = useState(
    []
  );

  const handleWebSocketMessage = (msg) => {
    // Check the message type and update state accordingly
    if (msg.type === 'stockAlert') {
      setStockAlerts((prevAlerts) => [...prevAlerts, msg.message]);
    } else if (msg.type === 'productAvailabilityUpdate') {
      setProductAvailabilityUpdates((prevUpdates) => [
        ...prevUpdates,
        msg.update,
      ]);
    }
  };

  return (
    <div>
      <h2>Real-Time Stock Alerts</h2>

      <ul>
        {stockAlerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>

      <h2>Product Availability Updates</h2>

      <ul>
        {productAvailabilityUpdates.map((update, index) => (
          <li key={index}>{`${update.productName}: ${update.availability}`}</li>
        ))}
      </ul>

      {/* WebSocket connection */}
      <SockJsClient
        url="http://localhost:8761" // Replace with your WebSocket endpoint
        topics={['/topic/stockAlerts', '/topic/productAvailabilityUpdates']}
        onMessage={handleWebSocketMessage}
      />
    </div>
  );
};

// InventoryTab.jsx
import React, { useState, useEffect } from 'react';
import SockJsClient from 'react-stomp';
import { getToken } from '../../utils/userStorage';

const InventoryTab = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [inventoryUpdates, setInventoryUpdates] = useState([]);

  const handleWebSocketMessage = (msg) => {
    setInventoryUpdates((prevUpdates) => [...prevUpdates, msg]);

    // Assuming msg is an object with product availability update details
    if (msg.type === 'productAvailabilityUpdate') {
      // Update the product availability in your local state
      const updatedInventoryItems = inventoryItems.map((item) => {
        if (item.productId === msg.productId) {
          return {
            ...item,
            availability: msg.availability,
          };
        }
        return item;
      });

      setInventoryItems(updatedInventoryItems);
    }
  };

  const fetchInventoryData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/inventory/', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await response.json();
      setInventoryItems(data);
    } catch (error) {
      console.error('Error fetching inventory data:', error.message);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  useEffect(() => {
    fetchInventoryData();
  }, [inventoryUpdates]);

  return (
    <div>
      <h2>Inventory Tab</h2>
      {/* Render your inventory items here */}
      {inventoryItems.map((item) => (
        <div key={item.id}>
          <p>{item.productName}</p>
          <p>{`Quantity: ${item.quantity}`}</p>
          <p>{`Availability: ${item.availability}`}</p>
          {/* Add more details as needed */}
        </div>
      ))}

      {/* WebSocket connection for inventory updates */}
      <SockJsClient
        url="http://localhost:8761" // Replace with your WebSocket endpoint
        topics={['/topic/inventoryUpdates']}
        onMessage={handleWebSocketMessage}
      />
    </div>
  );
};

export { RealTimeAlert, InventoryTab };
