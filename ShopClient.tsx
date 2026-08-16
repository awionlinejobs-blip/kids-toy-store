"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@/db/schema";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
};

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under Rs 2,000", min: 0, max: 2000 },
  { label: "Rs 2,000 – 5,000", min: 2000, max: 5000 },
  { label: "Rs 5,000 – 10,000", min: 5000, max: 10000 },
  { label: "Over Rs 10,000", min: 10000, max: Infinity },
];

export default function ShopClient({
  products,
  categories,
  initialCategory,
}: Props) {
  const [category, setCategory] = useState(initialCategory ?? "all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [priceIdx, setPriceIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const range = priceRanges[priceIdx];
    let list = products.filter((p) => {
      if (category !== "all" && p.categorySlug !== category) return false;
      if (p.price < range.min || p.price > range.max) return false;
      if (onlyInStock && p.stock <= 0) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.shortDescription.toLowerCase().includes(q) &&
          !p.brand.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return (
            Number(b.featured) - Number(a.featured) || b.reviewCount - a.reviewCount
          );
      }
    });
    return list;
  }, [products, category, sort, priceIdx, query, onlyInStock]);

  const activeCategoryName =
    category === "all"
      ? "All Toys"
      : categories.find((c) => c.slug === category)?.name ?? "Toys";

  const FilterPanel = () => (
    <div className="space-y-7">
      {/* Search */}
      <div>
        <label className="mb-2 block font-display text-sm font-bold text-[#2a1a3e]">
          Search
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search toys..."
          className="w-full rounded-xl border border-[#ffe3d5] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#ff5d73]"
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-3 font-display text-sm font-bold text-[#2a1a3e]">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setCategory("all")}
            className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
              category === "all"
                ? "bg-[#ff5d73] text-white"
                : "text-[#5a4a6a] hover:bg-[#ffe3d5]"
            }`}
          >
            <span>🌟 All Toys</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                category === c.slug
                  ? "bg-[#ff5d73] text-white"
                  : "text-[#5a4a6a] hover:bg-[#ffe3d5]"
              }`}
            >
              <span>{c.emoji}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="mb-3 font-display text-sm font-bold text-[#2a1a3e]">
          Price Range
        </h3>
        <div className="flex flex-col gap-1">
          {priceRanges.map((r, i) => (
            <button
              key={r.label}
              onClick={() => setPriceIdx(i)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                priceIdx === i
                  ? "bg-[#2a1a3e] text-white"
                  : "text-[#5a4a6a] hover:bg-[#ffe3d5]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* In stock */}
      <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-[#5a4a6a]">
        <input
          type="checkbox"
          checked={onlyInStock}
          onChange={(e) => setOnlyInStock(e.target.checked)}
          className="h-4 w-4 accent-[#ff5d73]"
        />
        In stock only
      </label>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden h-fit rounded-3xl bg-[#fff0e8] p-6 lg:block">
        <FilterPanel />
      </aside>

      <div>
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-[#2a1a3e] sm:text-3xl">
              {activeCategoryName}
            </h1>
            <p className="text-sm text-[#7a6b8a]">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFiltersOpen(true)}
              className="rounded-full border border-[#ffd0bd] bg-white px-4 py-2.5 text-sm font-semibold text-[#2a1a3e] lg:hidden"
            >
              ⚙️ Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-[#ffd0bd] bg-white px-4 py-2.5 text-sm font-semibold text-[#2a1a3e] outline-none focus:border-[#ff5d73]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-white py-20 text-center card-shadow">
            <span className="text-6xl">🔍</span>
            <h3 className="font-display text-xl font-bold text-[#2a1a3e]">
              No toys found
            </h3>
            <p className="max-w-sm text-sm text-[#7a6b8a]">
              Try adjusting your filters or search to discover more fun.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile filters drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-[#2a1a3e]/50 backdrop-blur-sm"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto bg-[#fff7f2] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-[#2a1a3e]">
                Filters
              </h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="text-xl text-[#2a1a3e]"
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-6 w-full rounded-full bg-[#ff5d73] py-3 text-sm font-bold text-white"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
