import { Link } from "react-router";
import { convertDate } from "../../utils/function";

const SideListCard = ({ activityData }) => {
  return (
    <Link
      to={`/video/${activityData.contentDetails?.playlistItem?.resourceId?.videoId || activityData.contentDetails.upload?.videoId}`}
      className="flex gap-4"
    >
      <img
        className="flex-1 h-[120px]"
        src={activityData.snippet.thumbnails.default.url}
      />
      <div className="flex-1">
        <h3>{activityData.snippet.title}</h3>
        <p>{activityData.snippet.channelTitle}</p>
        <div className="flex gap-1">
          <span>{activityData.statistics.viewCount}</span>
          <span>.</span>
          <span>{convertDate(activityData.snippet.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default SideListCard;
