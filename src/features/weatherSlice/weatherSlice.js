import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL_WEATHER } from "../BASE_URL/BASE_URL_OPENWEATHER";
import { API_KEY } from "../BASE_URL/BASE_URL_OPENWEATHER";

const initialState = {
  weather: null,
  weatherStatusFetch: null,
};

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async (city) => {
    return await fetch(
      `api.openweathermap.org/data/2.5/weather?q=${city}&appid=e1c406926e799e9713f8363bd30b5a8c`
    ).then((r) => r.json());
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      console.log(action, "<-action paylod");
      console.log(state);
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
