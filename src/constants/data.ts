export type WorkKind = "product" | "study"

export interface WorkLink {
  label: string
  href: string
}

export interface WorkItem {
  code: string
  title: string
  kind: WorkKind
  summary: string
  href?: string
  image?: string
  imageAlt?: string
  links?: WorkLink[]
}

export interface Layer {
  index: string
  name: string
  summary: string
  tools: string[]
}

export const profile = {
  name: "WebDev I'm",
  mark: "WD—IM",
  email: "wedev.im@gmail.com",
  url: "https://webdevim.netlify.app",
} as const

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/webdev-im/",
  },
  {
    label: "Behance",
    href: "https://www.behance.com/webdev-im/",
  },
  {
    label: "Dribbble",
    href: "https://www.dribbble.com/webdevim/",
  },
] as const

export const slate = [
  { label: "Status", value: "Available for projects" },
  { label: "Scope", value: "Interface through operations" },
  { label: "Interface", value: "Next.js · Chakra · Tailwind" },
  { label: "Data", value: "Supabase · Firebase · Strapi" },
  { label: "Intelligence", value: "AI inside the product" },
  { label: "Operations", value: "Domains · DNS · Email" },
] as const

export const layers: Layer[] = [
  {
    index: "01",
    name: "Interface",
    summary:
      "The part a person meets first. Type, layout, and a component system — drawn in Figma, built in Chakra UI or Tailwind — that still agrees with itself on the tenth screen.",
    tools: ["Next.js", "React", "TypeScript", "Figma", "Chakra UI", "Tailwind"],
  },
  {
    index: "02",
    name: "Application",
    summary:
      "Validation, auth, and permissions between the screen and the data. A visitor, an editor, and an admin do not share one door.",
    tools: ["TypeScript", "Auth", "Validation", "Access rules"],
  },
  {
    index: "03",
    name: "Intelligence",
    summary:
      "AI as a layer of the system, not a widget pasted in the corner. Drafting, classification, or retrieval over the client's own records, called from the application and bound by the same permissions.",
    tools: ["Drafting", "Classification", "Retrieval", "Workflows"],
  },
  {
    index: "04",
    name: "Data",
    summary:
      "Supabase when the product wants Postgres and row-level access. Firebase when it wants realtime and managed auth. Strapi when an editor should publish without waiting on a deploy.",
    tools: ["Supabase", "Firebase", "Strapi"],
  },
  {
    index: "05",
    name: "Operations",
    summary:
      "The domain has to resolve, and the mailbox has to open on Monday. DNS, client email, and the deployment are part of the build.",
    tools: ["Domains", "DNS", "Client email", "Deployment"],
  },
]

export const signalPath = [
  "Browser",
  "Next.js",
  "Application rules",
  "AI workflow",
  "Supabase · Firebase · Strapi",
  "Domain and mail",
] as const

export const works: WorkItem[] = [
  {
    code: "01",
    title: "Obake",
    kind: "product",
    summary:
      "An operating system for a company. Projects, people, invoices, stock, and sites in one workspace.",
    href: "https://obake.click",
    image: "/projects/obake.webp",
    imageAlt: "Obake OS homepage: one workspace for projects, people, invoices, and sites",
  },
  {
    code: "02",
    title: "Boostas",
    kind: "product",
    summary:
      "Property site for the Baltics. Search houses and flats by place, size, and price.",
    href: "https://boostas.eu",
    image: "/projects/boostas.webp",
    imageAlt: "Boostas homepage: find favourite properties in the Baltics",
  },
  {
    code: "03",
    title: "Mackialo",
    kind: "product",
    summary:
      "Public site for an events practice, with the social channels sitting beside the work.",
    href: "https://mackialo.com",
    image: "/projects/mackialo.webp",
    imageAlt: "Mackialo homepage for AUDRA 2025, with a project list beside the title",
    links: [
      { label: "Facebook", href: "https://www.facebook.com/liucina" },
      { label: "Instagram", href: "https://www.instagram.com/liucina" },
    ],
  },
  {
    code: "04",
    title: "Animatrix",
    kind: "product",
    summary: "Company site, live, and linked through to the company's own channels.",
    href: "https://animatrix.lt",
    image: "/projects/animatrix.webp",
    imageAlt: "Animatrix homepage introducing the studio above a launch scene",
    links: [
      { label: "Facebook", href: "https://www.facebook.com/animatrix.lt/" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/animatrix/",
      },
    ],
  },
  {
    code: "05",
    title: "Renata Valcik",
    kind: "product",
    summary:
      "A personal brand on the web. The page, the name, and the social profiles point at the same person.",
    href: "https://renatavalcik.com",
    image: "/projects/renatavalcik.webp",
    imageAlt: "Renata Valcik homepage, split black and white, with the words theatre and art",
    links: [
      { label: "Facebook", href: "https://www.facebook.com/nana.valc" },
      { label: "Instagram", href: "https://www.instagram.com/renata_valcik" },
    ],
  },
  {
    code: "06",
    title: "Something for Windy",
    kind: "product",
    summary: "A small brand site, shipped and reachable.",
    href: "https://somethingforwindy.netlify.app",
    image: "/projects/windy-gallery.webp",
    imageAlt: "Something for Windy gallery, a night view of London beside Iceland, Venice, Paris, and Scotland",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/somethingforwindy",
      },
    ],
  },
  {
    code: "07",
    title: "G Service",
    kind: "product",
    summary:
      "Marketing site for an auto-care shop. A service index, a reservation prompt, and a language toggle, on a live URL.",
    href: "https://g-service.netlify.app",
    image: "/projects/g-service.webp",
    imageAlt: "G Service homepage: repairs made simple, with a yellow car and service marks on a dark field",
  },
]
