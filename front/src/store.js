// store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import registrationReducer from './registrationSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    registration: registrationReducer,
  },
});

export default store;
