import Image from "next/image";

const clients = [
  {
    name: "ryan",
    image: "/1.jpg",
  },
  {
    name: "pepezilla",
    image: "/2.jpg",
  },
  {
    name: "malice",
    image: "/3.jpg",
  },
  {
    name: "waffloose plus",
    image: "/4.jpg",
  },
  {
    name: "food with chetna",
    image: "/5.jpg",
  },
  {
    name: "waffy",
    image: "/6.jpg",
  },
  {
    name: "specular",
    image: "/7.jpg",
  },
];

export const People = () => {
  return (
    <div className="w-full py-6 flex items-center justify-center gap-x-4 p-4">
      {clients.map((client, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <Image
              className="rounded-full object-cover"
              fill
              alt={client.name}
              src={client.image}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
