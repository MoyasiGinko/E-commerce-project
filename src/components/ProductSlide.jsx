import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TopSellersSlider = () => {
  const [topSellers, setTopSellers] = useState([]);
  const allTrades = useSelector((state) => state.trades.trades);

  useEffect(() => {
    // Shuffle the array of all trades to simulate randomness
    const shuffledTrades = [...allTrades].sort(() => 0.5 - Math.random());

    // Select the top 6 trades for the slider
    const topSellers = shuffledTrades.slice(0, 6);
    setTopSellers(topSellers);
  }, [allTrades]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Top Sellers</h2>
      <Slider
        dots={sliderSettings.dots}
        infinite={sliderSettings.infinite}
        speed={sliderSettings.speed}
        slidesToShow={sliderSettings.slidesToShow}
        slidesToScroll={sliderSettings.slidesToScroll}
      >
        {topSellers.map((trade) => (
          <Link
            key={trade.id}
            to={`/trade/${trade.id}`}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer relative border border-gray-200"
          >
            <div className="relative">
              <img
                src={trade.imageURL}
                alt={trade.name}
                className="w-full h-96 object-fit rounded-t"
              />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-sm text-teal-50 drop-shadow-md">
                  {trade.category.name}
                </p>
                <h3 className="text-xl font-bold text-teal-50 drop-shadow-md">
                  {trade.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default TopSellersSlider;
