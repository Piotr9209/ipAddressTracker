import { configureStore } from "@reduxjs/toolkit";
import { addressTrackerSlice } from "../ipAddressTrackerSlice/ipAddressTrackerSlice";
import { weatherSlice } from "../weatherSlice/weatherSlice";

const store = configureStore({
  reducer: {
    addressTracker: addressTrackerSlice.reducer,
    weather: weatherSlice.reducer,
  },
});

export default store;
