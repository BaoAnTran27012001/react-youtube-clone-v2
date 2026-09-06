import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis";
const initialState = {
  isLoading: false,
  activitiesData: [],
  nextPageToken: "",
  isLoadMore: false,
  errorMessage: "",
};
export const fetchActivitiesList = createAsyncThunk(
  "activity/fetchActivitiesList",
  async ({ params }, thunkApi) => {
    try {
      const activitiesRes = await api.get(
        `activities?part=snippet%2CcontentDetails&channelId=${
          params.id
        }&maxResults=10&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
      );

      const activitiesData = activitiesRes.data.items;
      // data.items[0].contentDetails.upload.videoId
      // Nối chuỗi bằng cách dùng hàm map để trích videoId ra
      const videoIds = activitiesData
        .map((a) => {
          return (
            a.contentDetails.upload.videoId ||
            a.contentDetails.playlistItem.resourceId.videoId
          );
        })
        .join(",");
      // Gọi API video
      const videosRes = await api.get(
        `videos?part=statistics%2CcontentDetails&id=${videoIds}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
      );
      const videoData = videosRes.data.items;

      // Duyệt qua activities trước
      const mergedData = activitiesData.map((a) => {
        // Tìm trong videoData có video nào mà id của nó bằng với id trong activities
        const currentId =
          a.contentDetails.upload.videoId ||
          a.contentDetails.playlistItem.resourceId.videoId;
        const matchVideo = videoData.find((v) => {
          return v.id === currentId;
        });
        // [1].contentDetails
        // [1].statistics
        return {
          ...a,
          contentDetails: matchVideo.contentDetails,
          statistics: matchVideo.statistics,
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
const activitiesSlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActivitiesList.pending, (state) => {
      state.isLoading = true;
      state.activitiesData = [];
      state.errorMessage = "";
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchActivitiesList.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      console.log(action.payload);
      state.activitiesData = action.payload;
      // state.nextPageToken = action.payload.nextPageToken;
      // state.isLoadMore = false; // se
      state.errorMessage = "";
    });
    builder.addCase(fetchActivitiesList.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.activitiesData = [];
      state.errorMessage = action.payload;
    });
  },
});
export default activitiesSlice.reducer;
