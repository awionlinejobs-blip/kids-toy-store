"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import ProductImage from "./ProductImage";

const FREE_SHIPPING_THRESHOLD = 5000;

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    count,
  } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-[#2a1a3e]/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#fff7f2] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ffe3d5] bg-white px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <div>
              <h2 className="font-display text-lg font-bold text-[#2a1a3e]">
                Your Cart
              </h2>
              <p className="text-xs text-[#7a6b8a]">
                {count} {count === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#2a1a3e] transition hover:bg-[#ffe3d5]"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="text-6xl animate-float-slow">🎁</span>
            <h3 className="font-display text-xl font-bold text-[#2a1a3e]">
              Your cart is empty
            </h3>
            <p className="text-sm text-[#7a6b8a]">
              Let&apos;s fill it with something fun! Explore our toys and party
              favourites.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-2 rounded-full bg-[#ff5d73] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2a1a3e]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b border-[#ffe3d5] bg-white px-5 py-3">
              {remaining > 0 ? (
                <p className="text-xs font-semibold text-[#2a1a3e]">
                  Add {formatPrice(remaining)} more for{" "}
                  <span className="text-[#ff5d73]">FREE delivery</span> 🚚
                </p>
              ) : (
                <p className="text-xs font-semibold text-[#22a06b]">
                  🎉 You&apos;ve unlocked FREE delivery!
                </p>
              )}
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#ffe3d5]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#ff5d73] to-[#ffb02e] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="flex gap-3 rounded-2xl bg-white p-3 card-shadow"
                >
                  <ProductImage
                    emoji={item.emoji}
                    gradientFrom={item.gradientFrom}
                    gradientTo={item.gradientTo}
                    className="h-20 w-20 flex-shrink-0 rounded-xl"
                    emojiClassName="text-3xl"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="text-sm font-bold leading-snug text-[#2a1a3e] line-clamp-2 hover:text-[#ff5d73]"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="text-[#b09bc4] transition hover:text-[#ff5d73]"
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-full border border-[#ffe3d5] bg-[#fff7f2] p-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.slug, item.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-lg font-bold text-[#2a1a3e] transition hover:bg-[#ffe3d5]"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-[#2a1a3e]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.slug, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-lg font-bold text-[#2a1a3e] transition hover:bg-[#ffe3d5]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-display text-sm font-bold text-[#ff5d73]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-[#ffe3d5] bg-white px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#7a6b8a]">
                  Subtotal
                </span>
                <span className="font-display text-xl font-bold text-[#2a1a3e]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ff5d73] py-3.5 text-sm font-bold text-white transition hover:bg-[#2a1a3e]"
              >
                Checkout →
              </Link>
              <button
                onClick={closeCart}
                className="mt-2 w-full rounded-full py-2.5 text-sm font-semibold text-[#7a6b8a] transition hover:text-[#2a1a3e]"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
