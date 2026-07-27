export interface AboutImage {
  src: string;
  name: string;
}

const fileNames = [
  "about-1.jpg",
  "about-2.jpeg",
  "about-3.JPG",
  "about-5.jpeg",
  "about-6.jpeg",
  "about-7.JPG",
  "about-8.jpg",
];

export const aboutImages: AboutImage[] = fileNames.map((name) => ({
  src: `/images/about-pics/${name}`,
  name,
}));
