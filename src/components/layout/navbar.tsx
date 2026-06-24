"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

import { useContext, useState } from "react";
import { ScrollContext } from "@/providers/lenis-provider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AppNavbar() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "TechStacks",
      link: "#TechStacks",
    },
    {
      name: "Timeline",
      link: "#TimeLine",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lenis } = useContext(ScrollContext);
  const router = useRouter();

  const handleDesktopScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string
  ) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(link);
    }
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string
  ) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} onItemClick={handleDesktopScroll} />
          <div className="flex items-center gap-4">
            <NavbarButton href="https://calendly.com/creovotech/30min" variant="primary">
              Book a call
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => handleScroll(e, item.link)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton href="https://calendly.com/creovotech/30min" variant="primary" className="w-full">
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}