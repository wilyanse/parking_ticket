import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { SVGProps } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";
import { Logo } from "@/components/icons";

export function WebsiteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1.5em"
      viewBox="0 0 24 24"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.462 16.154h5.077v-.77l-.847-.423q.698 0 1.195-.497t.497-1.195V9.461q0-.92-.781-1.306t-2.598-.386q-1.753 0-2.571.408T8.616 9.47v3.794q0 .696.497 1.197t1.195.5l-.846.423zm1.057-2.039q-.275 0-.455-.18t-.18-.454t.18-.455t.455-.18t.455.18t.18.455t-.18.454t-.455.18m2.962 0q-.275 0-.455-.18t-.18-.454t.18-.455t.455-.18t.455.18t.18.455t-.18.454t-.455.18M9.5 12.077V9.461h5v2.616zM4.616 19q-.667 0-1.141-.475T3 17.386V15.28q0-.218.108-.398t.305-.27q.716-.411 1.152-1.09Q5 12.84 5 11.998t-.436-1.52q-.435-.679-1.15-1.09q-.199-.089-.306-.27T3 8.721V6.616q0-.667.475-1.141T4.615 5h14.77q.666 0 1.14.475T21 6.615v2.106q0 .218-.108.398t-.305.27q-.716.411-1.151 1.09q-.436.68-.436 1.522t.436 1.52t1.15 1.09q.199.089.306.27t.108.398v2.105q0 .667-.475 1.141t-1.14.475z"
        fill="currentColor"
      />
    </svg>
  );
}

export const Navbar = () => {
  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("currentUser");

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {isLoggedIn && <NavbarMenuToggle />}
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/home"
          >
            <WebsiteIcon />
            <p className="font-bold text-inherit">Parking Ticket</p>
          </Link>
        </NavbarBrand>
        {!isLoggedIn && (
          <div className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </div>
        )}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu className="max-w-[1280px] mx-auto">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
