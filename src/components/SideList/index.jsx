import React, { useEffect } from "react";
import SideListCard from "../SideListCard";
import { fetchActivitiesList } from "../../redux/activitiesSlice/activitiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const SideList = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const activitiesState = useSelector(
    (state) => state.activities.activitiesData,
  );
  useEffect(() => {
    dispatch(fetchActivitiesList({ params }));
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-4">
      {activitiesState.items?.length > 0 &&
        activitiesState.items?.map((video) => {
          return (
            <SideListCard
              key={`${video.id} +dsd  `}
              videoData={video}
              isChannel={true}
            />
          );
        })}
    </div>
  );
};

export default SideList;
