import type { ImageMetadata } from "astro";
import type I18nKeys from "../locales/keys";

interface Configuration {
  title: string;
  subTitle: string;
  brandTitle: string;

  description: string;

  site: string;

  locale: "en" | "zh-CN";

  navigators: { nameKey: I18nKeys; href: string }[];

  username: string;
  sign: string;
  avatarUrl?: string;
  avatar?: ImageMetadata

  socialLinks: {
    icon: string | (((_props: any) => any) & ImageMetadata);
    /**
     * defaults to url
     * */
    type?: 'url' | 'svg' | 'lottie';
    link: string;
    name: string;
  }[];

  banners: string[];

  slugMode: "HASH" | "RAW";

  license: {
    name: string;
    url: string;
  };

  bannerStyle: "LOOP";
}

export type { Configuration };
