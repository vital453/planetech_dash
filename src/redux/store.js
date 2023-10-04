"use client";
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "@/redux/features/productSlice";
import TriggerSlice from "./features/TriggerSlice";
import panieerSlice from "@/redux/features/panieerSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    panier: panieerSlice,
    trigger: TriggerSlice,
  },
  devTools: true,
});
