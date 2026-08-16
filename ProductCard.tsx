"use client";

import Link from "next/link";
import type { Product } from "@/db/schema";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import ProductImage from "./ProductImage";
import StarRating from "./StarRating";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round((1 - product.price / product.compareAtPrice) * 100)
      : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      gradientFrom: product.gradientFrom,
      gradientTo: product.gradientTo,
    });
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white card-shadow transition-all duration-300 hover:-translate-y-1.5 hover:card-shadow-lg"
    >
      <div className="relative">
        <ProductImage
          emoji={product.emoji}
          gradientFrom={product.gradientFrom}
          gradientTo={product.gradientTo}
          className="aspect-square w-full"
          badge={product.badge}
        />
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-[#2a1a3e] px-2.5 py-1 text-xs font-bold text-white shadow">
            -{discount}%
          </span>
        )}
        <button
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-xl text-[#ff5d73] opacity-0 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#ff5d73] hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
        >
          +
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#b09bc4]">
          {product.brand} · {product.ageRange}
        </span>
        <h3 className="font-display text-base font-semibold leading-snug text-[#2a1a3e] line-clamp-2">
          {product.name}
        </h3>
        <StarRating value={product.rating / 10} count={product.reviewCount} />
        <div className="mt-auto flex items-end gap-2 pt-1">
          <span className="font-display text-lg font-bold text-[#ff5d73]">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-[#b09bc4] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
