import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrades } from '../redux/reducers/tradesSlice';
import loadingImage from '../assets/images/loading.gif';
import TopSellersSlider from './ProductSlide';
import SuggestionTab from './SuggestCategory';
import cartImage from '../assets/images/bg-ecom-4.jpg';
import { getUserRole } from '../utils/userStorage';

const userRole = getUserRole();

const TradesList = () => {
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trades);
  const loading = useSelector((state) => state.trades.loading);
  const error = useSelector((state) => state.trades.error);

  // const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  // const handleSearch = () => {
  //   // Implement search functionality if needed
  //   console.log('Searching for:', searchTerm);
  // };

  const handleExploreClick = () => {
    // Scroll to the next section
    const nextSection = document.getElementById('productListSection');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-8">
        <img src={loadingImage} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-600">
        Error:
        {error}
      </div>
    );
  }

  console.log('Fetched products', trades);

  return (
    <div
      className="container mx-auto mt-0"
      style={{ fontFamily: 'Merriweather, sans-serif' }}
    >
      {/* Cart Image Section */}
      <div className="relative h-screen flex flex-col items-center justify-center">
        <img
          src={cartImage}
          alt="Cart"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-white mb-8">
            Welcome to Our Online Store
          </div>
          <button
            type="button"
            className="border-2 border-white text-white font-bold hover:text-red-600 hover:border-red-600 focus:outline-none transition duration-300 px-6 py-3 rounded-md font-semibold text-lg bg-transparent"
            onClick={handleExploreClick}
          >
            Explore
          </button>
        </div>
      </div>

      {/* TopSellerSlider */}
      <div className="mt-8">
        <TopSellersSlider />
      </div>

      {/* Product List Section */}
      <div
        id="productListSection"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 p-4 mt-8"
      >
        {Array.isArray(trades) && trades.length > 0 ? (
          trades.map((trade) => (
            <Link
              key={trade.id}
              to={`/trade/${trade.id}`}
              className="bg-white overflow-hidden border border-gray-200 rounded-md p-4 transition-transform transform hover:scale-105"
            >
              <div
                style={{
                  backgroundImage: `url(${trade.imageURL})`,
                  height: '200px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="bg-cover bg-center bg-no-repeat h-48 mb-4 rounded-md"
              />
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-row justify-between">
                    <p className="flex items-center text-sm text-gray-500 mb-1">
                      {trade.category
                        ? trade.category.name
                        : 'Unknown Category'}
                    </p>
                    <p className="flex items-center text-sm text-gray-500 mb-1">
                      {trade.brand}
                    </p>
                  </div>
                  <h5 className="text-lg font-semibold mb-2">{trade.name}</h5>
                  <p className="text-red-500 text-base font-bold">{`$${trade.price}`}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      {/* Suggestion Tab */}
      {userRole === 'CUSTOMER' && (
        <div className="mt-8">
          <SuggestionTab />
        </div>
      )}
    </div>
  );
};

export default TradesList;
