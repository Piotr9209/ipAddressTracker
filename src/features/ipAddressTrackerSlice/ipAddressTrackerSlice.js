import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../BASE_URL_FETCH_IP_ADDRESS/BASE_URL";

const initialState = {
  addressTracker: null,
  ipStatusFetch: null,
};

export const getAddressTracker = createAsyncThunk(
  "address/getIpAddress",
  async (url = "") => {
    return await fetch(`${BASE_URL}${url}`).then((r) => r.json());
  }
);

export const addressTrackerSlice = createSlice({
  name: "ipAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAddressTracker.fulfilled, (state, action) => {
      state.ipStatusFetch = "success";
      state.addressTracker = action.payload;
    });
    builder.addCase(getAddressTracker.pending, (state) => {
      state.ipStatusFetch = "loading";
    });
    builder.addCase(getAddressTracker.rejected, (state) => {
      state.ipStatusFetch = "failed";
    });
  },
});
