import React, { useEffect } from "react";
import SideListCard from "../SideListCard";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoDetailData } from "../../redux/watchPageSlice/watchPageSlice";
import { fetchActivitiesList } from "../../redux/activitiesSlice/activitiesSlice";

const SideList = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const videoData = useSelector((state) => state.watchPage.videoDetailData);
  const channelId = videoData.snippet?.channelId;
  const activitiesData = useSelector(
    (state) => state.activities.activitiesData,
  );
  console.log(activitiesData);

  useEffect(() => {
    dispatch(fetchVideoDetailData(params.id));
  }, []);
  useEffect(() => {
    dispatch(fetchActivitiesList({ params: { id: channelId } }));
  }, [videoData]);
  return (
    <div className="flex-1 flex flex-col gap-4">
      <SideListCard />
    </div>
  );
};

export default SideList;
