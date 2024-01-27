// SuggestionTab.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSuggestions } from '../redux/reducers/suggestionSlice';
import { getUserId } from '../utils/userStorage';

const SuggestionTab = () => {
  const dispatch = useDispatch();
  const userId = getUserId();
  const { categories, status, loading, error } = useSelector(
    (state) => state.suggestion
  );

  useEffect(() => {
    dispatch(fetchUserSuggestions(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return (
      <p>
        Error:
        {error}
      </p>
    );
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Trending Choices</h2>

      {status === 'loading' && (
        <div className="text-gray-600">Loading suggestions...</div>
      )}

      {status === 'failed' && (
        <div className="text-red-600">
          Error fetching suggestions:
          {error}
        </div>
      )}

      {status === 'succeeded' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-blue-100 p-4 rounded-md shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              {/* You can add more information or styling for each category here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestionTab;
