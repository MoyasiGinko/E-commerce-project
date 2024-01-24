import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchInventory,
  deleteInventoryItem,
  addInventoryItem,
  updateInventoryItem,
} from '../../redux/reducers/inventorySlice';
import { fetchTrades } from '../../redux/reducers/tradesSlice';
import { getUserId } from '../../utils/userStorage';

const InventoryTab = () => {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [quantity, setQuantity] = useState(0);

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
      toast.success('Inventory item deleted successfully');
    } catch (error) {
      console.error('Error deleting inventory item:', error.message);
      toast.error('Error deleting inventory item');
    }
  };

  const handleProductChange = (e) => {
    const selectedProduct = JSON.parse(e.target.value);
    setSelectedProductId(selectedProduct.id);
    setSelectedProductName(selectedProduct.name);

    const selectedProductInInventory = inventoryItems.find(
      (item) => item.productId === selectedProduct.id,
    );

    setQuantity(
      selectedProductInInventory ? selectedProductInInventory.quantity : 0,
    );
  };

  const handleAddInventory = async () => {
    const isProductInInventory = inventoryItems.some(
      (item) => item.productId === selectedProductId,
    );

    if (isProductInInventory) {
      toast.error('Selected product is already in the inventory.');
    } else {
      try {
        const inventoryData = {
          productId: selectedProductId,
          productName: selectedProductName,
          quantity,
        };

        await dispatch(addInventoryItem(inventoryData));
        setSelectedProductId('');
        setSelectedProductName('');
        setQuantity(0);

        toast.success('Inventory item added successfully');
      } catch (error) {
        console.error('Error adding inventory item:', error.message);
        toast.error('Error adding inventory item');
      }
    }
  };

  const handleEditInventory = (inventoryId) => {
    setIsEditing(true);
    setEditingItemId(inventoryId);

    const editedItem = inventoryItems.find((item) => item.id === inventoryId);

    setSelectedProductId(editedItem.productId);
    setSelectedProductName(editedItem.productName);
    setQuantity(editedItem.quantity);
  };

  const handleUpdateInventory = async (inventoryId) => {
    try {
      const updatedData = {
        productName: selectedProductName,
        quantity,
      };

      await dispatch(updateInventoryItem({ inventoryId, updatedData }));
      setIsEditing(false);
      setEditingItemId(null);
      setSelectedProductId('');
      setSelectedProductName('');
      setQuantity(0);

      toast.success('Inventory item updated successfully');
    } catch (error) {
      console.error('Error updating inventory item:', error.message);
      toast.error('Error updating inventory item');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingItemId(null);
    setSelectedProductId('');
    setSelectedProductName('');
    setQuantity(0);
  };

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4">
        <select
          value={
            selectedProductId
              ? JSON.stringify({
                id: selectedProductId,
                name: selectedProductName,
              })
              : ''
          }
          onChange={handleProductChange}
          className="py-2 px-4 border rounded bg-gray-100"
        >
          {!selectedProductId && (
            <option value="" disabled>
              Select a Product
            </option>
          )}
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
        className={`bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mb-4 ${
          !selectedProductId && 'opacity-50 cursor-not-allowed'
        }`}
      >
        Add to Inventory
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {inventoryItems.map((inventoryItem) => (
          <div
            key={inventoryItem.id}
            className="border p-4 rounded-lg bg-white shadow-md transform transition-all hover:scale-105"
          >
            <h2 className="text-lg font-semibold mb-2">
              {inventoryItem.productName}
            </h2>
            <p className="text-gray-500 mb-2">{`Quantity: ${inventoryItem.quantity}`}</p>

            {isEditing && editingItemId === inventoryItem.id ? (
              <div className="mb-4">
                <input
                  type="text"
                  value={selectedProductName}
                  onChange={(e) => setSelectedProductName(e.target.value)}
                  placeholder="Product Name"
                  className="py-2 px-4 border rounded mr-2"
                />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                  className="py-2 px-4 border rounded mr-2"
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

      {/* React Toastify container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default InventoryTab;
