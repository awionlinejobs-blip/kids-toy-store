"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const inStock = product.stock > 0;

  const handleAdd = () => {
    if (!inStock) return;

    addToCart(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
        gradientFrom: product.gradientFrom,
        gradientTo: product.gradientTo,
      },
      qty
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-[#7a6b8a]">
          Quantity
        </span>

        <div className="flex items-center gap-1 rounded-full border border-[#ffe3d5] bg-white p-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl font-bold text-[#2a1a3e] transition hover:bg-[#ffe3d5]"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span className="w-8 text-center font-display text-lg font-bold text-[#2a1a3e]">
            {qty}
          </span>

          <button
            onClick={() =>
              setQty((q) => Math.min(product.stock, q + 1))
            }
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl font-bold text-[#2a1a3e] transition hover:bg-[#ffe3d5]"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAdd}
          disabled={!inStock}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full py-4 text-base font-bold text-white transition ${
            inStock
              ? "bg-[#ff5d73] hover:bg-[#2a1a3e]"
              : "cursor-not-allowed bg-[#d9cfe0]"
          }`}
        >
          {added
            ? "✓ Added to cart!"
            : inStock
              ? "🛒 Add to Cart"
              : "Out of Stock"}
        </button>

        <button
          onClick={handleAdd}
          disabled={!inStock}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#2a1a3e] py-4 text-base font-bold text-[#2a1a3e] transition hover:bg-[#2a1a3e] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center font-display text-lg font-bold text-[#2a1a3e]">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl font-bold text-[#2a1a3e] transition hover:bg-[#ffe3d5]"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAdd}
          disabled={!inStock}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full py-4 text-base font-bold text-white transition ${
            inStock
              ? "bg-[#ff5d73] hover:bg-[#2a1a3e]"
              : "cursor-not-allowed bg-[#d9cfe0]"
          }`}
        >
          {added ? "✓ Added to cart!" : inStock ? "🛒 Add to Cart" : "Out of Stock"}
        </button>
        <button
          onClick={() => {
            if (inStock) {
              handleAdd();
              openCart();
            }
          }}
          disabled={!inStock}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#2a1a3e] py-4 text-base font-bold text-[#2a1a3e] transition hover:bg-[#2a1a3e] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
