import {
  Gamepad2,
  Home,
  Lightbulb,
  Menu,
  Music,
  Newspaper,
  Popcorn,
  Shirt,
  Volleyball,
  Youtube,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import DrawerItem from "../DrawerItem";
import { useEffect, useState } from "react";
import api from "../../apis";

const Drawer = ({ setCategoryId }) => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("home");
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
    setCategoryId(null);
  };
  const categoryItems = [
    {
      icon: <Music />,
      text: "Music",
      filterTag: "music",
      categoryId: categories.find((category) => {
        return category?.snippet?.title === "Music";
      })?.id,
    },
    {
      icon: <Volleyball />,
      text: "Sports",
      filterTag: "sports",
      categoryId: categories.find((category) => {
        return category?.snippet?.title === "Sports";
      })?.id,
    },
    {
      icon: <Gamepad2 />,
      text: "Gaming",
      filterTag: "gaming",
      categoryId: categories.find((category) => {
        return category?.snippet?.title === "Gaming";
      })?.id,
    },
    {
      icon: <Popcorn />,
      text: "Movies",
      filterTag: "movies",
      categoryId: categories.find((category) => {
        return category?.snippet?.title === "Movies";
      })?.id,
    },
    {
      icon: <Shirt />,
      text: "Howto & Style",
      filterTag: "fashion",
      categoryId: categories.find((category) => {
        return category?.snippet?.title === "Howto & Style";
      })?.id,
    },
    {
      icon: <Newspaper />,
      text: "News & Politics",
      filterTag: "news",
      categoryId: categories.find((category) => {
        return category?.snippet?.title === "News & Politics";
      })?.id,
    },
    {
      icon: <Lightbulb />,
      text: "Education",
      filterTag: "education",
      categoryId: categories.find((category) => {
        return category?.snippet?.title === "Education";
      })?.id,
    },
  ];

  //
  const fetchCategories = async () => {
    const response = await api.get(
      `videoCategories?part=snippet&regionCode=us&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
    );
    setCategories(response.data.items);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      {/* drawer init and show */}
      <div className="text-center flex">
        <button
          className="inline-flex items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          type="button"
          data-drawer-target="drawer-navigation"
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
        >
          <Menu />
        </button>
        <div onClick={navigateHome}>
          <div className="flex items-center gap-1 relative z-50">
            <Youtube
              size={48}
              fill="red"
              stroke="black"
              strokeWidth={1}
              className="cursor-pointer"
            />
            <span className="text-xl">Youtube</span>
          </div>
        </div>
      </div>
      {/* drawer component */}
      <div
        id="drawer-navigation"
        className="fixed top-0 left-0 z-40 h-screen px-6 p-4 pt-20 overflow-y-auto transition-transform -translate-x-full bg-[#0c0c0c] w-96 dark:bg-gray-500"
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <ul>
          <DrawerItem
            title={"Home"}
            icon={<Home />}
            filterTag={"home"}
            filter={filter}
            setFilter={setFilter}
            categoryChildId={null}
            setCategoryId={setCategoryId}
          />
        </ul>
        <div className="border-b border-default pb-4 flex items-center">
          <button
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="text-body bg-transparent hover:text-heading hover:bg-neutral-tertiary rounded-base w-9 h-9 absolute top-2.5 end-2.5 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <div className="py-5 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {categoryItems.map((category, index) => {
              return (
                <DrawerItem
                  key={index}
                  title={category.text}
                  icon={category.icon}
                  filterTag={category.filterTag}
                  categoryChildId={category.categoryId}
                  setCategoryId={setCategoryId}
                  filter={filter}
                  setFilter={setFilter}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;
