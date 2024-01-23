// Import necessary dependencies and actions
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchInventory,
  deleteInventoryItem,
  addInventoryItem,
  updateInventoryItem,
} from '../../redux/reducers/inventorySlice';
import { fetchTrades } from '../../redux/reducers/tradesSlice';
import { getUserId } from '../../utils/userStorage';

// Define the InventoryTab component
const InventoryTab = () => {
  // State variables for component
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [quantity, setQuantity] = useState(0);

  // Redux hooks to dispatch actions and retrieve state
  const dispatch = useDispatch();
  const inventoryItems = useSelector((state) => state.inventory.items);
  const trades = useSelector((state) => state.trades.trades);

  // Fetch data on component mount
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

  // Handle deleting an inventory item
  const handleDeleteInventory = async (inventoryId) => {
    try {
      await dispatch(deleteInventoryItem(inventoryId));
    } catch (error) {
      console.error('Error deleting inventory item:', error.message);
    }
  };

  // Handle selecting a product from the dropdown
  const handleProductChange = (selectedProduct) => {
    setSelectedProductId(selectedProduct.id);
    setSelectedProductName(selectedProduct.name);
    // Set the quantity based on the selected product
    const selectedProductInInventory = inventoryItems.find(
      (item) => item.productId === selectedProduct.id
    );
    setQuantity(
      selectedProductInInventory ? selectedProductInInventory.quantity : 0
    );
  };

  // Handle adding an inventory item
  const handleAddInventory = async () => {
    // Check if the selected product is already in the inventory
    const isProductInInventory = inventoryItems.some(
      (item) => item.productId === selectedProductId
    );

    if (isProductInInventory) {
      // Show alert if the product is already in the inventory
      alert('Selected product is already in the inventory.');
    } else {
      try {
        const inventoryData = {
          productId: selectedProductId,
          productName: selectedProductName,
          quantity,
        };

        await dispatch(addInventoryItem(inventoryData));
        // Reset the form after adding
        setSelectedProductId('');
        setSelectedProductName('');
        setQuantity(0);
      } catch (error) {
        console.error('Error adding inventory item:', error.message);
      }
    }
  };

  // Handle entering edit mode for an inventory item
  const handleEditInventory = (inventoryId) => {
    // Set editing mode and item id
    setIsEditing(true);
    setEditingItemId(inventoryId);

    // Find the inventory item by id
    const editedItem = inventoryItems.find((item) => item.id === inventoryId);

    // Set the state with the values from the inventory item
    setSelectedProductId(editedItem.productId);
    setSelectedProductName(editedItem.productName);
    setQuantity(editedItem.quantity);
  };

  // Handle updating an inventory item
  const handleUpdateInventory = async (inventoryId) => {
    try {
      const updatedData = {
        productName: selectedProductName,
        quantity,
      };

      await dispatch(updateInventoryItem({ inventoryId, updatedData }));
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

  // Handle canceling the edit mode
  const handleCancelEdit = () => {
    // Reset editing state
    setIsEditing(false);
    setEditingItemId(null);
    setSelectedProductId('');
    setSelectedProductName('');
    setQuantity(0);
  };

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  // Render the component
  return (
    <div>
      <div className="mb-4">
        <select
          value={selectedProductId}
          onChange={(e) => handleProductChange(JSON.parse(e.target.value))}
        >
          <option value="" disabled>
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
      </div>

      <button
        type="button"
        onClick={handleAddInventory}
        disabled={!selectedProductId}
        className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 ${
          !selectedProductId && 'opacity-50 cursor-not-allowed'
        }`}
      >
        Add Inventory
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {inventoryItems.map((inventoryItem) => (
          <div key={inventoryItem.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              {inventoryItem.productName}
            </h2>
            <p className="text-gray-500 mb-2">{`Quantity: ${inventoryItem.quantity}`}</p>

            {isEditing && editingItemId === inventoryItem.id ? (
              <div className="mb-4">
                {/* Editing controls */}
                <input
                  type="text"
                  value={selectedProductName}
                  onChange={(e) => setSelectedProductName(e.target.value)}
                  placeholder="Product Name"
                  className="mr-2"
                />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                  className="mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleUpdateInventory(inventoryItem.id)}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex">
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
