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
        bg-white/80 backdrop-blur-xl
        border-b border-slate-100
        transition-all duration-500 ease-in-out
        ${show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight"
        >
          <span className="text-orange-500">meal</span>
          <span className="text-slate-800">-explorer</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative text-sm font-medium
                  transition-colors duration-300
                  hover:text-orange-500
                  ${active ? "text-orange-500" : "text-slate-600"}
                `}
              >
                {item.label}

                {/* underline */}
                <span
                  className={`
                    absolute -bottom-2 left-0 h-[2px] w-full
                    bg-orange-500 rounded-full
                    origin-left transition-transform duration-300
                    ${active ? "scale-x-100" : "scale-x-0"}
                  `}
                />
              </Link>
            );
          })}
        </div>

        {/* MOBILE BUTTON (FIXED: md:hidden) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            md:hidden
            rounded-xl p-2
            transition
            hover:bg-slate-100
            active:scale-95
          "
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden overflow-hidden
          bg-white/90 backdrop-blur-xl
          border-t border-slate-100
          transition-all duration-500 ease-in-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-6 py-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  block rounded-lg px-3 py-2 text-sm
                  transition
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