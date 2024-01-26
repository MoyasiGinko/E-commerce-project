// App.jsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Splash from './pages/Splash';
import TradeDetails from './pages/TradeDetails';
import Reservations from './pages/Reservations';
import Reserve from './pages/Reserve';
import AddTrades from './pages/AddTrades';
import DeleteTrade from './pages/DeleteTrade';
import ListTrades from './pages/ListTrades';
// import TradesList from './components/CategoryList'; // Update the path accordingly
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/NotFound';
import Checkout from './pages/Checkout';
import PaymentGateway from './pages/PaymentGateway';
import Dashboard from './components/Dashboard';
import EditTrade from './components/EditProductTab';
import EditProduct from './pages/EditProduct';
import CategoryManagement from './components/ManageCategory';

const App = () => (
  <Routes>
    <Route path="/" element={<Splash />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/trade" element={<Layout />}>
      <Route index element={<ListTrades />} />
      {/* <Route path=":tradeType" element={<TradesList />} /> */}
      <Route path=":id" element={<TradeDetails />} />
      <Route path="reservations" element={<Reservations />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="manage-category" element={<CategoryManagement />} />
      <Route path="edit-product" element={<EditProduct />} />
      <Route path="/trade/edit-product/:tradeId" element={<EditTrade />} />
      <Route path="payment-gateway" element={<PaymentGateway />} />
      <Route path="reserve" element={<Reserve />} />
      <Route path="add" element={<AddTrades />} />
      <Route path="delete" element={<DeleteTrade />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
