import SideList from "../SideList";
import VideoPlay from "../VideoPlay";

const VideoDetail = () => {
  return (
    <div className="flex gap-4">
      <VideoPlay />
      <SideList />
    </div>
  );
};

export default VideoDetail;
