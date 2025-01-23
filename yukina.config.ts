
 import avatar from './src/assets/photos/avatar.jpeg'
 import LinkedInAnimate from './src/assets/svg/LinkedInAnimate.svg'
// import GithubIcon from './src/assets/svg/githubLogo.svg'
// import GmailIcon from './src/assets/svg/gmailLogo.svg'
// import LinkedinIcon from './src/assets/svg/linkedinLogo.svg'
// export const YukinaConfig = {
//   Title: "John Nissen-Hooper",
//   SubTitle: "Lead Engineer, making accessibility more accessible", // doesn't work when UseHitokotoSubtitle is true
//   BrandTitle: "John",
//   UseHitokotoSubtitle: false,
//   Description: "Lead Engineer",
//   IconfontURL: "//at.alicdn.com/t/c/font_4507154_ptdxadr7249.css",
//   Avatar: avatar,

//   Username: "John",
//   Sign: "Ad Astra Per Aspera.",
//   SocialLinks: [
//     {
//       icon: LinkedinIcon,
//       link: 'https://www.linkedin.com/in/nissenhooper/',
//     },
//     {
//       icon: GmailIcon,
//       link: 'mailto:john.nissenhooper@gmail.com',
//     },
//     {
//       icon: GithubIcon,
//       link: "https://github.com/jnhooper",

import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const YukinaConfig: Configuration = {
  title: "John Nissen-Hooper",
  //subTitle: "Yukina Template Demo Site",
   subTitle: "Lead Engineer, making accessibility more accessible", // doesn't work when UseHitokotoSubtitle is true

  brandTitle: "Hooper",

  description: "Demo Site",

  site: "https://nissenhooper.com/",

  locale: "en", // set for website language and date format

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "/",
    },
    {
      nameKey: I18nKeys.nav_bar_archive,
      href: "/archive",
    },
    {
      nameKey: I18nKeys.nav_bar_about,
      href: "/about",
    },
    {
      nameKey: I18nKeys.nav_bar_github,
      href: "https://github.com/jnhooper",
    },
  ],

  username: "jnhooper",
  sign: "Lead Engineer",
  //avatarUrl: "https://s2.loli.net/2025/01/17/lUorhYXqFMIyGnj.webp",
 avatar: avatar,
  socialLinks: [
    {
      icon: "line-md:github-loop",
      link: "https://github.com/jnhooper",
       name: 'Github'
    },
    {
      icon: "line-md:linkedin",
      link: "https://www.linkedin.com/in/nissenhooper/",
       name: 'LinkedIn'
    },
    {
      icon: "line-md:email",
      link: "mailto:john.nissenhooper@gmail.com",
       name: 'email'
    },
  ],

  banners: [
    "https://s2.loli.net/2024/11/23/DIGYWarlfgN4Fnq.webp",
    "https://s2.loli.net/2024/11/23/TlyqvFUjBxbWsDQ.webp",
    "https://s2.loli.net/2024/08/20/5fszgXeOxmL3Wdv.webp",
    "https://s2.loli.net/2024/12/06/uL4YUptnKlPxbaZ.webp",
    "https://s2.loli.net/2024/12/06/tjG9RkSoiDgF7CA.webp",
    "https://s2.loli.net/2024/12/06/ntIKl6Lkg3Ta5DF.webp",
    "https://s2.loli.net/2024/12/06/se2tHfcVqPmzi6F.webp",
    "https://s2.loli.net/2024/12/06/kKjCBuebX4OUlgw.webp",
  ],

  slugMode: "HASH", // 'RAW' | 'HASH'

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default YukinaConfig;
