import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchInventory,
  deleteInventoryItem,
  addInventoryItem,
  updateInventoryItem,
  fetchInventoryById,
} from '../../redux/reducers/inventorySlice';
import { fetchTrades } from '../../redux/reducers/tradesSlice';
import { getUserId } from '../../utils/userStorage';

const InventoryTab = () => {
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  const dispatch = useDispatch();
  const inventoryItems = useSelector((state) => state.inventory.items);
  const trades = useSelector((state) => state.trades.trades);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserId();
        await dispatch(fetchInventory(userId));
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
      await dispatch(deleteInventoryItem(inventoryId));
    } catch (error) {
      console.error('Error deleting inventory item:', error.message);
    }
  };

  const handleProductChange = (selectedProduct) => {
    setSelectedProductId(selectedProduct.id);
    setSelectedProductName(selectedProduct.name);
  };

  const handleAddInventory = async () => {
    try {
      const inventoryData = {
        productId: selectedProductId,
        productName: selectedProductName,
        quantity: quantity,
      };

      await dispatch(addInventoryItem(inventoryData));
      // Reset the form after adding
      setSelectedProductId('');
      setSelectedProductName('');
      setQuantity(0);
    } catch (error) {
      console.error('Error adding inventory item:', error.message);
    }
  };

  const handleEditInventory = (inventoryId) => {
    // Fetch the inventory item by id
    dispatch(fetchInventoryById(inventoryId));
    // Set editing mode and item id
    setIsEditing(true);
    setEditingItemId(inventoryId);
  };

  const handleUpdateInventory = async () => {
    try {
      const updatedData = {
        productName: selectedProductName,
        quantity: quantity,
      };

      await dispatch(
        updateInventoryItem({ inventoryId: editingItemId, updatedData })
      );
      // Reset the form after updating
      setIsEditing(false);
      setEditingItemId(null);
      setSelectedProductId('');
      setSelectedProductName('');
      setQuantity(0);
    } catch (error) {
      console.error('Error updating inventory item:', error.message);
    }
  };

  const handleCancelEdit = () => {
    // Reset editing state
    setIsEditing(false);
    setEditingItemId(null);
    setSelectedProductId('');
    setSelectedProductName('');
    setQuantity(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <select onChange={(e) => handleProductChange(JSON.parse(e.target.value))}>
        <option value="" disabled selected>
          Select a Product
        </option>
        {trades.map((trade) => (
          <option
            key={trade.id}
            value={JSON.stringify({ id: trade.id, name: trade.name })}
          >
            {trade.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />

      {isEditing ? (
        <div>
          <button type="button" onClick={handleUpdateInventory}>
            Save
          </button>
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <button type="button" onClick={handleAddInventory}>
          Add Inventory
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {inventoryItems.map((inventoryItem) => (
          <div key={inventoryItem.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              {inventoryItem.productName}
            </h2>
            <p className="text-gray-500 mb-2">{`Quantity: ${inventoryItem.quantity}`}</p>

            {isEditing && editingItemId === inventoryItem.id ? (
              <div>
                {/* Editing controls */}
                <button
                  type="button"
                  onClick={() => handleUpdateInventory(inventoryItem.id)}
                >
                  Save
                </button>
                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                {/* Non-editing controls */}
                <button
                  type="button"
                  onClick={() => handleEditInventory(inventoryItem.id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteInventory(inventoryItem.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryTab;
