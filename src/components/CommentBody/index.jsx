import { useState } from "react";
import CommentItem from "../CommentItem";

const CommentBody = ({ commentData }) => {
  const [showComment, setShowComment] = useState(false);
  return (
    <div className="flex items-start flex-col gap-2">
      <CommentItem commentData={commentData} />

      {showComment && (
        <div className="flex flex-col gap-2 pl-6">
          {commentData?.replies?.comments.length > 0 &&
            commentData?.replies?.comments.map((comment) => {
              return <CommentItem key={comment.id} commentData={comment} />;
            })}
        </div>
      )}
      {commentData.snippet.totalReplyCount > 0 && (
        <button
          onClick={() => setShowComment(!showComment)}
          className="text-blue-500 font-bold"
        >
          {showComment ? "Hide" : "Show"} replies
        </button>
      )}
    </div>
  );
};

export default CommentBody;
