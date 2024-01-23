// CategoryManagement.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTradeCategories,
  createTradeCategory,
  getTradeCategoryById,
  updateTradeCategory,
  deleteTradeCategory,
} from '../redux/reducers/categorySlice';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    // Fetch categories on component mount
    dispatch(fetchTradeCategories());
  }, [dispatch]);

  const handleCreateCategory = async () => {
    try {
      const response = await dispatch(
        createTradeCategory([{ name: newCategoryName }])
      );
      const newCategories = response.payload;
      dispatch(fetchTradeCategories());
      setNewCategoryName('');
      console.log('New categories:', newCategories);
    } catch (error) {
      console.error('Error creating category:', error.message);
    }
  };

  const handleEditCategory = async (categoryId) => {
    try {
      const category = await dispatch(getTradeCategoryById(categoryId));
      setSelectedCategoryId(category.id);
      setNewCategoryName(category.name || ''); // Ensure the value is not undefined
      console.log('Selected category:', category);
      console.log('Selected category ID:', selectedCategoryId);
    } catch (error) {
      console.error('Error fetching category by ID:', error.message);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      if (selectedCategoryId) {
        await dispatch(
          updateTradeCategory({
            categoryId: selectedCategoryId,
            updatedCategory: { name: newCategoryName },
          })
        );
        // Refetch categories after the update
        dispatch(fetchTradeCategories());
        setSelectedCategoryId(null);
        setNewCategoryName('');
      }
    } catch (error) {
      console.error('Error updating category:', error.message);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteTradeCategory(categoryId));
  };

  return (
    <div className="category-management">
      <h2>Product Category Management</h2>

      {/* Create new category */}
      <div className="category-form">
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleCreateCategory}>Create Category</button>
      </div>

      {/* List existing categories */}
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id}>
            <div className="category-info">
              <span>{category.name}</span>
              <div className="category-actions">
                <button onClick={() => handleEditCategory(category.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteCategory(category.id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Update category */}
      {selectedCategoryId && (
        <div className="category-form">
          <input
            type="text"
            placeholder="Updated Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button onClick={handleUpdateCategory}>Update Category</button>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
