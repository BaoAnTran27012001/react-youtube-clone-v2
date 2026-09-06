import React, { useEffect } from "react";
import SideListCard from "../SideListCard";
import { fetchActivitiesList } from "../../redux/activitiesSlice/activitiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchVideoDetailData } from "../../redux/watchPageSlice/watchPageSlice";
import Spinner from "../Spinner";

const SideList = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const channelInfo = useSelector((state) => state.watchPage.videoDetailData);
  const activities = useSelector((state) => state.activities.activitiesData);
  // isLoading
  const activitiesLoading = useSelector((state) => state.activities.isLoading);
  const channelId = channelInfo.items && channelInfo.items[0].snippet.channelId;

  useEffect(() => {
    dispatch(fetchVideoDetailData(params.id));
  }, []);
  useEffect(() => {
    dispatch(fetchActivitiesList({ params: { id: channelId } }));
  }, [channelId]);
  console.log(activities);

  return (
    <div className="flex-1 flex flex-col gap-4">
      {activitiesLoading && <Spinner />}
      {activities.length > 0 &&
        activities.map((video) => {
          return <SideListCard key={`${video.id} +dsd  `} videoData={video} />;
        })}
    </div>
  );
};

export default SideList;
