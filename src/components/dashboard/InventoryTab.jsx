import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchInventory,
  addInventoryItem,
  deleteInventoryItem,
} from '../../redux/reducers/inventorySlice';
import { getUserId } from '../../utils/userStorage';

const InventoryTab = () => {
  const [loading, setLoading] = useState(true);
  const [newItemData, setNewItemData] = useState({
    productName: '',
    quantity: 0,
  }); // State for new item form
  const dispatch = useDispatch();
  const inventoryItems = useSelector((state) => state.inventory.items);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserId();
        // Fetch all inventory items for the current user (vendor)
        await dispatch(fetchInventory(userId));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inventory:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDeleteInventory = async (inventoryId) => {
    try {
      await dispatch(deleteInventoryItem(inventoryId));
    } catch (error) {
      console.error('Error deleting inventory item:', error.message);
    }
  };

  const handleAddItem = async () => {
    try {
      await dispatch(addInventoryItem(newItemData));
      // Clear the form after successful addition
      setNewItemData({ productName: '', quantity: 0 });
    } catch (error) {
      console.error('Error adding inventory item:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* New Item Form */}
      <div>
        <h2>Add New Inventory Item</h2>
        <label>
          Product Name:
          <input
            type="text"
            value={newItemData.productName}
            onChange={(e) =>
              setNewItemData({ ...newItemData, productName: e.target.value })
            }
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={newItemData.quantity}
            onChange={(e) =>
              setNewItemData({
                ...newItemData,
                quantity: parseInt(e.target.value, 10) || 0,
              })
            }
          />
        </label>
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
      </div>

      {/* Inventory Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {inventoryItems.map((inventoryItem) => (
          <div key={inventoryItem.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              {inventoryItem.productName}
            </h2>
            <p className="text-gray-500 mb-2">{`Quantity: ${inventoryItem.quantity}`}</p>
            <Link
              to={`/inventory/edit/${inventoryItem.id}`}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Edit
            </Link>
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
