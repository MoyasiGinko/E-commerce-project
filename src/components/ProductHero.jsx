import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
    slidesToShow: 1, // Show one big slide at a time
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
        responsive={sliderSettings.responsive}
      >
        {topSellers.map((trade) => (
          <div
            key={trade.id}
            className="border rounded overflow-hidden shadow-md"
          >
            <img
              src={trade.image}
              alt={trade.name}
              className="w-full h-96 object-fit rounded-t" // Adjust the height here
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {trade.name}
              </h3>
              <p className="mt-2 text-lg font-semibold text-indigo-600">
                $
                {trade.price}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopSellersSlider;
