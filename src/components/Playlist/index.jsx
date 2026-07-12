import { useEffect, useState } from "react";
import VideoCardPlaylist from "../VideoCardPlaylist";
import { useParams } from "react-router";
import api from "../../apis";

const Playlist = () => {
  const [playlist, setPlaylist] = useState(null);
  const [playlistItems, setPlaylistItems] = useState([]);
  const params = useParams();
  // scope
  const fetchPlaylistInfo = async () => {
    const response = await api.get(
      `playlists?part=snippet%2CcontentDetails&id=${params.id}&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`,
    );
    setPlaylist(response.data.items[0]);
  };
  const fetchPlaylistItems = async () => {
    const response = await api.get(
      `playlistItems?part=snippet%2CcontentDetails&maxResults=8&playlistId=${
        params.id
      }&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
    );
    setPlaylistItems(response.data.items);
  };
  useEffect(() => {
    fetchPlaylistInfo();
    fetchPlaylistItems();
  }, []);
  return (
    <div>
      <div className="bg-gray-300/30 p-8 flex items-start rounded-md gap-6">
        <img
          className="w-[30%] h-[300px]"
          src={playlist?.snippet?.thumbnails?.high?.url}
        />
        <div>
          <h2 className="text-2xl text-white font-semibold w-auto">
            {playlist?.snippet?.title}
          </h2>
          <p>
            {playlist?.snippet?.description
              ? playlist?.snippet?.description
              : "No description"}
          </p>
        </div>
      </div>
      <div className="mt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {playlistItems.length > 0 &&
          playlistItems.map((item) => {
            return <VideoCardPlaylist data={item} key={item.id} />;
          })}
      </div>
    </div>
  );
};

export default Playlist;
