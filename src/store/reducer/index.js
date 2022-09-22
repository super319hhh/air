import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  calls: [],
  selectedCall: null,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    closeExtend(state) {
      state.selectedCall = null;
    },
  },
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
      })
      .addCase(unArchiveCall.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(unArchiveCall.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(unArchiveCall.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchCallById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCallById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCall = action.payload;
      })
      .addCase(fetchCallById.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { closeExtend } = mainSlice.actions;

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

export const unArchiveCall = createAsyncThunk(
  "calls/unArchiveCall",
  async (id) => {
    const requestBody = {
      is_archived: false,
    };

    const response = await axios.post(
      `https://aircall-job.herokuapp.com/activities/${id}`,
      requestBody
    );

    return response.data;
  }
);
export const fetchCallById = createAsyncThunk(
  "calls/fetchCallById",
  async (id) => {
    const response = await axios.get(
      `https://aircall-job.herokuapp.com/activities/${id}`
    );

    return response.data;
  }
);
