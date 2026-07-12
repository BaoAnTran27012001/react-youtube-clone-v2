import { Link } from "react-router";

const DrawerItem = ({
  title,
  icon,
  filter,
  setFilter,
  filterTag,
  categoryChildId,
  setCategoryId,
}) => {
  const toggleCategory = () => {
    setFilter(filterTag);
    setCategoryId(categoryChildId);
  };
  return (
    <li onClick={toggleCategory}>
      <Link
        to={"/"}
        className={`flex items-center px-2 py-2 text-body rounded-base ${filter === filterTag ? "bg-white/25" : ""} hover:bg-white/25 hover:text-fg-brand group`}
      >
        {icon}
        <span className="ms-3">{title}</span>
      </Link>
    </li>
  );
};

export default DrawerItem;
