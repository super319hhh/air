import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  calls: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllCalls.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllCalls.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.calls = action.payload;
      })
      .addCase(fetchAllCalls.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(archiveCall.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(archiveCall.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(archiveCall.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default mainSlice.reducer;

export const fetchAllCalls = createAsyncThunk("calls/getAllCalls", async () => {
  const response = await axios.get(
    "https://aircall-job.herokuapp.com/activities"
  );

  return response.data;
});

export const archiveCall = createAsyncThunk("calls/archiveCall", async (id) => {
  const requestBody = {
    is_archived: true,
  };

  const response = await axios.post(
    `https://aircall-job.herokuapp.com/activities/${id}`,
    requestBody
  );

  return response.data;
});
