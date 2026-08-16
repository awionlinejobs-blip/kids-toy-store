"use client";

import { useState } from "react";
import ProductImage from "./ProductImage";

type Props = {
  gallery: string[];
  fallbackEmoji: string;
  gradientFrom: string;
  gradientTo: string;
  badge?: string | null;
};

export default function ProductGallery({
  gallery,
  fallbackEmoji,
  gradientFrom,
  gradientTo,
  badge,
}: Props) {
  const images = gallery.length > 0 ? gallery : [fallbackEmoji];
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <ProductImage
        key={active}
        emoji={images[active]}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        className="aspect-square w-full rounded-3xl card-shadow animate-fade-in"
        emojiClassName="text-[7rem] sm:text-[10rem]"
        badge={badge}
      />
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((emoji, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`overflow-hidden rounded-2xl transition-all ${
                active === i
                  ? "ring-2 ring-[#ff5d73] ring-offset-2 ring-offset-[#fff7f2]"
                  : "opacity-80 hover:opacity-100"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <ProductImage
                emoji={emoji}
                gradientFrom={gradientFrom}
                gradientTo={gradientTo}
                className="aspect-square w-full"
                emojiClassName="text-3xl sm:text-4xl"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
