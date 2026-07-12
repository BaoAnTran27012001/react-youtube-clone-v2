import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis";
const initialState = {
  isLoading: false,
  videoDetail: {},
  isError: false,
};
export const fetchVideoDetail = createAsyncThunk(
  "videoDetail/fetchVideoDetail",
  async (videoId) => {
    const response = await api.get(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`
    );
    return response.data;
  }
);
const videoDetailSlice = createSlice({
  name: "videodetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideoDetail.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.videoDetail = [];
      state.isError = false;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchVideoDetail.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.videoDetail = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchVideoDetail.rejected, (state) => {
      // Add user to the state array
      state.isLoading = false;
      state.videoDetail = [];
      state.isError = true;
    });
  },
});
export default videoDetailSlice.reducer;
