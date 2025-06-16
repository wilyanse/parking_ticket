export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/home",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  get navItems() {
    return this.navMenuItems;
  },
  links: {
    github: "https://github.com/frontio-ai/heroui",
    docs: "https://heroui.com",
  },
};
