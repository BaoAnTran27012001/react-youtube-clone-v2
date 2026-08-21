import Spinner from "../Spinner/index";
import Card from "../Card";
import { useOutletContext } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchHomeVideoList } from "../../redux/homePageSlice/homePageSlice";

const CardList = () => {
  const dispatch = useDispatch();
  const homepageData = useSelector((state) => state.homePage.homeData);
  const { categoryId } = useOutletContext();
  console.log(categoryId);

  useEffect(() => {
    dispatch(fetchHomeVideoList({ categoryId }));
  }, [categoryId]);
  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      {homepageData.length > 0 &&
        homepageData.map((video) => {
          return <Card key={video?.id} videoData={video} />;
        })}
    </div>
  );
};

export default CardList;
