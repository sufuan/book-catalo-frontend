import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '@/types/globalTypes';

interface ICART {
  products: IProduct[];
  total: number;
}

const initialState: ICART = {
  products: [],
  total: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export default productSlice.reducer;
