// ----------------------
// TYPES
// ----------------------
export type ItemType = "project" | "design";

export interface PortfolioItem {
  src: string;
  alt: string;
  text: string;
  type: ItemType;
  link?: string;
  fbLink?: string;
  website?: string;
  instagram?: string;
}

export interface Section {
  items: PortfolioItem[];
}

// ----------------------
// HERO DATA
// ----------------------
export const HERO_DATA = {
  techSlides: ["Figma.", "Chakra UI.", "Typescript.", "Strapi CMS.", "NextJs."],
  title: "Hi, I am WebDev",
  headingMain: "Your Creative Partner in Crafting Exceptional",
  headingAccent: "Digital Experiences!",
  mission:
    "My mission is simple: to make your digital presence seamless, engaging, and impactful. Let’s create something extraordinary together!",
} as const;

// ----------------------
// PORTFOLIO SECTIONS
// ----------------------
export const sections: Section[] = [
  {
    items: [
      {
        src: "/images/imageFive.png",
        alt: "Mackialo events",
        text: "Mackialo Projects",
        link: "https://mackialo.com",
        type: "project",
        website: "https://mackialo.com",
        fbLink: "https://facebook.com/mackialo",
      },
      {
        src: "/images/imageSix.png",
        alt: "Renata Valcik",
        text: "Renata Valcik",
        link: "https://renatavalcik.com",
        type: "project",
        instagram: "https://instagram.com/renatavalcik",
      },
      {
        src: "/images/imageSeven.png",
        alt: "Animatrix",
        text: "Animatrix",
        link: "https://animatrix.lt",
        type: "project",
        website: "https://animatrix.lt",
      },
      {
        src: "/images/imageEight.png",
        alt: "Something for Windy",
        text: "Something for Windy",
        link: "https://somethingforwindy.netlify.app",
        type: "project",
      },
      {
        src: "/images/imageNine.png",
        alt: "G-Service",
        text: "G Service",
        link: "https://g-service.netlify.app",
        type: "project",
      },
      {
        src: "/images/imageOne.png",
        alt: "Epic forests",
        text: "Epic forests",
        type: "design",
        instagram: "https://instagram.com/design_forest",
      },
      {
        src: "/images/imageTwo.png",
        alt: "Cozy cafe",
        text: "Cozy cafe",
        type: "design",
      },
      {
        src: "/images/imageThree.png",
        alt: "Parfois",
        text: "Parfois",
        type: "design",
      },
      {
        src: "/images/imageFour.png",
        alt: "Sauce pizza",
        text: "Sauce pizza",
        type: "design",
      },
    ],
  },
];
