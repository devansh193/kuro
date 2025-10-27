import { TestimonialCard } from "../components/ui/testimonial-card";

export const TestimonialView = () => {
  return (
    <div
      id="testimonials"
      style={{ scrollMarginTop: "5rem" }}
      className="px-2 md:px-0"
    >
      <div className="max-w-5xl mx-auto border-l-[1.5px] border-r-[1.5px] border-spaced-vertical">
        {/* Header */}
        <div className="border-b-[1.5px] border-spaced-horizontal h-20 flex items-center justify-center">
          <h1
            className={`
              font-sans font-semibold text-2xl sm:text-3xl md:text-5xl
              selection:bg-black selection:text-white text-center
            `}
          >
            WHAT PEOPLE SAY
          </h1>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 min-h-150">
          {/* Left column */}
          <div className="flex flex-col  gap-6">
            <TestimonialCard
              authorName="Ryan Pictures"
              imageSrc="/1.jpg"
              className="flex-1 w-full border rounded-3xl flex items-center justify-center"
              testimonialText="Kuro was one of my first editors who helped me get my first big videos on YouTube. He's an OG, high quality edits, and great to work with. Highly recommended!"
              designation="380k+ Subscribers"
            />
            <TestimonialCard
              authorName="Pepezilla"
              imageSrc="/2.jpg"
              className="flex-1 w-full border rounded-3xl flex items-center justify-center"
              testimonialText="Super creative guy. Always on time. The ideas and the quality of the videos are just something else !!!"
              designation="!80k+ Subscribers"
            />
          </div>

          {/* Middle column */}
          <TestimonialCard
            authorName="Noxiee"
            imageSrc="/noxiee.png"
            className="w-full border rounded-3xl flex items-center justify-center"
            testimonialText="Fast, reliable, and insanely talented. He took my rough footage and turned it into something I was proud to upload. Couldn't recommend enough!"
          />

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <TestimonialCard
              authorName="MJ"
              imageSrc="/mj.png"
              className="flex-1 w-full border rounded-3xl flex items-center justify-center"
              testimonialText="One of the smoothest collaborations I've had. Kuro not only edits but also understands content strategy. The videos performed way better after his touch."
            />
            <TestimonialCard
              authorName="Venom"
              imageSrc="/venom.png"
              className="flex-1 w-full border rounded-3xl flex items-center justify-center"
              testimonialText="Kuro just gets it. Every edit feels like it's made to keep viewers hooked till the very end. Super easy to work with and always brings fresh ideas."
            />
          </div>
        </div>
      </div>
      <div className="border-b-[1.5px] border-spaced-horizontal" />
    </div>
  );
};
