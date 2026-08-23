import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis";
const initialState = {
  isLoading: false,
  homeData: [],
  nextPageToken: "",
  isLoadMore: false,
  errorMessage: "",
};
export const fetchHomeVideoList = createAsyncThunk(
  "homepage/fetchHomeVideoList",
  async ({ categoryId }, thunkApi) => {
    const { nextPageToken } = thunkApi.getState().homePage;
    try {
      const videoRes = await api.get(
        `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=us${categoryId !== null ? `&videoCategoryId=${categoryId}` : ``}${nextPageToken ? `&pageToken=${nextPageToken}` : ""}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`,
      );
      // data ={
      // items: [],
      // nextPageToken:"SDCSF"
      // }
      const videosData = videoRes.data.items; // khai báo biến để sau này tham chiếu cho dễ
      const pageToken = videoRes.data.nextPageToken; // ""=>"dsad"
      console.log(pageToken);

      // keo channel Id từ videoData (20 cái)
      const channelIds = videosData
        .map((v) => {
          return v.snippet.channelId;
        })
        .join(",");
      // Gọi api channel
      const channelRes = await api.get(
        `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIds}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`,
      );
      const channelData = channelRes.data.items;
      // Merge Data
      const mergedData = videosData.map((v) => {
        const channel = channelData.find((c) => c.id === v.snippet.channelId);
        return {
          ...v,
          channelAvatar: channel.snippet.thumbnails.default.url,
        };
      });
      return {
        homeData: mergedData,
        nextPageToken: pageToken,
      };
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
        // true
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
        : action.payload.homeData; // {homeData:[],nextPageToken:"dasd"};
      state.nextPageToken = action.payload.nextPageToken;
      state.isLoadMore = false; // se
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
