import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout · Kids Party",
};

export default function CheckoutPage() {
  return (
    <div className="bg-[#fff7f2]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-[#7a6b8a]">
          <Link href="/" className="hover:text-[#ff5d73]">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#ff5d73]">
            Shop
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#2a1a3e]">Checkout</span>
        </nav>
        <h1 className="mb-8 font-display text-3xl font-bold text-[#2a1a3e] sm:text-4xl">
          Checkout 🛍️
        </h1>
        <CheckoutForm />
      </div>
    </div>
  );
}
