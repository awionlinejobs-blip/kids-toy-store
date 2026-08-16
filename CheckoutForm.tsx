"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import ProductImage from "./ProductImage";

const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 250;

const provinces = [
  "Sindh",
  "Punjab",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Kashmir",
];

type Form = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  paymentMethod: string;
  notes: string;
};

export default function CheckoutForm() {
  const { items, subtotal, clearCart, isLoaded } = useCart();
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "Sindh",
    paymentMethod: "cod",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderRef, setOrderRef] = useState<string | null>(null);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const update = (key: keyof Form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({
            slug: i.slug,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            emoji: i.emoji,
          })),
          subtotal,
          shipping,
          total,
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      const data = await res.json();
      setOrderRef(data.reference);
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("We couldn't place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Success screen
  if (orderRef) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center card-shadow sm:p-12 animate-fade-up">
        <span className="mb-4 inline-block text-7xl animate-float-slow">🎉</span>
        <h1 className="font-display text-3xl font-bold text-[#2a1a3e]">
          Order Confirmed!
        </h1>
        <p className="mt-3 text-[#5a4a6a]">
          Thank you for shopping with Kids Party. Your order is on its way to
          spreading smiles!
        </p>
        <div className="mx-auto mt-6 inline-flex flex-col rounded-2xl bg-[#fff0e8] px-8 py-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#b09bc4]">
            Order Reference
          </span>
          <span className="font-display text-2xl font-bold text-[#ff5d73]">
            {orderRef}
          </span>
        </div>
        <p className="mt-6 text-sm text-[#7a6b8a]">
          A confirmation has been sent to your email. You&apos;ll receive a call
          from our team to confirm delivery details.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-[#ff5d73] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#2a1a3e]"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (isLoaded && items.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl bg-white p-10 text-center card-shadow">
        <span className="mb-4 inline-block text-7xl">🛒</span>
        <h1 className="font-display text-2xl font-bold text-[#2a1a3e]">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-[#7a6b8a]">
          Add some toys before heading to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-[#ff5d73] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#2a1a3e]"
        >
          Browse Toys
        </Link>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-[#ffe3d5] bg-[#fff7f2] px-4 py-3 text-sm outline-none focus:border-[#ff5d73]";

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_400px]">
      {/* Details */}
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-6 card-shadow">
          <h2 className="font-display text-lg font-bold text-[#2a1a3e]">
            📦 Delivery Details
          </h2>
          <div className="mt-4 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#5a4a6a]">
                  Full Name *
                </label>
                <input
                  className={inputCls}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Ayesha Khan"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#5a4a6a]">
                  Phone *
                </label>
                <input
                  className={inputCls}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="0300 1234567"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#5a4a6a]">
                Email *
              </label>
              <input
                type="email"
                className={inputCls}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#5a4a6a]">
                Address *
              </label>
              <input
                className={inputCls}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="House #, Street, Area"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#5a4a6a]">
                  City *
                </label>
                <input
                  className={inputCls}
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Karachi"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#5a4a6a]">
                  Province
                </label>
                <select
                  className={inputCls}
                  value={form.province}
                  onChange={(e) => update("province", e.target.value)}
                >
                  {provinces.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#5a4a6a]">
                Order Notes (optional)
              </label>
              <textarea
                className={`${inputCls} resize-none`}
                rows={2}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Gift message, delivery instructions..."
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 card-shadow">
          <h2 className="font-display text-lg font-bold text-[#2a1a3e]">
            💳 Payment Method
          </h2>
          <div className="mt-4 space-y-3">
            {[
              { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: "💵" },
              { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard accepted", icon: "💳" },
              { id: "wallet", label: "JazzCash / Easypaisa", desc: "Mobile wallet payment", icon: "📱" },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition ${
                  form.paymentMethod === opt.id
                    ? "border-[#ff5d73] bg-[#fff0e8]"
                    : "border-[#ffe3d5] hover:border-[#ffd0bd]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={form.paymentMethod === opt.id}
                  onChange={() => update("paymentMethod", opt.id)}
                  className="h-4 w-4 accent-[#ff5d73]"
                />
                <span className="text-2xl">{opt.icon}</span>
                <div>
                  <div className="text-sm font-bold text-[#2a1a3e]">
                    {opt.label}
                  </div>
                  <div className="text-xs text-[#7a6b8a]">{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="h-fit lg:sticky lg:top-24">
        <div className="rounded-3xl bg-white p-6 card-shadow">
          <h2 className="font-display text-lg font-bold text-[#2a1a3e]">
            Order Summary
          </h2>
          <div className="mt-4 max-h-72 space-y-3 overflow-y-auto">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center gap-3">
                <div className="relative">
                  <ProductImage
                    emoji={item.emoji}
                    gradientFrom={item.gradientFrom}
                    gradientTo={item.gradientTo}
                    className="h-14 w-14 flex-shrink-0 rounded-xl"
                    emojiClassName="text-2xl"
                  />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2a1a3e] px-1 text-xs font-bold text-white">
                    {item.quantity}
                  </span>
                </div>
                <span className="flex-1 text-sm font-semibold text-[#2a1a3e] line-clamp-2">
                  {item.name}
                </span>
                <span className="text-sm font-bold text-[#5a4a6a]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2 border-t border-[#ffe3d5] pt-4 text-sm">
            <div className="flex justify-between text-[#5a4a6a]">
              <span>Subtotal</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#5a4a6a]">
              <span>Delivery</span>
              <span className="font-semibold">
                {shipping === 0 ? (
                  <span className="text-[#22a06b]">FREE</span>
                ) : (
                  formatPrice(shipping)
                )}
              </span>
            </div>
            <div className="flex justify-between border-t border-[#ffe3d5] pt-3 font-display text-lg font-bold text-[#2a1a3e]">
              <span>Total</span>
              <span className="text-[#ff5d73]">{formatPrice(total)}</span>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-xl bg-[#ffe6ea] px-4 py-2.5 text-sm font-semibold text-[#ff5d73]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#ff5d73] py-4 text-base font-bold text-white transition hover:bg-[#2a1a3e] disabled:opacity-60"
          >
            {submitting ? "Placing Order..." : `Place Order · ${formatPrice(total)}`}
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#7a6b8a]">
            🔒 Secure checkout · 100% satisfaction guaranteed
          </p>
        </div>
      </div>
    </form>
  );
}
