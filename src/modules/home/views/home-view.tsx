import { DottedBackground } from "@/components/dotted-background";
import { ContainerTextFlip } from "@/components/text-rotate";

export const HomeView = () => {
  return (
    <div
      className="relative w-full h-180"
      style={{
        borderBottom: "1.5px solid transparent",
        borderImage: `repeating-linear-gradient(to right, #CBCBCB 0 8px, transparent 8px 16px) 1`,
      }}
    >
      <div
        className="max-w-5xl mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6 items-center justify-center relative h-full"
        style={{
          borderLeft: "1.5px solid transparent",
          borderRight: "1.5px solid transparent",
          borderImage: `repeating-linear-gradient(to bottom, #CBCBCB 0 9px, transparent 9px 16px) 1`,
        }}
      >
        <DottedBackground className="absolute inset-0 -z-10" />
        <div className="text-4xl font-bold text-center relative">
          Partnering with content creators to unlock next level ofgrowth and
          success{" "}
          <ContainerTextFlip
            className="bg-transparent h-10  "
            textClassName="text-3xl"
            words={["better", "modern", "Tyler Durden", "awesome"]}
          />
        </div>
        <div className="text-lg text-gray-600 text-center max-w-2xl">
          A modern portfolio template designed to showcase your work and skills
          beautifully.
        </div>
      </div>
    </div>
  );
};
