import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis";
const initialState = {
  isLoading: false,
  activitiesData: {},
  errorMessage: "",
};
export const fetchActivitiesList = createAsyncThunk(
  "activities/activitiesList",
  async ({ params }, thunkApi) => {
    try {
      console.log(params);

      const resActivities = await api.get(
        `activities?part=snippet%2CcontentDetails&channelId=${
          params.id
        }&maxResults=10&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
      );
      const activities = resActivities.data.items;
      const videoIds = activities
        .map((item) => {
          const details = item.contentDetails;
          return (
            details?.upload?.videoId ||
            details?.playlistItem?.resourceId?.videoId
          );
        })
        .filter(Boolean) // Lọc bỏ giá trị undefined/null
        .join(",");

      if (!videoIds) return resActivities.data;
      const resVideos = await api.get(
        `videos?part=statistics%2CcontentDetails&id=${videoIds}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
      );
      const videoDetails = resVideos.data.items;

      // 4. Gộp (Merge) thông tin `statistics` vào từng item của activities
      const mergedItems = activities.map((activity) => {
        const details = activity.contentDetails;
        // Lấy videoId của activity hiện tại
        const currentVideoId =
          details?.upload?.videoId ||
          details?.playlistItem?.resourceId?.videoId;

        // Tìm video tương ứng trong danh sách videos trả về
        const matchingVideo = videoDetails.find((v) => v.id === currentVideoId);

        return {
          ...activity,
          // Đính kèm statistics (viewCount, likeCount...)
          statistics: matchingVideo ? matchingVideo.statistics : null,
          // Đính kèm videoDetails để lấy thời lượng video (iso duration) nếu cần
          videoContentDetails: matchingVideo
            ? matchingVideo.contentDetails
            : null,
        };
      });

      return { ...resActivities.data, items: mergedItems };
    } catch (error) {
      // error.response.data.error.message
      console.log(error);

      const errorMessage = error.message || "Cannot load hompage videos";
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);
const activitiesSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActivitiesList.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.activitiesData = [];
      state.errorMessage = "";
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchActivitiesList.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.activitiesData = action.payload;
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
