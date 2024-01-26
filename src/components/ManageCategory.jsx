import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const showToast = (message, type = 'success') => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const handleCreateCategory = () => {
    dispatch(createTradeCategory([{ name: newCategory }]))
      .then(() => {
        setNewCategory('');
        dispatch(fetchTradeCategories());
        showToast('Category created successfully');
      })
      .catch((err) => {
        console.error('Error creating category:', err);
        showToast('Error creating category', 'error');
      });
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
          showToast('Category updated successfully');
        })
        .catch((err) => {
          console.error('Error updating category:', err);
          showToast('Error updating category', 'error');
        });
    }
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteTradeCategory(categoryId))
        .then(() => {
          dispatch(fetchTradeCategories());
          showToast('Category deleted successfully');
        })
        .catch((err) => {
          console.error('Error deleting category:', err);
          showToast('Error deleting category', 'error');
        });
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
        <h2 className="text-3xl font-bold">Manage Category</h2>
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
                  className="mb-2 px-4 py-2 border border-gray-300 w-full rounded focus:outline-none focus:border-blue-500"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleUpdateCategory}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-500 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-300"
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
                    className="bg-gray-500 text-white px-4 py-2 rounded font-bold hover:bg-violet-500 focus:outline-none focus:ring focus:border-gray-300"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
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
            className="mb-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
          />
          <button
            type="button"
            onClick={handleCreateCategory}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-red-500 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CategoryManagement;
