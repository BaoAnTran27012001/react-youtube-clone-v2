import { Link } from "react-router";

const VideoCardPlaylist = ({ data }) => {
  return (
    <Link to={`/video/${data?.contentDetails?.videoId}`}>
      <div className="relative">
        <img
          className="w-full h-[220px] rounded-md"
          src={data?.snippet?.thumbnails?.medium?.url}
        />
        <span className="absolute top-0 bottom-0 left-0 bg-black/50 w-1/4 flex items-center justify-center">
          {data?.snippet?.position + 1}
        </span>
      </div>
      <h3 className="text-lg text-white font-semibold">
        {data?.snippet?.title}
      </h3>
    </Link>
  );
};

export default VideoCardPlaylist;
