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
      .then(() => {
        setNewCategory('');
        dispatch(fetchTradeCategories());
      })
      .catch((err) => console.error('Error creating category:', err));
  };

  const handleUpdateCategory = () => {
    if (editingCategory) {
      dispatch(
        updateTradeCategory({
          categoryId: editingCategory.id,
          updatedCategory: { name: editingCategory.name },
        }),
      )
        .then(() => {
          setEditingCategory(null);
          dispatch(fetchTradeCategories());
        })
        .catch((err) => console.error('Error updating category:', err));
    }
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteTradeCategory(categoryId))
        .then(() => {
          dispatch(fetchTradeCategories());
        })
        .catch((err) => console.error('Error deleting category:', err));
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
    <div className="max-w-screen-xl mx-auto mt-8 p-4">
      <div className="mb-4">
        <h2 className="text-3xl font-bold">Shop by Category</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 mb-4"
          >
            {editingCategory && editingCategory.id === category.id ? (
              <div className="flex flex-col mb-4">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={handleInputChange}
                  className="mb-2 px-2 py-1 border border-gray-300 w-full"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleUpdateCategory}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEditCategory(category)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Create New Category</h3>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="mb-2 px-4 py-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={handleCreateCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
