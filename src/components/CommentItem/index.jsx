import { ThumbsUp } from "lucide-react";
import { Link } from "react-router";

const CommentItem = ({ commentData }) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <Link
        to={`/channel/${commentData.snippet?.authorChannelId?.value || commentData.snippet.channelId}`}
      >
        <img
          className="w-8 h-8 rounded-full"
          src={
            commentData.snippet.topLevelComment?.snippet
              .authorProfileImageUrl ||
            commentData.snippet.authorProfileImageUrl
          }
        />
      </Link>
      <div>
        <p>
          {commentData.snippet.topLevelComment?.snippet.authorDisplayName ||
            commentData.snippet.authorDisplayName}
        </p>
        <p>
          {commentData.snippet.topLevelComment?.snippet.textDisplay ||
            commentData.snippet.textDisplay}
        </p>
        <div className="flex items-center gap-1">
          <ThumbsUp size={16} />
          <span>
            {commentData.snippet.topLevelComment?.snippet.likeCount ||
              commentData.snippet.likeCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
