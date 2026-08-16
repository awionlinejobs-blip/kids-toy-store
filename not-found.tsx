import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <span className="text-7xl animate-float-slow">🎈</span>
      <h1 className="mt-6 font-display text-4xl font-bold text-[#2a1a3e]">
        Oops! Page not found
      </h1>
      <p className="mt-3 text-[#5a4a6a]">
        Looks like this balloon floated away. Let&apos;s get you back to the fun.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[#ff5d73] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#2a1a3e]"
      >
        Back to Home
      </Link>
    </div>
  );
}
