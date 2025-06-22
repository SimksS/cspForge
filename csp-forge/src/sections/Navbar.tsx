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
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { navItems } from "@/lib/constants";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export function NavbarDemo() {

  const t = useTranslations('Navbar');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const translatedNavItems = navItems.map(item => ({
    ...item,
    name: t(`${item.name}`),
  }));

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={translatedNavItems} />
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
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
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{t(`${item.name}`)}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
             
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
     

      {/* Navbar */}
    </div>
  );
}


