"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=building-blocks", label: "Building Blocks" },
  { href: "/shop?category=plush-toys", label: "Plush Toys" },
  { href: "/shop?category=remote-control", label: "Remote Control" },
  { href: "/shop?category=party", label: "Party" },
];

export default function Header() {
  const { count, openCart, isLoaded } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#2a1a3e] text-white overflow-hidden">
        <div className="flex whitespace-nowrap py-2 text-sm font-semibold">
          <div className="flex animate-marquee gap-10 pr-10">
            {Array.from({ length: 2 }).map((_, r) => (
              <div key={r} className="flex gap-10">
                <span>🚚 Free delivery on orders over Rs 5,000</span>
                <span>💵 Cash on Delivery nationwide</span>
                <span>🎁 Free gift wrapping on every order</span>
                <span>⚡ Same-day dispatch in Karachi, Lahore & Islamabad</span>
                <span>🎉 New arrivals every week</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-[#fff7f2]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-[#2a1a3e] transition hover:bg-[#ffe3d5] lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff5d73] to-[#ffb02e] text-2xl shadow-md animate-wiggle">
                🎈
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold text-[#2a1a3e]">
                  Kids Party
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff5d73]">
                  Toys · Pakistan
                </span>
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#2a1a3e] transition hover:bg-[#ffe3d5] hover:text-[#ff5d73]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-xl text-[#2a1a3e] transition hover:bg-[#ffe3d5] sm:flex"
              aria-label="Search shop"
            >
              🔍
            </Link>
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 rounded-full bg-[#2a1a3e] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#ff5d73]"
              aria-label="Open cart"
            >
              <span className="text-lg">🛒</span>
              <span className="hidden sm:inline">Cart</span>
              {isLoaded && count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ffb02e] px-1 text-xs font-extrabold text-[#2a1a3e] animate-pop">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="border-t border-[#ffe3d5] bg-white px-4 py-3 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#2a1a3e] transition hover:bg-[#ffe3d5]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
