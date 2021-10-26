import { configureStore, createSlice } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { stocksApi } from "../services/stockApi";
import { insiderApi } from "../services/insiderApi";
import { fearAndGreedApi } from "../services/fearAndGreedApi";
import { sentimentApi } from "../services/sentimentApi";
const initialCounterState = { counter: 0, showCounter: true };
const initialPaymentState = { success: false };

const paymentSlice = createSlice({
  name: "payment",
  initialState: initialPaymentState,
  reducers: {
    payment(state) {
      state.success = true;
    },
  },
});

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [stocksApi.reducerPath]: stocksApi.reducer,
    [insiderApi.reducerPath]: insiderApi.reducer,
    [fearAndGreedApi.reducerPath]: fearAndGreedApi.reducer,
    [sentimentApi.reducerPath]: sentimentApi.reducer,
    payment: paymentSlice.reducer,
    counter: counterSlice.reducer,
  },
});

export const counterActions = counterSlice.actions;
export const paymentActions = paymentSlice.actions;
