"use client";

import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import { TestimonialCard } from "../components/ui/testimonial-card";

export const TestimonialView = () => {
  const { content } = usePortfolioContent();
  const { testimonials, sections } = content;

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
            {sections.testimonialsTitle}
          </h1>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 min-h-150">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              authorName={t.authorName}
              imageSrc={t.imageSrc}
              className="w-full border rounded-3xl flex items-center justify-center"
              testimonialText={t.testimonialText}
              designation={t.designation}
            />
          ))}
        </div>
      </div>
      <div className="border-b-[1.5px] border-spaced-horizontal" />
    </div>
  );
};
