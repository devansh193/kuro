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
      {/* Header */}
      <div
        className={`
          max-w-5xl h-20
          mx-auto px-4
          flex items-center justify-center
          border-l-[1.5px] border-r-[1.5px] border-spaced-vertical
        `}
      >
        <h1
          className={`
            font-sans font-semibold text-2xl md:text-5xl
            selection:bg-black selection:text-white
          `}
        >
          THE SHORT FUSE
        </h1>
      </div>

      <div className="border-b-[1.5px] border-spaced-horizontal" />

      <div className="relative overflow-hidden px-2 py-8">
        <div className="flex w-max animate-marquee [animation-play-state:running] hover:[animation-play-state:paused]">
          <div className="flex gap-x-4 px-2">
            {shorts.map((video, idx) => (
              <div key={`track1-${idx}`} className="shrink-0">
                <ShortVideo shortId={video.shortId} />
              </div>
            ))}
          </div>
          <div className="flex gap-x-4 px-2">
            {shorts.map((video, idx) => (
              <div key={`track2-${idx}`} className="shrink-0">
                <ShortVideo shortId={video.shortId} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b-[1.5px] border-spaced-horizontal" />
    </div>
  );
};
