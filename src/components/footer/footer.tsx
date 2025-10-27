export const Footer = () => {
  return (
    <footer className="w-full">
      <div className="w-full border-t-[1.5px] border-b-[1.5px] border-spaced-horizontal">
        <div
          className="
            mx-4 sm:mx-8 md:mx-12 lg:mx-[50px] 
            px-4 sm:px-6 md:px-10 
            border-l-[1.5px] border-r-[1.5px] border-spaced-vertical 
            bg-[#EDEDED] 
            flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 
            py-4
          "
        >
          <p className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
            © 2025 Kuro. All rights reserved.
          </p>
          <span className="hidden md:block font-semibold text-2xl sm:text-3xl md:text-4xl font-phudu ">
            <a href="#home">KURO</a>
          </span>
          <div className="flex gap-4 text-xs sm:text-sm flex-wrap justify-center">
            <a
              href="https://x.com/workwithkuro"
              target="_blank"
              className="hover:underline"
            >
              X
            </a>
            <a
              href=" https://discord.com/users/710889197124321351"
              target="_blank"
              className="hover:underline"
            >
              Discord
            </a>
            <a href="mailto:workwithkuro@gmail.com" className="hover:underline">
              Email
            </a>
          </div>
        </div>
      </div>
      <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-[50px] border-l-[1.5px] border-r-[1.5px] border-spaced-vertical py-3" />
    </footer>
  );
};
