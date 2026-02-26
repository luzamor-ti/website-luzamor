export interface HeroCTA {
  text: string;
  url: string;
}

export interface Hero {
  _id: string;
  _type: "hero";
  title: string;
  tagline?: string;
  subtitle?: string;
  image?: {
    asset: {
      _id: string;
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  primaryCta?: HeroCTA;
  secondaryCta?: HeroCTA;
  active?: boolean;
}
