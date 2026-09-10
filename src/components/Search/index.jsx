import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import api from "../../apis";
import Card from "../Card";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [searchResult, setSearchResult] = useState([]);
  const fetchQuery = async () => {
    try {
      const searchResponse = await api.get(
        `/search?part=snippet&q=${searchQuery}&maxResults=10&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`,
      );

      // data.items[9].snippet.channelId
      const searchData = searchResponse.data.items;
      const channelIds = searchData.map((s) => s.snippet.channelId).join(",");
      const channelResponse = await api.get(
        `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIds}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`,
      );
      console.log(channelResponse);
      const channelData = channelResponse.data.items;
      // data.items[0].id
      // data.items[0].snippet.thumbnails.default.url
      const mergedData = searchData.map((s) => {
        const matchVideo = channelData.find(
          (c) => c.id === s.snippet.channelId,
        );
        return {
          ...s,
          channelInfo: matchVideo
            ? { avatarUrl: matchVideo.snippet.thumbnails.default.url }
            : "",
        };
      });
      console.log(mergedData);

      setSearchResult(mergedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchQuery();
  }, [searchQuery]);
  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      {searchResult.length > 0 &&
        searchResult.map((video) => {
          return <Card key={video?.id} videoData={video} />;
        })}
    </div>
  );
};

export default Search;
