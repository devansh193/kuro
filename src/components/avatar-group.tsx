import Image from "next/image";

interface Avatar {
  name: string;
  src: string;
}

interface AvatarGroupProps {
  avatars: Avatar[];
  size?: "sm" | "md" | "lg";
  maxVisible?: number;
}

export function AvatarGroup({
  avatars,
  size = "lg",
  maxVisible,
}: AvatarGroupProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  const overlapClasses = {
    sm: "-ml-2",
    md: "-ml-3",
    lg: "-ml-4",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const visibleAvatars = maxVisible ? avatars.slice(0, maxVisible) : avatars;
  const remainingCount =
    maxVisible && avatars.length > maxVisible ? avatars.length - maxVisible : 0;

  return (
    <div className="flex items-center">
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
            width={size === "sm" ? 32 : size === "md" ? 48 : 64}
            height={size === "sm" ? 32 : size === "md" ? 48 : 64}
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
