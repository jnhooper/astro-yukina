import avatar from './src/assets/photos/avatar.jpeg'
import GithubIcon from './src/assets/svg/githubLogo.svg'
import GmailIcon from './src/assets/svg/gmailLogo.svg'
import LinkedinIcon from './src/assets/svg/linkedinLogo.svg'
export const YukinaConfig = {
  Title: "John Nissen-Hooper",
  SubTitle: "Lead Engineer, making accessibility more accessible", // doesn't work when UseHitokotoSubtitle is true
  BrandTitle: "John",
  UseHitokotoSubtitle: false,
  Description: "Lead Engineer",
  IconfontURL: "//at.alicdn.com/t/c/font_4507154_ptdxadr7249.css",
  Avatar: avatar,

  Username: "John",
  Sign: "Ad Astra Per Aspera.",
  SocialLinks: [
    {
      icon: LinkedinIcon,
      link: 'https://www.linkedin.com/in/nissenhooper/',
    },
    {
      icon: GmailIcon,
      link: 'mailto:john.nissenhooper@gmail.com',
    },
    {
      icon: GithubIcon,
      link: "https://github.com/jnhooper",
    },
  ],

  EnableBanner: true,

  // NOT IMPLEMENTED
  SlugGenerateMode: "HASH", // 'RAW' | 'HASH'

  HitokotoSettings: {
    // see: https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
    url: "international.v1.hitokoto.cn",
    // see: https://developer.hitokoto.cn/sentence/#%E5%8F%A5%E5%AD%90%E7%B1%BB%E5%9E%8B-%E5%8F%82%E6%95%B0
    content_types: ["a", "b"],
  },
};
