import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  maxItemsReached: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, type, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.type === type && item.size === size,
      );

      if (existingItem) {
        existingItem.count++;
        existingItem.totalPrice = existingItem.price * existingItem.count;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
          totalPrice: action.payload.price,
        });
      }

      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);

      const totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
      if (totalCount >= 10) {
        state.maxItemsReached = true;
      }
    },
    minusItem(state, action) {
      const { id, type, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.type === type && item.size === size,
      );

      if (existingItem) {
        if (existingItem.count > 1) {
          existingItem.count--;
          existingItem.totalPrice = existingItem.price * existingItem.count;
        } else {
          state.items = state.items.filter(
            (item) => !(item.id === id && item.type === type && item.size === size),
          );
        }
      }

      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      state.maxItemsReached = false;
    },
    removeItem(state, action) {
      const { id, type, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.type === type && item.size === size),
      );
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      state.maxItemsReached = false;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.maxItemsReached = false;
    },
    clearMaxItemsNotification(state) {
      state.maxItemsReached = false;
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems, clearMaxItemsNotification } =
  cartSlice.actions;
export default cartSlice.reducer;
