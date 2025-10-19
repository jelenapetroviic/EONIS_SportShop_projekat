// In your cartRedux.js file
import { createSlice } from "@reduxjs/toolkit";

const calculateTotal = (products) => {
  return products.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      // Check if product already exists in cart
      const existingProductIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingProductIndex !== -1) {
        // Product exists, increment quantity
        state.products[existingProductIndex].quantity += action.payload.quantity;
      } else {
        // Product doesn't exist, add new product
        state.quantity += 1;
        state.products.push(action.payload);
      }
      // Recalculate total from all products
      state.total = calculateTotal(state.products);
    },
    removeProduct: (state, action) => {
      const product = action.payload;
      state.quantity -= 1;
      state.products = state.products.filter(
        (item) => item._id !== product._id
      );
      // Recalculate total from all products
      state.total = calculateTotal(state.products);
    },
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const productIndex = state.products.findIndex(item => item._id === _id);

      if (productIndex !== -1) {
        state.products[productIndex].quantity = quantity;
      }
      // Recalculate total from all products
      state.total = calculateTotal(state.products);
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;