import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './feature/cart/cartSlice';
import { api } from './api/apiSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
