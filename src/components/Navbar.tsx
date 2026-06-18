"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShow(false);
      } else {
        setShow(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Foods", href: "/categories" },
    { label: "Ingredients", href: "/ingredients" },
    { label: "Local Culinary", href: "/areas" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={`
        fixed top-0 z-50 w-full
        border-b border-slate-200
        bg-white
        transition-all duration-300 ease-in-out
        ${show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          <span className="text-orange-500">meal</span>
          <span className="text-slate-800"> - Explorer</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative text-sm font-medium transition-colors
                  hover:text-orange-500
                  ${active ? "text-orange-500" : "text-slate-600"}
                `}
              >
                {item.label}

                <span
                  className={`
                    absolute -bottom-2 left-0 h-[2px] w-full rounded-full
                    bg-orange-500 transition-opacity duration-200
                    ${active ? "opacity-100" : "opacity-0"}
                  `}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden overflow-hidden border-t border-slate-100 bg-white
          transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96" : "max-h-0"}
        `}
      >
        <div className="px-6 py-3">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  block rounded-lg px-3 py-2 text-sm transition
                  hover:bg-orange-50 hover:text-orange-500
                  ${active ? "text-orange-500 bg-orange-50" : "text-slate-700"}
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}