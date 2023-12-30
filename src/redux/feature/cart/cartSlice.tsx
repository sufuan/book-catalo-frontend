import { IProduct } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICART {
  products: IProduct[];
  total: number;
}

const initialState: ICART = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const excistingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (excistingProduct) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        excistingProduct.quantity! += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price;
    },

    removeOne: (state, action: PayloadAction<IProduct>) => {
      const excistingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (excistingProduct && excistingProduct.quantity! > 1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        excistingProduct.quantity = excistingProduct.quantity! - 1;
      } else {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      }

      state.total -= action.payload.price;
    },

    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;
export default cartSlice.reducer;
