import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { food_items } from "@/components/Foodlist";

type CartItem = (typeof food_items)[number];

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
   addItem: (state, action: PayloadAction<CartItem>) => {
      state.push(action.payload);
    },
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
