import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "./homePageSlice/homePageSlice";
import channelInfoReducer from "./channelInfoSlice/channelInfoSlice";
import watchPageReducer from "./watchPageSlice/watchPageSlice";
import activitiesReducer from "./activitiesSlice/activitiesSlice";
export const store = configureStore({
  reducer: {
    homePage: homepageReducer,
    channelInfo: channelInfoReducer,
    watchPage: watchPageReducer,
    activities: activitiesReducer,
  },
});
