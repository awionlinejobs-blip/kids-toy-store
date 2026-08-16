"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Review } from "@/db/schema";
import StarRating from "./StarRating";

type Props = {
  productSlug: string;
  reviews: Review[];
  ratingAvg: number;
  totalCount: number;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const avatarColors = [
  "#ff5d73",
  "#ffb02e",
  "#22c3b7",
  "#9b6dff",
  "#38bdf8",
  "#f472b6",
];

export default function ReviewsSection({
  productSlug,
  reviews,
  ratingAvg,
  totalCount,
}: Props) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!author.trim() || !title.trim() || !body.trim()) {
      setError("Please fill in your name, a title and your review.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug,
          author,
          location,
          rating,
          title,
          body,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      setAuthor("");
      setLocation("");
      setTitle("");
      setBody("");
      setRating(5);
      setShowForm(false);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const c = reviews.filter((r) => r.rating === star).length;
    return {
      star,
      count: c,
      pct: reviews.length ? (c / reviews.length) * 100 : 0,
    };
  });

  return (
    <section className="mt-16">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-2xl font-bold text-[#2a1a3e] sm:text-3xl">
          Customer Reviews
        </h2>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="self-start rounded-full bg-[#2a1a3e] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#ff5d73] sm:self-auto"
        >
          {showForm ? "Cancel" : "✍️ Write a Review"}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Summary */}
        <div className="h-fit rounded-3xl bg-white p-6 card-shadow">
          <div className="text-center">
            <div className="font-display text-5xl font-bold text-[#2a1a3e]">
              {ratingAvg.toFixed(1)}
            </div>
            <StarRating value={ratingAvg} size="lg" className="mt-2 justify-center" />
            <p className="mt-2 text-sm text-[#7a6b8a]">
              Based on {totalCount.toLocaleString()} reviews
            </p>
          </div>
          <div className="mt-6 space-y-2">
            {distribution.map((d) => (
              <div key={d.star} className="flex items-center gap-2 text-sm">
                <span className="w-8 text-[#7a6b8a]">{d.star}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#ffe3d5]">
                  <div
                    className="h-full rounded-full bg-[#ffb02e]"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="w-6 text-right text-[#b09bc4]">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews list + form */}
        <div>
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mb-8 rounded-3xl bg-white p-6 card-shadow animate-fade-up"
            >
              <h3 className="font-display text-lg font-bold text-[#2a1a3e]">
                Share your experience
              </h3>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm font-semibold text-[#7a6b8a]">
                  Your rating
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`text-2xl transition-transform hover:scale-110 ${
                        s <= rating ? "text-amber-400" : "text-amber-200"
                      }`}
                      aria-label={`Rate ${s} stars`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your name"
                  className="rounded-xl border border-[#ffe3d5] bg-[#fff7f2] px-4 py-3 text-sm outline-none focus:border-[#ff5d73]"
                />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City (optional)"
                  className="rounded-xl border border-[#ffe3d5] bg-[#fff7f2] px-4 py-3 text-sm outline-none focus:border-[#ff5d73]"
                />
              </div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Review title"
                className="mt-3 w-full rounded-xl border border-[#ffe3d5] bg-[#fff7f2] px-4 py-3 text-sm outline-none focus:border-[#ff5d73]"
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tell us what you loved..."
                rows={4}
                className="mt-3 w-full resize-none rounded-xl border border-[#ffe3d5] bg-[#fff7f2] px-4 py-3 text-sm outline-none focus:border-[#ff5d73]"
              />
              {error && <p className="mt-2 text-sm text-[#ff5d73]">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="mt-4 rounded-full bg-[#ff5d73] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2a1a3e] disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}

          <div className="space-y-4">
            {reviews.length === 0 && (
              <p className="rounded-2xl bg-white p-6 text-center text-sm text-[#7a6b8a] card-shadow">
                No reviews yet — be the first to share your thoughts!
              </p>
            )}
            {reviews.map((r, i) => (
              <div key={r.id} className="rounded-3xl bg-white p-5 card-shadow">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{
                      backgroundColor: avatarColors[i % avatarColors.length],
                    }}
                  >
                    {initials(r.author)}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#2a1a3e]">{r.author}</span>
                      {r.verified && (
                        <span className="rounded-full bg-[#e6f7ef] px-2 py-0.5 text-[10px] font-bold uppercase text-[#22a06b]">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#b09bc4]">
                      {r.location ? `${r.location} · ` : ""}
                      {new Date(r.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <StarRating value={r.rating} className="mt-3" />
                <h4 className="mt-2 font-display font-bold text-[#2a1a3e]">
                  {r.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[#5a4a6a]">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
