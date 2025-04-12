import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './slice/accountSlide';
import userReducer from './slice/userSlice';
import roomReducer from './slice/roomSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    room: roomReducer,
    user: userReducer,
  },
});
