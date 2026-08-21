import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis";
const initialState = {
  isLoading: false,
  homeData: {},
  errorMessage: "",
};
export const fetchHomeVideoList = createAsyncThunk(
  "homepage/fetchHomeVideoList",
  async ({ categoryId }, thunkApi) => {
    try {
      const response = await api.get(
        `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=us${categoryId !== null ? `&videoCategoryId=${categoryId}` : ``}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`,
      );
      const videoData = response.data.items;
      const channelIds = videoData
        .map((video) => video.snippet.channelId)
        .join(",");
      const channelData = await api.get(
        `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIds}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`,
      );
      const channelList = channelData.data.items;
      const mergedData = videoData.map((video) => {
        const channel = channelList.find(
          (channel) => channel.id === video.snippet.channelId,
        );
        return {
          ...video,
          channelInfo: {
            avatarUrl: channel?.snippet?.thumbnails?.default?.url || "",
          },
        };
      });
      return mergedData;
    } catch (error) {
      // error.response.data.error.message
      console.log(error);

      const errorMessage = error.message || "Cannot load hompage videos";
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);
const homePageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomeVideoList.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.homeData = [];
      state.errorMessage = "";
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchHomeVideoList.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.homeData = action.payload;
      state.errorMessage = "";
    });
    builder.addCase(fetchHomeVideoList.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.homeData = [];
      state.errorMessage = action.payload;
    });
  },
});
export default homePageSlice.reducer;
