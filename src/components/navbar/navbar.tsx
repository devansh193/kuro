import { KuroLogo } from "../logo/kuro";
import { Button } from "../ui/button";
import { NavContent } from "./nav-content";

export const Navbar = () => {
  return (
    <div
      className="w-full h-20 fixed top-0 left-0 right-0 z-50 border-[#CBCBCB] border-b-[1.5px] backdrop-blur-lg"
      style={{
        borderBottom: "1.5px solid transparent",
        borderImage: `repeating-linear-gradient(to right, #CBCBCB 0 8px, transparent 8px 16px) 1`,
      }}
    >
      <div
        className="max-w-5xl mx-auto w-full h-full flex items-center justify-between px-4"
        style={{
          borderLeft: "1.5px solid transparent",
          borderRight: "1.5px solid transparent",
          borderImage: `repeating-linear-gradient(to bottom, #CBCBCB 0 8px, transparent 8px 16px) 1`,
        }}
      >
        <div className="text-black text-lg font-semibold mx-4">
          <KuroLogo />
        </div>
        <div className="flex items-center gap-4 justify-between">
          <NavContent />
          <Button size={"lg"} className="rounded-full">
            Contact Me
          </Button>
        </div>
      </div>
    </div>
  );
};
