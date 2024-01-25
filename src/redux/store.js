import { configureStore } from '@reduxjs/toolkit';
import tradesReducer from './reducers/tradesSlice';
import tradeDetailsReducer from './reducers/tradeDetailsSlice';
import { logoutReducer } from './reducers/auth/logoutSlice';
import { registerReducer } from './reducers/auth/registerSlice';
import { loginReducer } from './reducers/auth/loginSlice';
import { reserveReducer } from './reducers/resereveSlice';
import { orderReducer } from './reducers/orderSlice';
import categoryReducer from './reducers/categorySlice'; // Import categoryReducer
import suggestionReducer from './reducers/suggestionSlice';
import { paymentReducer } from './reducers/paymentSlice';
import inventoryReducer from './reducers/inventorySlice';

const store = configureStore({
  reducer: {
    trades: tradesReducer,
    tradeDetails: tradeDetailsReducer,
    register: registerReducer,
    login: loginReducer,
    logout: logoutReducer,
    order: orderReducer,
    reserve: reserveReducer,
    category: categoryReducer, // Include categoryReducer
    suggestion: suggestionReducer,
    payment: paymentReducer,
    inventory: inventoryReducer,
  },
});

export default store;
