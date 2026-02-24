"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTENT_CLASS } from "@/lib/site";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/decks", label: "套系百科" },
  { href: "/spreads", label: "牌阵中心" },
  { href: "/themes", label: "专题疗愈" },
  { href: "/questions", label: "引导问题" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
      <div className={CONTENT_CLASS}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center shadow-golden">
              <span className="text-white text-sm font-bold">OH</span>
            </div>
            <span className="font-serif text-lg font-semibold text-warm-800 group-hover:text-flame-600 transition-colors">
              看见，即疗愈
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                    ? "bg-gradient-flame text-white shadow-sm"
                    : "text-warm-600 hover:text-flame-600 hover:bg-flame-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-warm-600 hover:bg-flame-50"
            onClick={() => setOpen(!open)}
            aria-label="菜单"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="md:hidden pb-4 pt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                  (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                    ? "bg-gradient-flame text-white"
                    : "text-warm-700 hover:bg-flame-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
