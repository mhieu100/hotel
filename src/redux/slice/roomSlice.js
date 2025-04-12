import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { callFetchRoom } from '../../config/api.room';

export const fetchRoom = createAsyncThunk(
  'room/fetchRoom',
  async ({ query }) => {
    const response = await callFetchRoom(query);
    return response;
  }
);

const initialState = {
  isFetching: true,
  meta: {
    page: 1,
    pageSize: 9,
    pages: 0,
    total: 0,
  },
  result: [],
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoom.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchRoom.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(fetchRoom.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.isFetching = false;
          state.meta = action.payload.data.meta;
          state.result = action.payload.data.result;
        }
      });
  },
});

export default roomSlice.reducer;

