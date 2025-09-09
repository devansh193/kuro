import { TestimonialCard } from "../components/ui/testimonial-card";

export const TestimonialView = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto border-l-[1.5px] border-r-[1.5px] border-spaced-vertical">
        <div className="border-b-[1.5px] border-spaced-horizontal h-20 flex items-center justify-center">
          <h1
            className={`
            /* typography */
            font-sans font-semibold text-2xl md:text-5xl
            /* interactivity */
            selection:bg-black selection:text-white
          `}
          >
            WHAT PEOPLE SAY
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-150 p-4">
          <div className="col-span-1 w-full h-full flex flex-col items-center justify-center gap-4">
            <TestimonialCard
              authorName="John Doe"
              imageSrc="/1.jpg"
              className="h-3/4 w-full flex items-center justify-center border rounded-3xl"
            />
            <TestimonialCard
              authorName="Jane Smith"
              imageSrc="/2.jpg"
              className="h-1/4 w-full border rounded-3xl flex items-center justify-center"
            />
          </div>
          <TestimonialCard
            authorName="Alice Johnson"
            imageSrc="/3.jpg"
            className="col-span-1 w-full flex items-center justify-center border rounded-3xl"
          />
          <div className="col-span-1 w-full flex flex-col items-center justify-center gap-4">
            <TestimonialCard
              authorName="Bob Brown"
              imageSrc="/4.jpg"
              className="h-1/2 w-full border rounded-3xl flex items-center justify-center"
            />
            <TestimonialCard
              authorName=""
              imageSrc="/5.jpg"
              className="h-1/2 w-full border rounded-3xl flex items-center justify-center"
            />
          </div>
        </div>
      </div>
      <div className="border-b-[1.5px] border-spaced-horizontal" />
    </div>
  );
};
