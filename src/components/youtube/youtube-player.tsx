"use client";
import { cn } from "@/lib/utils";
import YouTube from "react-youtube";

const YouTubePlayer = ({
  videoId,
  className,
}: {
  videoId: string;
  className?: string;
}) => {
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      disablekb: 1,
      playsinline: 1,
    },
  };

  return (
    <div className={cn("w-full aspect-video", className)}>
      <YouTube
        className="w-full h-[300px] rounded-xl"
        videoId={videoId}
        opts={opts}
        style={{ borderRadius: "24px", overflow: "hidden" }}
      />
    </div>
  );
};

export default YouTubePlayer;
