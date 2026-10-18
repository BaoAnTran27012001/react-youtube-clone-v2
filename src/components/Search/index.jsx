import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import api from "../../apis";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchSearchResult = async () => {
    try {
      const response = await api.get(
        `search?part=snippet&maxResults=10&q=${searchQuery}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
      );
      const searchResponse = response.data.items;

      // Lấy tất cả channelId => join thành 1 chuỗi
      const channelIds = searchResponse
        .map((s) => {
          return s.snippet.channelId;
        })
        .join(",");
      const videoIds = searchResponse
        .map((s) => {
          return s.id?.videoId !== null && s.id?.videoId;
        })
        .join(",");
      const videoRes = await api.get(
        `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIds}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
      );
      console.log(videoRes);
    } catch (error) {}
  };
  useEffect(() => {
    fetchSearchResult();
  }, [searchQuery]);
  return <div>Search</div>;
};

export default Search;
