import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchInventory,
  deleteInventoryItem,
  addInventoryItem,
} from '../../redux/reducers/inventorySlice';
import { getUserId } from '../../utils/userStorage';

const InventoryTab = () => {
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();
  const inventoryItems = useSelector((state) => state.inventory.items);

  // Sample products array (replace this with your actual data fetching logic)
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ];

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
        quantity,
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

  return (
    <div>
      {/* Dropdown to select a product */}
      <select onChange={(e) => handleProductChange(JSON.parse(e.target.value))}>
        <option value="" disabled selected>
          Select a Product
        </option>
        {/* Map through products to create options */}
        {products.map((product) => (
          <option key={product.id} value={JSON.stringify(product)}>
            {product.name}
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
