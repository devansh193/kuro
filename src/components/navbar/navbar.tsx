import { KuroLogo } from "../logo/kuro";
import { Button } from "../ui/button";
import { NavContent } from "./nav-content";

export const Navbar = () => {
  return (
    <div className="w-full h-16 md:h-20 fixed top-0 left-0 right-0 z-50 border-[#CBCBCB] border-b-[1.5px] bg-background backdrop-blur-sm border-spaced-horizontal">
      <div className="relative max-w-5xl mx-auto w-full h-full flex items-center justify-between px-4">
        <div className="absolute ml-2 md:ml-0 top-0 bottom-0 left-0 border-l-[1.5px] border-spaced-vertical" />
        <div className="absolute mr-2 md:mr-0 top-0 bottom-0 right-0 border-l-[1.5px] border-spaced-vertical" />
        <div className="text-black text-lg font-semibold mx-4">
          <KuroLogo />
        </div>
        <div className="flex items-center gap-4 justify-between">
          <div className="hidden md:block">
            <NavContent />
          </div>
          <Button className="rounded-full text-xs md:text-[16px]">
            Contact Me
          </Button>
        </div>
      </div>
    </div>
  );
};
