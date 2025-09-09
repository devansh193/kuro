export const Footer = () => {
  return (
    <footer className="w-full">
      {/* Top border section */}
      <div className="w-full border-t-[1.5px] border-b-[1.5px] border-spaced-horizontal h-16">
        <div className="mx-[50px] px-10 border-l-[1.5px] border-r-[1.5px] border-spaced-vertical h-full bg-[#EDEDED] flex items-center justify-between flex-wrap">
          <p className="text-sm text-gray-700">
            © 2025 Kuro. All rights reserved.
          </p>
          <span className="font-semibold text-4xl mr-10">Kuro</span>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:underline">
              X
            </a>
            <a href="#" className="hover:underline">
              Instagram
            </a>
            <a href="mailto:example@email.com" className="hover:underline">
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Bottom border section */}
      <div className="mx-[50px] h-12 border-l-[1.5px] border-r-[1.5px] border-spaced-vertical" />
    </footer>
  );
};
