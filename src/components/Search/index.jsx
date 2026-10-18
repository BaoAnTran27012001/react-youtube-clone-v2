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
      const channelIds = searchData
        .map((s) => {
          return s.snippet.channelId;
        })
        .join(",");
      const videoIds = searchData
        .map((s) => {
          return s.id?.videoId !== null && s.id?.videoId;
        })
        .join(",");
      const videoRes = await api.get(
        `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIds}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
      );
      const videoData = videoRes.data.items;
      const channelRes = await api.get(
        `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIds}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`,
      );
      const channelData = channelRes.data.items;
      const mergedData = videoData.map((v) => {
        const foundChannel = channelData.find(
          (c) => c.id === v.snippet.channelId,
        );
        return {
          ...v,
          channelInfo: {
            avatarUrl:
              foundChannel && foundChannel.snippet.thumbnails.default.url,
          },
        };
      });
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
