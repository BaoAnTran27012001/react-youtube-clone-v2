const SideListCard = () => {
  return (
    <div className="flex gap-4">
      <div className="bg-pink-500 flex-1 h-[120px]"></div>
      <div className="flex-1">
        <h3>Video Title</h3>
        <p>Author Name</p>
        <div className="flex gap-1">
          <span>Video Views</span>
          <span>.</span>
          <span>Video Date</span>
        </div>
      </div>
    </div>
  );
};

export default SideListCard;
