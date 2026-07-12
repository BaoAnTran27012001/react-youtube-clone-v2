import { useEffect, useState } from "react";
import Card from "../Card";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelList } from "../../redux/channelInfoSlice/channelInfoSlice";
import api from "../../apis";

const ChannelInfo = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isShowModal, setIsShowModal] = useState(false);
  const [channelVideos, setChannelVideos] = useState([]);
  const [channelPlaylist, setChannelPlaylist] = useState([]);
  const stateChannel = useSelector((state) => state.channelInfo.channelData);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchChannelList(params.id));
  }, [params.id]);
  // ?.items[0] => error
  //  &&
  const channelInfo = stateChannel?.items && stateChannel?.items[0];
  const fetchChannelVideos = async () => {
    const response = await api.get(
      `activities?part=snippet%2CcontentDetails&channelId=${
        params.id
      }&maxResults=10&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    );

    setChannelVideos(response.data.items);
  };
  const fetchChannelPlaylist = async () => {
    const response = await api.get(
      `playlists?part=snippet%2CcontentDetails&channelId=${
        params.id
      }&maxResults=10&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    );

    setChannelPlaylist(response.data.items);
  };
  useEffect(() => {
    fetchChannelVideos();
    fetchChannelPlaylist();
  }, []);
  return (
    <div className="relative">
      {isShowModal && (
        <div
          className="absolute bg-black/15 inset-0 h-screen w-screen z-50 flex items-center justify-center cursor-pointer"
          onClick={() => setIsShowModal(false)}
        >
          <p className="p-4 bg-slate-700 text-white rounded-md max-w-[680px]">
            {channelInfo?.snippet?.description}
          </p>
        </div>
      )}
      <div className="flex gap-4">
        <div className="w-36 h-36 rounded-full">
          <img
            src={channelInfo?.snippet?.thumbnails?.high?.url}
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="flex-col gap-2">
          <h2 className="text-3xl">{channelInfo?.snippet?.title}</h2>
          <div className="flex gap-4">
            <p>{channelInfo?.snippet?.customUrl}</p>
            <p>{channelInfo?.statistics?.subscriberCount} subscribers</p>
            <p>{channelInfo?.statistics?.videoCount} videos</p>
          </div>
          <div className="flex gap-1">
            <p>
              {channelInfo?.snippet?.description.length > 60
                ? channelInfo?.snippet?.description.substring(0, 61) + " ... "
                : channelInfo?.snippet?.description}
            </p>
            {channelInfo?.snippet?.description.length > 60 && (
              <button
                className="text-gray-300 font-bold"
                onClick={() => setIsShowModal(true)}
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex border-b border-gray-600">
        <div
          className={`py-2 px-4 ${
            activeTab === "videos" && "border-b border-white"
          }`}
          onClick={() => setActiveTab("videos")}
        >
          <button type="button" className="text-2xl">
            Videos
          </button>
        </div>
        <div
          className={`py-2 px-4 ${
            activeTab === "playlists" && "border-b border-white"
          }`}
          onClick={() => setActiveTab("playlists")}
        >
          <button type="button" className="text-2xl">
            Playlists
          </button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 mt-4">
        {activeTab === "videos"
          ? channelVideos.length > 0 &&
            channelVideos.map((video) => {
              return <Card key={video.id} videoData={video} isChannel={true} />;
            })
          : channelPlaylist.length > 0 &&
            channelPlaylist.map((playlist) => {
              return (
                <Card
                  key={playlist.id}
                  videoData={playlist}
                  isChannel={true}
                  isPlaylist={true}
                />
              );
            })}
      </div>
    </div>
  );
};

export default ChannelInfo;
