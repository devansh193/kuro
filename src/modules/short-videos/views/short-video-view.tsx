import { ShortVideo } from "../components/ui/short-video";

const shorts = [
  { shortId: "17XEA_igj7U" },
  { shortId: "yGpq9KxJ7G8" },
  { shortId: "LYAzGG9VV90" },
  { shortId: "UBuAwfx9h90" },
  { shortId: "yGpq9KxJ7G8" },
  { shortId: "LYAzGG9VV90" },
];

export const ShortVideoView = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto border-l-[1.5px] border-r-[1.5px] border-spaced-vertical px-4 h-20 flex items-center justify-center">
        <h1 className="font-sans font-semibold text-2xl md:text-5xl selection:bg-black selection:text-white">
          THE SHORT FUSE
        </h1>
      </div>
      <div className="border-b-[1.5px] border-spaced-horizontal" />

      <div className="relative overflow-hidden">
        {/* scrolling track */}
        <div className="flex animate-marquee gap-x-8 py-8 px-2 whitespace-nowrap [animation-play-state:running] hover:[animation-play-state:paused]">
          {[...shorts, ...shorts].map((video, idx) => (
            <div key={idx} className="shrink-0">
              <ShortVideo shortId={video.shortId} />
            </div>
          ))}
        </div>
      </div>

      <div className="border-b-[1.5px] border-spaced-horizontal" />
    </div>
  );
};
