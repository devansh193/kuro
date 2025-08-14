import Image from "next/image";

interface Avatar {
  name: string;
  src: string;
}

interface AvatarGroupProps {
  avatars: Avatar[];
  size?: "sm" | "md" | "lg"; // acts as base size
  maxVisible?: number;
}

export function AvatarGroup({
  avatars,
  size = "lg",
  maxVisible,
}: AvatarGroupProps) {
  // Base size config (mobile-first)
  const sizeClasses = {
    sm: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14",
    md: "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16",
    lg: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20",
  };

  const overlapClasses = {
    sm: "-ml-2 sm:-ml-3 md:-ml-3.5 lg:-ml-4",
    md: "-ml-3 sm:-ml-3.5 md:-ml-4 lg:-ml-5",
    lg: "-ml-4 sm:-ml-5 md:-ml-5 lg:-ml-6",
  };

  const textSizeClasses = {
    sm: "text-xs sm:text-sm md:text-base",
    md: "text-sm sm:text-base md:text-lg",
    lg: "text-base sm:text-lg md:text-xl",
  };

  const visibleAvatars = maxVisible ? avatars.slice(0, maxVisible) : avatars;
  const remainingCount =
    maxVisible && avatars.length > maxVisible ? avatars.length - maxVisible : 0;

  // Get pixel size for <Image /> (mobile-first → scale up)
  const getImageSize = () => {
    switch (size) {
      case "sm":
        return 40; // base mobile size
      case "md":
        return 48;
      case "lg":
        return 56;
      default:
        return 56;
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-y-2">
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className={`relative ${sizeClasses[size]} ${
            index > 0 ? overlapClasses[size] : ""
          }`}
          style={{ zIndex: visibleAvatars.length - index }}
        >
          <Image
            src={avatar.src || "/placeholder.svg"}
            alt={avatar.name}
            width={getImageSize()}
            height={getImageSize()}
            className={`${sizeClasses[size]} rounded-full border-2 border-neutral-200 shadow-sm object-cover bg-gray-100`}
          />
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className={`relative ${sizeClasses[size]} ${overlapClasses[size]} rounded-full border-2 border-neutral-200 shadow-sm bg-gray-500 flex items-center justify-center text-white font-medium ${textSizeClasses[size]}`}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
