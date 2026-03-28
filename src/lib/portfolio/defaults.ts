import type { PortfolioContent } from "./types";

export const DEFAULT_PORTFOLIO_CONTENT: PortfolioContent = {
  hero: {
    eyebrow: "WORK WITH KURO",
    leadIn: "Turning your footage into",
    rotatingPhrases: [
      "powerful stories",
      "reach and revenue ",
      "lasting success",
    ],
    tagline: "Where creativity meets precision in every frame",
  },
  sections: {
    projectsTitle: "THE LONG PLAY",
    shortsTitle: "THE SHORT FUSE",
    testimonialsTitle: "WHAT PEOPLE SAY",
  },
  videos: [
    {
      id: 3,
      videoId: "Y76PMmZnYQY",
      client: "You nailed it first try 👏",
      kuro: " Means a lot, bro!",
      clientName: "Ryan Pictures",
      imageSrc: "/1.jpg",
      youtubeStats: "380k+ Subscribers",
    },
    {
      id: 1,
      videoId: "9tjM627dvLk",
      client: "YOU KILLED IT 👑",
      kuro: "Haha appreciate the crown 👏🏻",
      clientName: "Pepezilla",
      imageSrc: "/2.jpg",
      youtubeStats: "180k+ Subscribers",
    },
    {
      id: 4,
      videoId: "kYLBNEn7KVI",
      client: " This is so sick, great job!!",
      kuro: "Thanks man 🙏",
      clientName: "Waffloos Plus",
      imageSrc: "/4.jpg",
      youtubeStats: "100k+ Subscribers",
    },
    {
      id: 6,
      videoId: "0H6bGdsGpOs",
      client: " I don't even have notes, this is perfect.",
      kuro: "That's the best feedback ever 🔥",
      clientName: "Specular Drama",
      imageSrc: "/7.jpg",
      youtubeStats: "2.5k+ Subscribers",
    },
  ],
  shorts: [
    { shortId: "ve88PYjFzRU" },
    { shortId: "8wV-h3iVKMU" },
    { shortId: "ve88PYjFzRU" },
    { shortId: "8wV-h3iVKMU" },
    { shortId: "ve88PYjFzRU" },
    { shortId: "8wV-h3iVKMU" },
  ],
  testimonials: [
    {
      id: "t1",
      authorName: "Ryan Pictures",
      imageSrc: "/1.jpg",
      testimonialText:
        "Kuro was one of my first editors who helped me get my first big videos on YouTube. He's an OG, high quality edits, and great to work with. Highly recommended!",
      designation: "380k+ Subscribers",
    },
    {
      id: "t2",
      authorName: "Pepezilla",
      imageSrc: "/2.jpg",
      testimonialText:
        "Super creative guy. Always on time. The ideas and the quality of the videos are just something else !!!",
      designation: "180k+ Subscribers",
    },
    {
      id: "t3",
      authorName: "Noxiee",
      imageSrc: "/noxiee.png",
      testimonialText:
        "Fast, reliable, and insanely talented. He took my rough footage and turned it into something I was proud to upload. Couldn't recommend enough!",
    },
    {
      id: "t4",
      authorName: "MJ",
      imageSrc: "/mj.png",
      testimonialText:
        "One of the smoothest collaborations I've had. Kuro not only edits but also understands content strategy. The videos performed way better after his touch.",
    },
    {
      id: "t5",
      authorName: "Venom",
      imageSrc: "/venom.png",
      testimonialText:
        "Kuro just gets it. Every edit feels like it's made to keep viewers hooked till the very end. Super easy to work with and always brings fresh ideas.",
    },
  ],
  about: {
    title: "Hi there, I'm Kuro",
    body: "I help content creators transform their ideas into visually engaging, results-driven videos. From storytelling to editing and polishing visuals — I bring creativity and clarity together to make your content stand out.",
    ctaPrefix: "Ready to elevate your content? Let's",
    ctaLinkText: "connect",
    ctaUrl: "https://x.com/workwithkuro",
    ctaSuffix: " and make it happen!",
  },
  footer: {
    copyrightName: "Kuro",
    copyrightYear: "2025",
  },
  socialLinks: [
    {
      id: "s1",
      label: "X",
      url: "https://x.com/workwithkuro",
      platform: "x",
    },
    {
      id: "s2",
      label: "Email",
      url: "mailto:workwithkuro@gmail.com",
      platform: "email",
    },
    {
      id: "s3",
      label: "Discord",
      url: "https://discord.com/users/710889197124321351",
      platform: "discord",
    },
  ],
};
