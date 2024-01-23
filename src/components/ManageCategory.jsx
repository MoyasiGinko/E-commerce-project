// CategoryManagement.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTradeCategories,
  createTradeCategory,
  updateTradeCategory,
  deleteTradeCategory,
} from '../redux/reducers/categorySlice';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);

  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchTradeCategories());
  }, [dispatch]);

  const handleCreateCategory = () => {
    dispatch(createTradeCategory([{ name: newCategory }]))
      .then(() => setNewCategory(''))
      .catch((err) => console.error('Error creating category:', err));
    console.log('newCategory', newCategory);
  };

  const handleUpdateCategory = () => {
    if (editingCategory) {
      dispatch(
        updateTradeCategory({
          categoryId: editingCategory.id,
          updatedCategory: { name: editingCategory.name },
        })
      )
        .then(() => setEditingCategory(null))
        .catch((err) => console.error('Error updating category:', err));
    }
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteTradeCategory(categoryId)).catch((err) =>
        console.error('Error deleting category:', err)
      );
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory({ ...category, originalName: category.name });
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleInputChange = (e) => {
    setEditingCategory({
      ...editingCategory,
      name: e.target.value,
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Trade Categories</h2>
      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className="border-b border-gray-200 py-2 flex items-center justify-between"
          >
            {editingCategory && editingCategory.id === category.id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={handleInputChange}
                  className="mr-2 px-2 py-1 border border-gray-300"
                />
                <button
                  onClick={handleUpdateCategory}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="ml-2 px-2 py-1 border border-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="mr-2">{category.name}</span>
                <button
                  onClick={() => handleEditCategory(category)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="ml-2 px-2 py-1 border border-red-500 text-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Create New Category</h3>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="mr-2 px-2 py-1 border border-gray-300 flex-grow"
          />
          <button
            onClick={handleCreateCategory}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
