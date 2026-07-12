import { ThumbsUp } from "lucide-react";
import { Link, useParams } from "react-router";
import Comment from "../Comment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchVideoDetailData } from "../../redux/watchPageSlice/watchPageSlice";
import { fetchChannelList } from "../../redux/channelInfoSlice/channelInfoSlice";

const VideoPlay = () => {
  const param = useParams();
  const dispatch = useDispatch();

  const videoDetails = useSelector((state) => state.watchPage.videoDetailData);
  const videoInnerDetails = videoDetails?.items && videoDetails?.items[0];
  const channelInfo = useSelector((state) => state.channelInfo.channelData);
  const [isShowDescription, setIsShowDescription] = useState(false);
  useEffect(() => {
    dispatch(fetchVideoDetailData(param.id));
  }, [param.id]);
  useEffect(() => {
    if (videoDetails?.items) {
      dispatch(fetchChannelList(videoDetails?.items[0]?.snippet?.channelId));
    }
  }, [videoDetails?.items]);

  return (
    <div className="w-[70%]">
      <iframe
        className="aspect-video object-cover rounded-lg overflow-hidden"
        title="Youtube player video"
        do-not-allow="autoplay"
        allowFullScreen
        src={`https://www.youtube.com/embed/${param.id}?autoplay=1`}
      ></iframe>
      <h2 className="text-[32px]">{videoInnerDetails?.snippet?.title}</h2>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Link
            to={`/channel/${channelInfo?.items && channelInfo?.items[0]?.id}`}
          >
            <div className="w-12 h-12">
              <img
                src={
                  channelInfo?.items &&
                  channelInfo?.items[0]?.snippet?.thumbnails?.default?.url
                }
                className="rounded-full"
                alt="avatar"
              />
            </div>
          </Link>
          <div>
            <h3>
              {channelInfo?.items && channelInfo?.items[0]?.snippet?.title}
            </h3>
            <p>
              {" "}
              {channelInfo?.items &&
                channelInfo?.items[0]?.statistics?.subscriberCount}
            </p>
          </div>
        </div>
        <button className="flex items-center px-2 py-4 gap-2 bg-gray-800 rounded-full">
          <span>
            <ThumbsUp />
          </span>
          <span>|</span>
          <span>2.1k likes</span>
        </button>
      </div>
      <div className="bg-gray-500/50 p-4 rounded-md my-4">
        <div className="flex gap-2">
          <span>38K views</span>
          <span>3 days ago</span>
        </div>

        <p className="whitespace-pre-line inline">
          {isShowDescription
            ? videoInnerDetails?.snippet?.description
            : videoInnerDetails?.snippet?.description.substring(0, 101) + "..."}
        </p>

        <button onClick={() => setIsShowDescription(!isShowDescription)}>
          {isShowDescription ? "Hide" : "Show more"}
        </button>
      </div>
      <Comment videoId={param.id} />
    </div>
  );
};

export default VideoPlay;
