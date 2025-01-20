import avatar from './src/assets/photos/avatar.jpeg'
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
      icon: "ic-github",
      link: "https://github.com/jnhooper",
    },
    {
      icon: "ic-bilibili",
      link: "https://space.bilibili.com/22433608",
    },
    {
      icon: "ic-ncm",
      link: "https://music.163.com/#/user/home?id=125291648",
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
