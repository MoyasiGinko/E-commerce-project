import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchInventory,
  deleteInventoryItem,
  addInventoryItem,
} from '../../redux/reducers/inventorySlice';
import { fetchTrades } from '../../redux/reducers/tradesSlice'; // Import the fetchTrades action
import { getUserId } from '../../utils/userStorage';

const InventoryTab = () => {
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();
  const inventoryItems = useSelector((state) => state.inventory.items);
  const trades = useSelector((state) => state.trades.trades); // Fetch trades from the trades slice

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserId();
        // Fetch all inventory items for the current user (vendor)
        await dispatch(fetchInventory(userId));
        // Fetch trades and store them in the products array
        await dispatch(fetchTrades());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDeleteInventory = async (inventoryId) => {
    try {
      // Delete the inventory item
      await dispatch(deleteInventoryItem(inventoryId));
    } catch (error) {
      console.error('Error deleting inventory item:', error.message);
    }
  };

  const handleProductChange = (selectedProduct) => {
    // Update state with selected product information
    setSelectedProductId(selectedProduct.id);
    setSelectedProductName(selectedProduct.name);
  };

  const handleAddInventory = async () => {
    try {
      // Create inventory data based on selected product and quantity
      const inventoryData = {
        productId: selectedProductId,
        productName: selectedProductName,
        quantity: quantity,
      };

      // Add the inventory item
      await dispatch(addInventoryItem(inventoryData));
    } catch (error) {
      console.error('Error adding inventory item:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  console.log('Inventory Items:', inventoryItems);
  console.log('Trades:', trades[3].name);

  return (
    <div>
      {/* Dropdown to select a product */}
      <select onChange={(e) => handleProductChange(JSON.parse(e.target.value))}>
        <option value="" disabled selected>
          Select a Product
        </option>
        {/* Map through trades to create options */}
        {trades.map((trade) => (
          <option
            key={trade.id}
            value={JSON.stringify({ id: trade.id, name: trade.name })}
          >
            {trade.name}
          </option>
        ))}
      </select>

      {/* Input for quantity */}
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />

      {/* Button to add inventory */}
      <button type="button" onClick={handleAddInventory}>
        Add Inventory
      </button>

      {/* Display existing inventory items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {inventoryItems.map((inventoryItem) => (
          <div key={inventoryItem.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              {inventoryItem.productName}
            </h2>
            <p className="text-gray-500 mb-2">{`Quantity: ${inventoryItem.quantity}`}</p>
            {/* Link to the edit page with the inventory item ID as a parameter */}
            <Link
              to={`/inventory/edit/${inventoryItem.id}`}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Edit
            </Link>
            {/* Button to delete the inventory item */}
            <button
              type="button"
              onClick={() => handleDeleteInventory(inventoryItem.id)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryTab;
