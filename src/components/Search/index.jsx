import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import api from "../../apis";
import Card from "../Card";
import Spinner from "../Spinner";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchSearchResult = async () => {
    try {
      setIsLoading(true);
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
      const videoData = videoRes.data.items; // merge với channel
      const channelRes = await api.get(
        `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIds}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`,
      );
      const channelData = channelRes.data.items;
      // video : snippet.channelId, channel: id
      const mergedData = videoData.map((v) => {
        const foundChannel = channelData.find((c) => {
          return c.id === v.snippet.channelId;
        });
        return {
          ...v,
          // custom data
          channelAvatar: foundChannel.snippet.thumbnails.default.url,
        };
      });

      setSearchResult(mergedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
      setErrorMessage("Something went wrong");
    }
  };
  useEffect(() => {
    fetchSearchResult();
  }, [searchQuery]);

  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      {isLoading && <Spinner />}
      {errorMessage && <p>{errorMessage}</p>}
      {searchResult.map((v) => {
        return <Card key={v.id} videoData={v} />;
      })}
    </div>
  );
};

export default Search;
