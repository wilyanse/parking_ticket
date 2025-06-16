export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Parking Ticket",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Parking Lots",
      href: "/locations",
    },
    {
      label: "Reservations",
      href: "/reservations",
    },
    {
      label: "Users",
      href: "/users",
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
  links: {
    github: "https://github.com/frontio-ai/heroui",
    docs: "https://heroui.com",
  },
};
