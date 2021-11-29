import { configureStore } from "@reduxjs/toolkit";
import { addressTrackerSlice } from "../ipAddressTrackerSlice/ipAddressTrackerSlice";

const store = configureStore({
  reducer: {
    addressTracker: addressTrackerSlice.reducer,
  },
});

export default store;
