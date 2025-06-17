export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Parking Ticket",
  description: "Turn parking into a movie screening.",
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
    github: "https://github.com/wilyanse/parking_ticket",
  },
};
