import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis";
const initialState = {
  isLoading: false,
  homeData: [],
  isLoadMore: false,
  nextPageToken: "",
  errorMessage: "",
};
export const fetchHomeVideoList = createAsyncThunk(
  "homepage/fetchHomeVideoList",
  async ({ categoryId }, thunkApi) => {
    try {
      const { nextPageToken } = thunkApi.getState().homePage;

      const response = await api.get(
        `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=us${categoryId !== null ? `&videoCategoryId=${categoryId}` : ``}${nextPageToken ? `&pageToken=${nextPageToken}` : ""}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`,
      );
      const videoData = response.data.items;
      const pageToken = response.data.nextPageToken;
      // Lấy state này để bật tắt load more

      const channelIds = videoData.map((v) => v.snippet.channelId).join(",");
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
      return { homeData: mergedData, pageToken };
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
  reducers: {
    switchLoadMore(state, action) {
      state.isLoadMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomeVideoList.pending, (state) => {
      // Add user to the state array
      if (!state.isLoadMore) {
        state.isLoading = true;
        state.homeData = [];
      }
      state.errorMessage = "";
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchHomeVideoList.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;

      state.homeData = state.isLoadMore
        ? [...state.homeData, ...action.payload.homeData]
        : action.payload.homeData;
      state.nextPageToken = action.payload.pageToken;
      state.isLoadMore = false;
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
export const { switchLoadMore } = homePageSlice.actions;
export default homePageSlice.reducer;
