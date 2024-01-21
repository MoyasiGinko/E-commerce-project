// Checkout.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../redux/reducers/orderSlice';
// import loadingImage from '../assets/images/loading.gif';

const Checkout = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const dispatch = useDispatch();
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const loading = useSelector((state) => state.order.loading);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch any additional data or perform setup if needed
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  const itemsInCheckout = cartItems.map((item) => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.orderQuantity,
    productQuantity: item.quantity,
    categoryId: item.category.id,
    categoryName: item.category.name,
  }));

  const totalPrice = itemsInCheckout.reduce(
    (total, item) => total + Math.round(item.price * item.quantity * 100) / 100,
    0,
  );

  const isFormValid = firstName && lastName && email && address && city && zipCode && phoneNumber;

  const handlePlaceOrder = async () => {
    try {
      // Dispatch the createOrder action
      const response = await dispatch(
        createOrder({
          productList: [itemsInCheckout],
          totalPrice: totalPrice.toFixed(2),
        }),
      );

      // Clear the cart (remove items from localStorage)
      localStorage.removeItem('cart');

      // Log the entire response
      console.log('Order placed successfully! Response:', response);

      // Log order details
      console.log('Order Details:', response.orderDetails); // Update this line

      // Navigate to the payment gateway page
      navigate('/trade/payment-gateway', { state: { totalPrice } });
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-screen-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md text-gray-800 w-full">
        <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
        <form className="space-y-4">
          {/* ... (rest of the form input fields) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>

            <div className="col-span-1">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>

            <div className="col-span-1">
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>

            <div className="col-span-1">
              <input
                type="text"
                placeholder="Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
          </div>
          <div className="border-t-2 border-gray-300 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Order Total: $
                  {totalPrice.toFixed(2)}
                </h2>
              </div>
              <button
                type="button" // Change to "submit" if you want to submit the form
                onClick={handlePlaceOrder}
                disabled={!isFormValid}
                className={`btn-primary ${
                  isFormValid
                    ? 'bg-yellow-400 hover:bg-yellow-500'
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white py-2 px-4 rounded-md`}
              >
                Place Your Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
