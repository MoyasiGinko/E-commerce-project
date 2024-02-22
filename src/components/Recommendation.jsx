import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchTrades } from "../redux/reducers/tradesSlice"; // Import the action to fetch trades

const Recommendation = () => {
  const [recommendedTrades, setRecommendedTrades] = useState([]);
  const allTrades = useSelector((state) => state.trades.trades);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch trades if they are not available
    if (!allTrades || allTrades.length === 0) {
      dispatch(fetchTrades());
    }
  }, [dispatch, allTrades]);

  useEffect(() => {
    // Shuffle the array of all trades to simulate randomness
    const shuffledTrades = [...allTrades].sort(() => 0.5 - Math.random());

    // Select the top 6 trades
    const selectedTrades = shuffledTrades.slice(0, 6);
    setRecommendedTrades(selectedTrades);
  }, [allTrades]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">
        Recommended for You
      </h2>
      <Slider
        dots={sliderSettings.dots}
        infinite={sliderSettings.infinite}
        speed={sliderSettings.speed}
        slidesToShow={sliderSettings.slidesToShow}
        slidesToScroll={sliderSettings.slidesToScroll}
        responsive={sliderSettings.responsive}
      >
        {recommendedTrades.map((trade) => (
          <Link
            key={trade.id}
            to={`/trade/${trade.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer relative"
          >
            <div className="border rounded overflow-hidden shadow-md">
              <img
                src={trade.imageURL}
                alt={trade.name}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {trade.name}
                </h3>
                <p className="text-gray-600 mb-2">{trade.category.name}</p>
                <p className="text-lg font-semibold text-indigo-600">
                  ${trade.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Recommendation;
