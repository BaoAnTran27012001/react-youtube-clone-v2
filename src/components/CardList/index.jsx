import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/index";
import Card from "../Card";
import { useOutletContext } from "react-router";
import { useEffect } from "react";
import {
  fetchHomeVideoList,
  switchLoadMore,
} from "../../redux/homePageSlice/homePageSlice";
import InfiniteScroll from "react-infinite-scroll-component";

const CardList = () => {
  const dispatch = useDispatch(); //*
  const homepageData = useSelector((state) => state.homePage.homeData);
  const isLoading = useSelector((state) => state.homePage.isLoading);

  const errorMessage = useSelector((state) => state.homePage.errorMessage);
  const nextPageToken = useSelector((state) => state.homePage.nextPageToken);

  const { categoryId } = useOutletContext(); // *
  useEffect(() => {
    dispatch(fetchHomeVideoList({ categoryId }));
  }, []);

  console.log(homepageData);
  const fetchMore = () => {
    dispatch(switchLoadMore(true));
    dispatch(fetchHomeVideoList({ categoryId }));
  };
  return (
    <InfiniteScroll
      dataLength={homepageData.length}
      loader={<p>Loading ...</p>}
      next={fetchMore}
      hasMore={nextPageToken}
    >
      <div className="mt-4 grid grid-cols-3 gap-4">
        {isLoading && <Spinner />}
        {errorMessage && (
          <p className="text-red-500 font-bold text-center">{errorMessage}</p>
        )}
        {homepageData.map((video) => {
          return <Card key={video.id} videoData={video} />;
        })}
      </div>
    </InfiniteScroll>
  );
};

export default CardList;
