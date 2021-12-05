import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL_WEATHER } from "../BASE_URL/BASE_URL_OPENWEATHER";
import { API_KEY } from "../BASE_URL/BASE_URL_OPENWEATHER";

const initialState = {
  weather: null,
  weatherStatusFetch: null,
  isShowWeather: false,
};

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async (city) => {
    return await fetch(
      `${BASE_URL_WEATHER}q=${city}&units=metric${API_KEY}`
    ).then((r) => r.json());
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    toggleShowWeather: (state, action) => {
      state.isShowWeather = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.weatherStatusFetch = "done";
      state.weather = action.payload;
    });
    builder.addCase(getWeather.pending, (state) => {
      state.weatherStatusFetch = "load";
    });
    builder.addCase(getWeather.rejected, (state) => {
      state.weatherStatusFetch = "error";
    });
  },
});

export const { toggleShowWeather } = weatherSlice.actions;
