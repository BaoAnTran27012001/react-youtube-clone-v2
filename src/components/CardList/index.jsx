import Spinner from "../Spinner/index";
import Card from "../Card";
import { useOutletContext } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchHomeVideoList,
  switchLoadMore,
} from "../../redux/homePageSlice/homePageSlice";
import InfiniteScroll from "react-infinite-scroll-component";

const CardList = () => {
  const dispatch = useDispatch();
  const homepageData = useSelector((state) => state.homePage.homeData);
  const isLoading = useSelector((state) => state.homePage.isLoading);
  const nextPageToken = useSelector((state) => state.homePage.nextPageToken);
  const errorMeassage = useSelector((state) => state.homePage.errorMessage);
  const { categoryId } = useOutletContext();

  useEffect(() => {
    dispatch(fetchHomeVideoList({ categoryId }));
  }, [categoryId]);
  const fetchMore = () => {
    dispatch(switchLoadMore(true));
    dispatch(fetchHomeVideoList({ categoryId }));
  };
  return (
    <InfiniteScroll
      dataLength={homepageData.length}
      next={fetchMore}
      hasMore={nextPageToken}
      loader={<p>Loading ...</p>}
    >
      <div className="mt-4 grid grid-cols-3 gap-4">
        {isLoading && <Spinner />}
        {errorMeassage && (
          <div className="text-center text-red-500 font-bold">
            {errorMeassage}
          </div>
        )}
        {homepageData.length > 0 &&
          homepageData.map((video) => {
            return <Card key={video?.id} videoData={video} />;
          })}
      </div>
    </InfiniteScroll>
  );
};

export default CardList;
