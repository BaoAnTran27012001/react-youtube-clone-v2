import { Link } from "react-router";
import { convertDate } from "../../utils/function";

const SideListCard = ({ videoData }) => {
  console.log(videoData);

  return (
    <Link
      to={`/video/${
        videoData.contentDetails?.upload?.videoId ||
        videoData.contentDetails?.playlistItem?.resourceId.videoId
      }`}
    >
      <div className="flex gap-4">
        <img
          src={videoData.snippet.thumbnails.default.url}
          alt="side card image"
        />
        <div className="flex-1">
          <h3>{videoData.snippet.title}</h3>
          <p>{videoData.snippet.channelTitle}</p>
          <div className="flex gap-1">
            <span>{videoData.statistics.viewCount}</span>
            <span>.</span>
            <span>{convertDate(videoData.snippet.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SideListCard;
