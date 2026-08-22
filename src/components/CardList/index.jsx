import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/index";
import Card from "../Card";
import { useOutletContext } from "react-router";
import { useEffect } from "react";
import { fetchHomeVideoList } from "../../redux/homePageSlice/homePageSlice";

const CardList = () => {
  const dispatch = useDispatch(); //*
  const homepageData = useSelector((state) => state.homePage.homeData);
  const { categoryId } = useOutletContext(); // *
  useEffect(() => {
    dispatch(fetchHomeVideoList({ categoryId }));
  }, []);

  console.log(homepageData);

  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      {homepageData.map((video) => {
        return <Card videoData={video} />;
      })}
    </div>
  );
};

export default CardList;
