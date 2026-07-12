import { Link } from "react-router";
import { convertDate, convertDuration } from "../../utils/function";
import { List } from "lucide-react";

const Card = ({ videoData, isPlaylist, isChannel }) => {
  const videoId = videoData?.contentDetails?.upload?.videoId;

  return (
    <Link
      to={
        isPlaylist
          ? `/playlist/${videoData?.id}`
          : `/video/${videoId || videoData?.id}`
      }
    >
      <div className="cursor-pointer rounded-md overflow-hidden hover:scale-105 transition-all">
        <div className="relative">
          <span className="absolute p-1 bg-[#0c0c0c] rounded-md bottom-1 right-1">
            {isPlaylist ? (
              <span className="flex justify-center items-center gap-1">
                <span>
                  <List />
                </span>
                <span>{videoData?.contentDetails?.itemCount} Videos</span>
              </span>
            ) : (
              convertDuration(videoData?.contentDetails?.duration)
            )}
          </span>
          <img
            src={videoData?.snippet?.thumbnails?.standard?.url}
            className="h-[240px] w-full"
          />
        </div>
        {isPlaylist ? (
          <h2 className="text-lg font-bold">{videoData?.snippet?.title}</h2>
        ) : (
          <div className="mt-4 flex gap-2">
            {!isChannel && (
              <img
                src={videoData?.channelThumbnail}
                className="w-10 h-10 rounded-full flex-none"
              />
            )}
            <div>
              <h2 className="text-2xl">{videoData?.snippet.title}</h2>
              {!isChannel && <p>{videoData?.snippet.channelTitle}</p>}
              <div className="flex gap-1">
                <p>{videoData?.statistics?.viewCount} views</p>
                <span>.</span>
                <p>{convertDate(videoData?.snippet?.publishedAt)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
