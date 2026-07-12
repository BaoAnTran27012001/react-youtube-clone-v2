import { Menu, Youtube } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex gap-3 items-center">
      <button
        type="button"
        data-drawer-target="drawer-example"
        data-drawer-show="drawer-example"
        aria-controls="drawer-example"
      >
        <Menu className="cursor-pointer" />
      </button>
      <div className="flex gap-1 cursor-pointer items-center">
        <Youtube
          className="text-red-500"
          size={48}
          fill="red"
          stroke="black"
          strokeWidth={1}
        />
        <h3 className="text-2xl">Youtube</h3>
      </div>
    </div>
  );
};

export default Logo;
