import { ReactElement } from "react";

export type User = {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
  sid: string;
};

export type Post = {
  _id: string;
  created: string;
  topic: string;
  keywords: string;
  postContent: string;
  title: string;
  metaDescription: string;
};

export interface BenefitProps {
  icon: ReactElement;
  title: string;
  children: string;
}

export interface BenefitsData {
  data: {
    title: string;
    desc: string;
    image: HTMLImageElement;
    imgPos?: "right" | "left" | "top" | "bottom";
    imageAlt: string;
    bullets: {
      title: string;
      desc: string;
      icon: ReactElement;
    }[];
  };
}

export interface SectionData {
  data: {
    title: string;
    desc?: string;
    image: HTMLImageElement;
    imagePos?: "right" | "left";
    imageAlt: string;
    wordsToColor: string[];
  };
}

export interface Tier {
  id: number;
  name: string;
  desc: string;
  benefits: { name: string }[];
  price: number;
  quantity: number;
  recommended?: boolean;
}
