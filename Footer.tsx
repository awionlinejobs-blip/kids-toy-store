import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Toys", href: "/shop" },
      { label: "Building Blocks", href: "/shop?category=building-blocks" },
      { label: "Plush & Soft Toys", href: "/shop?category=plush-toys" },
      { label: "Remote Control", href: "/shop?category=remote-control" },
      { label: "Party Supplies", href: "/shop?category=party" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Track Your Order", href: "/shop" },
      { label: "Delivery & Returns", href: "/shop" },
      { label: "Cash on Delivery", href: "/shop" },
      { label: "Contact Us", href: "/shop" },
      { label: "FAQs", href: "/shop" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/shop" },
      { label: "Toy Safety", href: "/shop" },
      { label: "Careers", href: "/shop" },
      { label: "Blog", href: "/shop" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#2a1a3e] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff5d73] to-[#ffb02e] text-2xl">
                🎈
              </span>
              <span className="font-display text-2xl font-bold">Kids Party</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Pakistan&apos;s happiest toy shop. We deliver joy, laughter and
              handpicked toys to doorsteps in every city — with cash on delivery
              and a smile guaranteed.
            </p>
            <div className="mt-5 flex gap-3">
              {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                <span
                  key={i}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-[#ff5d73]"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-lg font-semibold">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition hover:text-[#ffb02e]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Kids Party. Made with ❤️ in Pakistan.</p>
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold">
              💵 Cash on Delivery
            </span>
            <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold">
              💳 Card
            </span>
            <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold">
              📱 JazzCash / Easypaisa
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
