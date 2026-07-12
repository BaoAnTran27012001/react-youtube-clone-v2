import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelList } from "../../redux/channelInfoSlice/channelInfoSlice";
import { fetchHomeVideoList } from "../../redux/homePageSlice/homePageSlice";
import Spinner from "../Spinner/index";
import Card from "../Card";
import { useOutletContext } from "react-router";

const CardList = () => {
  const dispatch = useDispatch();
  const { categoryId } = useOutletContext();
  const homeData = useSelector((state) => state.homePage.homeData);
  const homeDataLoading = useSelector((state) => state.homePage.isLoading);
  const homeDataError = useSelector((state) => state.homePage.errorMessage);
  const channelData = useSelector((state) => state.channelInfo.channelData);
  const channelDataLoading = useSelector(
    (state) => state.channelInfo.isLoading,
  );
  const channelIdString = homeData.items
    ?.map((video) => {
      return video.snippet.channelId;
    })
    .join(",");
  useEffect(() => {
    dispatch(fetchHomeVideoList({ categoryId }));
  }, [categoryId]);

  useEffect(() => {
    dispatch(fetchChannelList(channelIdString));
  }, [channelIdString]);

  const mergedData =
    channelData.items &&
    homeData.items?.map((video) => {
      const foundChannel = channelData.items.find(
        (channel) => channel?.id === video?.snippet?.channelId,
      );
      if (foundChannel) {
        return {
          ...video,
          channelThumbnail: foundChannel.snippet.thumbnails.default.url,
        };
      }
    });
  console.log(homeDataError);
  if (homeDataError) {
    return (
      <div className="text-red-500 font-bold text-center">{homeDataError}</div>
    );
  }
  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      {homeDataLoading || channelDataLoading ? (
        <Spinner />
      ) : (
        mergedData?.map((video) => {
          return <Card key={video?.id} videoData={video} />;
        })
      )}
    </div>
  );
};

export default CardList;
