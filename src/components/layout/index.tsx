import { Navbar } from "../navbar/navbar";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex min-h-screen pt-20">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
